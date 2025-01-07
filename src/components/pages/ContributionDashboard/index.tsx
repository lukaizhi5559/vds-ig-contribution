/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CreateEditSubmissionModal from "@/components/modals/CreateEditSubmission";
import ViewSubmissionModal from "@/components/modals/ViewSubmission";
import { useLandingStyles } from "./ContributionDashboard.styles";
import { useSubmissions } from "@/api/submissions";

const ContributionDashboard = () => {
  const styles = useLandingStyles();

  // Fetch submissions using the React Query hook
  const { data: submissions, isLoading, isError, error } = useSubmissions();

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
            <CreateEditSubmissionModal />
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
                    className={`text-${
                      submission.status.toLowerCase() === "approved"
                        ? "green-500"
                        : submission.status.toLowerCase() === "rejected"
                        ? "red-500"
                        : "orange-500"
                    }`}
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
                    <CreateEditSubmissionModal isEdit submissionId={submission.id} />
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
    </div>
  );
};

export default ContributionDashboard;
