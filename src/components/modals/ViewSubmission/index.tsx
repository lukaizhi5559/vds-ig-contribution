/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { useViewSubmissionStyles } from "./ViewSubmission.styles";
import { useSubmission } from "@/api/submissions";
import useFigmaData from "@/hooks/useFigmaData";

type ViewSubmissionModalProps = {
  submissionId: number | undefined;
};

const ViewSubmissionModal = ({ submissionId }: ViewSubmissionModalProps) => {
  const styles = useViewSubmissionStyles();

  // Fetch submission details using useSubmission
  const { data: submission, isLoading, error } = useSubmission(submissionId || 0);

  // Use Figma data hook with the figmaFile from submission
  const { processedData, status: figmaStatus, error: figmaError } = useFigmaData(
    submission?.figmaFile || "",
    !!submission?.figmaFile
  );

  if (isLoading) {
    return <div>Loading submission...</div>;
  }

  if (error) {
    return <div>Failed to load submission details. Please try again later.</div>;
  }

  const comments = submission?.comments || []; // Assume `comments` is part of the submission data
  const activityLogs = submission?.activityLogs || []; // Assume `activityLogs` is part of the submission data

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View</Button>
      </DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle>View Submission</DialogTitle>
        </DialogHeader>

        {/* Metadata Section */}
        <div className={styles.section}>
          <div>
            <strong>Title:</strong> {submission?.title || "N/A"}
          </div>
          <div>
            <strong>Status:</strong> {submission?.status || "N/A"}
          </div>
          <div>
            <strong>Submission Date:</strong> {submission?.createdAt || "N/A"}
          </div>
          <div>
            <strong>Submitted By:</strong> {submission?.submittedBy || "N/A"}
          </div>
        </div>

        <hr />

        {/* Figma File Data Section */}
        <div className={styles.section}>
          <h2>Figma File Data</h2>
          {figmaStatus === "loading" && <div>Loading Figma data...</div>}
          {figmaStatus === "error" && (
            <div className={styles.errorText}>{figmaError || "Failed to fetch Figma data."}</div>
          )}
          {figmaStatus === "success" && processedData && (
            <div>
              <div>
                <strong>Name:</strong> {processedData.name || "N/A"}
              </div>
              <div>
                <strong>Thumbnail:</strong>{" "}
                {processedData.thumbnailUrl ? (
                  <img
                    src={processedData.thumbnailUrl}
                    alt="Thumbnail"
                    style={{ width: "100px", height: "auto" }}
                  />
                ) : (
                  "N/A"
                )}
                <div>
                  <strong>Status:</strong> {submission?.status}
                </div>
                <div>
                  <strong>Message:</strong> {
                    processedData.message.map((msg, index) => <div key={index}>{msg}</div>)
                  }
                </div>
              </div>
              <div>
                <strong>Last Modified:</strong> {processedData.lastModified || "N/A"}
              </div>
            </div>
          )}
        </div>

        <hr />

        {/* Activity Log Section */}
        <div className={styles.section}>
          <h3>Activity Log</h3>
          <Table>
            <TableBody>
              {activityLogs.length > 0 ? (
                activityLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No activity logs available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <hr />

        {/* Comments Section */}
        <div className={styles.section}>
          <h3>Comments</h3>
          <DialogDescription>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="mb-4">
                  <strong>{comment.user}</strong> - {comment.timestamp}
                  <p>{comment.text}</p>
                </div>
              ))
            ) : (
              <>No comments available</>
            )}
          </DialogDescription>
          <Textarea className={styles.textarea} placeholder="Add a comment..." />
          <Button className="mt-2">Submit</Button>
        </div>

        <hr />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSubmissionModal;