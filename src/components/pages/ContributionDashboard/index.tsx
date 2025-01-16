/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React, { useState } from "react";
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
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const ContributionDashboard = () => {
  const styles = useLandingStyles();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: submissions, isLoading, isError, error } = useSubmissions();
  const { mutate: deleteSubmission } = useDeleteSubmission();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState<number | null>(null);

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
  };

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
                  <span
                    className={submission.status.toLowerCase() === "success"
                      ? "text-green-600"
                      : submission.status.toLowerCase() === "rejected"
                      ? "text-red-500"
                      : "text-orange-500"}
                  >
                    {submission.status}
                  </span>
                </TableCell>
                <TableCell>{new Date(submission.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{submission.description}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {/* View Submission Modal */}
                    <ViewSubmissionModal submissionId={submission.id} />
                    {/* Edit Submission Modal */}
                    <CreateEditSubmissionModal
                      isEdit
                      submissionId={submission.id}
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
