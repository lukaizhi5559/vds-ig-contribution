/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { createUseStyles } from 'react-jss';

// Define JSS styles
export const useLandingStyles = createUseStyles({
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "1200px",
    minWidth: '70vw',
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  titleWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  newSubmission: {
    display: "flex",
    justifyContent: "flex-end",
  },
  searchBar: {
    width: "100%",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
    "& th": {
      fontWeight: "bold",
      textAlign: "left",
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
  },
  tableRow: {
    "&:nth-child(even)": {
      backgroundColor: "#f9f9f9",
    },
    "& td": {
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
  },
  statusApproved: {
    color: "green",
    fontWeight: "bold",
  },
  statusRejected: {
    color: "red",
    fontWeight: "bold",
  },
  statusPending: {
    color: "orange",
    fontWeight: "bold",
  },
  actions: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    gap: "10px",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#666",
  },
  error: {
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
    color: "red",
    marginTop: "20px",
  },
});
