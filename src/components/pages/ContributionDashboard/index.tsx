/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateEditSubmissionModal from "@/components/modals/CreateEditSubmission";
import ViewSubmissionModal from "@/components/modals/ViewSubmission";
import { useLandingStyles } from "./ContributionDashboard.styles";
import { useSubmissions, useDeleteSubmission } from "@/api/submissions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { extractFileKey } from "@/lib/utils";

const ContributionDashboard = () => {
  const styles = useLandingStyles();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: submissions, isLoading, isError, error } = useSubmissions();
  const { mutate: deleteSubmission } = useDeleteSubmission();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState<number | null>(null);
  const [loadingStatuses, setLoadingStatuses] = useState<Record<number, boolean>>({});
  const [refresh, setRefresh] = useState(false);

  const handleDelete = (submissionId: number | undefined) => {
    if (submissionId !== undefined) {
      setSubmissionToDelete(submissionId);
      setIsConfirmOpen(true);
    }
  };

  const confirmDelete = () => {
    if (submissionToDelete !== null) {
      deleteSubmission(submissionToDelete, {
        onSuccess: () => {
          toast({
            title: "Submission Deleted",
            description: "The submission was deleted successfully.",
          });
          setIsConfirmOpen(false);
          setSubmissionToDelete(null);
          queryClient.invalidateQueries({ queryKey: ["submissions"] }); // Refetch submissions after deletion
        },
        onError: (err) => {
          toast({
            title: "Error",
            description: `Failed to delete submission: ${
              err instanceof Error ? err.message : "Unknown error"
            }`,
          });
        },
      });
    }
  };

  const handleModalSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["submissions"] }); // Refetch submissions after adding or updating
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    if (submissions) {
      const newLoadingStatuses: Record<number, boolean> = {};
      submissions.forEach((submission) => {
        if (submission.id !== undefined) {
          newLoadingStatuses[submission.id] = true;
        }
        setTimeout(() => {
          if (submission.id !== undefined) {
            setLoadingStatuses((prev) => ({ ...prev, [submission.id as number]: false }));
          }
        }, 2000); // 2-second delay
        console.log("Submission status updated", submission);
      });
      setLoadingStatuses(newLoadingStatuses);
    }
  }, [submissions, refresh]);

  if (isLoading) {
    return <div className={styles.loading}>Loading submissions...</div>;
  }

  if (isError) {
    return (
      <div className={styles.error}>
        Failed to load submissions: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Contribution Model Dashboard</div>

          {/* New Submission Button */}
          <div className={styles.newSubmission}>
            <CreateEditSubmissionModal onSuccess={handleModalSuccess} />
          </div>
        </div>

        {/* Search Bar */}
        <Input placeholder="Search by title or user" className="mb-4" />

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions?.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.title}</TableCell>
                <TableCell>
                  {!submission.figmaData || submission.status === "in progress" ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 text-gray-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      <span>in progress</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span
                        className={
                          submission.figmaData.status.toLowerCase() === "success"
                            ? "text-green-600"
                            : submission.figmaData.status.toLowerCase() === "rejected"
                            ? "text-red-500"
                            : "text-orange-500"
                        }
                      >
                        {submission.figmaData.status}
                      </span>
                      {submission?.figmaData?.status !== "success" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-7 h-7 text-gray-500 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 15v.01m0-6.01v3"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17a5 5 0 100-10 5 5 0 000 10z"
                                />
                              </svg>
                            </TooltipTrigger>
                            <TooltipContent>
                              {submission.figmaData?.message.map((msg, index) => (
                                <div key={index}>{msg}</div>
                              )) || "No additional information available"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell>{new Date(submission.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{submission.description}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {/* View Submission Modal */}
                    <ViewSubmissionModal 
                      submission={submission} 
                    />
                    {/* Edit Submission Modal */}
                    <CreateEditSubmissionModal
                      isEdit
                      submission={submission}
                      onSuccess={handleModalSuccess}
                    />
                    {/* Delete Submission Button with Trash Icon */}
                    <Button
                      variant="outline"
                      onClick={() => handleDelete(submission.id)}
                      className="p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-1 14H6L5 7m5 4v6m4-6v6M4 7h16M10 4h4m-4 0a1 1 0 01-1-1V3m5 1a1 1 0 001-1V3m-5 0h4"
                        />
                      </svg>
                    </Button>
                    {/* Figma File Link Icon */}
                    {submission.figmaFile && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(`https://www.figma.com/design/${extractFileKey(submission.figmaFile)}`, "_blank")}
                        className="p-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5 text-blue-500 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-4m-5-9h5m0 0v5m0-5L10 14"
                          />
                        </svg>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className={styles.pagination}>
          <Button variant="outline">{"<"}</Button>
          <span>Page 1 of 3</span>
          <Button variant="outline">{">"}</Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">Are you sure you want to delete this submission?</div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContributionDashboard;
