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
    },
    container: {
      width: "1200px",
      minWidth: '70vw',
      margin: "50px",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    },
    titleWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    header: {
      backgroundColor: "white",
      height: "60px",
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    },
    headerText: {
      marginLeft: "20px",
      fontSize: "16px",
      color: "black",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    newSubmission: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "20px",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
      gap: "10px",
    },
  });