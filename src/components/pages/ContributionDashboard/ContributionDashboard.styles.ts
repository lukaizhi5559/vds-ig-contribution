import { createUseStyles } from "react-jss";

// Define JSS styles
export const useLandingStyles = createUseStyles({
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0",
  },
  container: {
    width: "100%",
    maxWidth: "1200px",
    minWidth: "70vw",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    "@media (max-width: 768px)": {
      minWidth: "95vw", // Fit within the mobile viewport
      padding: "5px", // Reduce padding for smaller screens
    },
  },
  titleWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    "@media (max-width: 768px)": {
      flexDirection: "column", // Stack title and button on mobile
      alignItems: "flex-start",
      gap: "10px",
    },
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    "@media (max-width: 768px)": {
      fontSize: "18px", // Adjust font size for mobile
    },
  },
  newSubmission: {
    display: "flex",
    justifyContent: "flex-end",
    "& button": {
      backgroundColor: "#e53e3e",
      "&:hover": {
        backgroundColor: "#c53030",
      },
    },
    "@media (max-width: 768px)": {
      width: "100%",
      justifyContent: "center", // Center button on mobile
    },
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    "@media (max-width: 768px)": {
      display: "none", // Hide table on mobile
    },
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
  mobileCard: {
    display: "none",
    "@media (max-width: 768px)": {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "10px",
      marginBottom: "10px",
      backgroundColor: "#fff",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    },
  },
  mobileCardRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    wordWrap: "break-word", // Ensure text wraps within the card
    "& span": {
      fontWeight: "bold",
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
    flexWrap: "wrap", // Allow buttons to wrap on smaller screens
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    gap: "10px",
    flexWrap: "wrap", // Wrap pagination items on smaller screens
    "& nav a": {
      cursor: "pointer",
    },
    "& nav ul .border-input": {
      cursor: "pointer",
      backgroundColor: "black",
      color: "#fff",
      fontWeight: "bold",
    },
  },
  pageBreadcrumb: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#666",
    textAlign: "right",
    marginRight: "10px",
    "@media (max-width: 768px)": {
      textAlign: "center", // Center breadcrumb on mobile
      marginRight: "0",
    },
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#666",
    "@media (max-width: 768px)": {
      fontSize: "16px", // Adjust font size for mobile
    },
  },
  error: {
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
    color: "red",
    marginTop: "20px",
    "@media (max-width: 768px)": {
      fontSize: "14px", // Adjust font size for mobile
    },
  },
});