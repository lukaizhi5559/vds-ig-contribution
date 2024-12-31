/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { createUseStyles } from "react-jss";

export const useCreateEditSubmissionStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  container: {
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  label: {
    marginBottom: "8px",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#333",
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
