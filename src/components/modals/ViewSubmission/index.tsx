/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useViewSubmissionStyles } from "./ViewSubmission.styles";

const ViewSubmissionModal = () => {
  const styles = useViewSubmissionStyles();

  const comments = [
    { user: "Alice Johnson", timestamp: "12/27/2024 2:00 PM", comment: "This is a sample comment." },
    { user: "Bob Smith", timestamp: "12/27/2024 2:30 PM", comment: "Please review the updates." },
  ];

  const activityLogs = [
    "Status changed to Approved - 12/27/2024 1:00 PM",
    "Comment added by Alice Johnson - 12/27/2024 2:00 PM",
    "Comment added by Bob Smith - 12/27/2024 2:30 PM",
  ];

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
          <div><strong>Title:</strong> Example Submission</div>
          <div><strong>Status:</strong> Approved</div>
          <div><strong>Submission Date:</strong> 12/27/2024</div>
          <div><strong>Submitted By:</strong> Alice Johnson</div>
        </div>

        <hr />

        {/* Activity Log Section */}
        <div className={styles.section}>
          <h3>Activity Log</h3>
          <Table>
            <TableBody>
              {activityLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <hr />

        {/* Comments Section */}
        <div className={styles.section}>
            <h3>Comments</h3>
            <DialogDescription>
            {comments.map((comment, index) => (
                <div key={index} className="mb-4">
                <strong>{comment.user}</strong> - {comment.timestamp}
                <p>{comment.comment}</p>
                </div>
            ))}
            </DialogDescription>
          <Textarea className={styles.textarea} placeholder="Add a comment..." />
          <Button className="mt-2">Submit</Button>
        </div>

        <hr />

        <DialogFooter>
          <Button variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSubmissionModal;
