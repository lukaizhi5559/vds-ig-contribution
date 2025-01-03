/*!
 * Copyright (C) Verizon. All rights reserved.
 */

// Import dependencies
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CreateEditSubmissionModal from "@/components/modals/CreateEditSubmission";
import ViewSubmissionModal from "@/components/modals/ViewSubmission";
import { useLandingStyles } from "./ContributionDashboard.styles";

const rows = [
  { title: "Submission 1", status: "Approved", date: "12/27/2024", user: "Alice Johnson" },
  { title: "Submission 2", status: "In Review", date: "12/26/2024", user: "Bob Smith" },
  { title: "Submission 3", status: "Denied", date: "12/25/2024", user: "Charlie Brown" },
  { title: "Submission 4", status: "Pending", date: "12/24/2024", user: "Diana Prince" },
  { title: "Submission 5", status: "Approved", date: "12/23/2024", user: "Ethan Hunt" },
];

const ContributionDashboard = () => {
  const styles = useLandingStyles();

  return (
    <div className={styles.root}>

      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
            <div className={styles.title}>
                Contribution Model Dashboard
                
            </div>

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
              <TableHead>User Info</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  <span className={`text-${row.status.toLowerCase() === 'approved' ? 'green-500' : row.status.toLowerCase() === 'denied' ? 'red-500' : 'orange-500'}`}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {/* <Button variant="outline">View</Button> */}
                    <ViewSubmissionModal />
                    <CreateEditSubmissionModal isEdit />
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
