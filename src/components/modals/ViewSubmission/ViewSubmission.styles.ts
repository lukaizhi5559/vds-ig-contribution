/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { createUseStyles } from "react-jss";

export const useViewSubmissionStyles = createUseStyles({
  section: {
    // marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    marginTop: "10px",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  containerSection: {
    maxHeight: "20vh",
  },
  container: {
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  dialogContent: {
    // maxHeight: "70vh",
    overflowY: "auto",
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: "white",
    zIndex: 10,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "10px 20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
});
