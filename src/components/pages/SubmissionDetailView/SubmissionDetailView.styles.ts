/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { createUseStyles } from 'react-jss';

// Define JSS styles
export const useSubmissionDetailStyles = createUseStyles({
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
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    section: {
        marginBottom: "20px",
        "& > div": {
            marginBottom: "10px",
        },
    },
    statusButton: {
        display: "flex",
        alignItems: "center",
        margin: "0 5px",
    },
    commentsSection: {
        marginTop: "20px",
        "& h3": {
            marginBottom: "10px",
        },
    },
    textarea: {
      width: "100%",
      marginTop: "10px",
    },
    activityLog: {
      marginTop: "20px",
    },
  });