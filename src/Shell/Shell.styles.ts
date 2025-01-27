/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { createUseStyles } from "react-jss";

/**
 * Styles for the Shell slots
 */
export const useShellStyles = createUseStyles({
  root: {
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden", // Prevent horizontal scroll
    "@media (max-width: 768px)": {
      padding: "0", // Remove extra padding for mobile
    },
  },
  main: {
    margin: "0 auto",
    padding: "2.5rem 1.5rem",
    display: "grid",
    width: "100%", // Ensure content spans the full width
    maxWidth: "1200px", // Maintain a max width for larger screens
    "@media (max-width: 768px)": {
      padding: "0", // Adjust padding for mobile
      width: "100vw", // Ensure full screen width for mobile
      maxWidth: "auto", // Maintain a max width for larger screens
    },
  },
});