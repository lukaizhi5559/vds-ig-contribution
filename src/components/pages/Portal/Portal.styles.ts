/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { createUseStyles } from "react-jss";

export const usePortalStyles = createUseStyles({
  root: {
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap", // Ensure cards wrap in case of smaller screens
    justifyContent: "center", // Center content in mobile views
    "@media (min-width: 768px)": {
      flexWrap: "nowrap", // Side-by-side for larger screens
    },
  },
  card: {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    padding: "1.5rem",
    width: "100%", // Default to full width for mobile
    "@media (min-width: 768px)": {
      width: "45%", // Adjust width for side-by-side layout
    },
  },
  cardHeader: {
    marginBottom: "0.5rem",
    paddingBottom: "0.5rem",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  cardContent: {
    color: "#4a4a4a",
    marginBottom: "1rem",
  },
  button: {
    backgroundColor: "#e53e3e",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#c53030",
    },
  },
});