/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FaChevronDown } from 'react-icons/fa';
import { useSubmissionDetailStyles } from "./SubmissionDetailView.styles";

const comments = [
    { user: "Alice Johnson", timestamp: "12/27/2024 2:00 PM", comment: "This is a sample comment." },
    { user: "Bob Smith", timestamp: "12/27/2024 2:30 PM", comment: "Please review the updates." },
];

const activityLogs = [
    "Status changed to Approved - 12/27/2024 1:00 PM",
    "Comment added by Alice Johnson - 12/27/2024 2:00 PM",
    "Comment added by Bob Smith - 12/27/2024 2:30 PM",
];

const SubmissionDetailView = () => {
  const styles = useSubmissionDetailStyles();

  return (
    <div className={styles.root}>
      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.title}>Submission Detail View</div>

        {/* Metadata Section */}
        <div className={styles.section}>
          <div><strong>Title:</strong> Example Submission</div>
          <div><strong>Status:</strong> 
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" className={styles.statusButton}>
                    Approved
                    <FaChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Approved</DropdownMenuItem>
                <DropdownMenuItem>In Review</DropdownMenuItem>
                <DropdownMenuItem>Denied</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>Update</Button>
          </div>
          <div><strong>Submission Date:</strong> 12/27/2024</div>
          <div><strong>Submitted By:</strong> Alice Johnson</div>
        </div>

        <hr className="my-4" />

        {/* Activity Log Section */}
        <div className={styles.activityLog}>
          <h3>Activity Log</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <hr className="my-4" />

        {/* Comments Section */}
        <div className={styles.commentsSection}>
          <h3>Comments</h3>
          {comments.map((comment, index) => (
            <div key={index} className="mb-4">
              <strong>{comment.user}</strong> - {comment.timestamp}
              <p>{comment.comment}</p>
            </div>
          ))}
          <Textarea className={styles.textarea} placeholder="Add a comment..." />
          <Button className="mt-2">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailView;
