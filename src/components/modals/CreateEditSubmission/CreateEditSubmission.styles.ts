import { createUseStyles } from "react-jss";

export const useCreateEditSubmissionStyles = createUseStyles({
  dialogContent: {
    maxHeight: "90vh",
    overflowY: "auto",
    padding: "1.5rem",
  },
  dialogHeader: {
    marginBottom: "1rem",
  },
  dialogTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  contentWrapper: {
    maxHeight: "70vh",
    overflowY: "auto",
    padding: "1rem 0",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "600",
  },
  input: {
    width: "100%",
  },
  textarea: {
    width: "100%",
    resize: "vertical",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: "0.875rem",
    marginTop: "0.25rem",
  },
  dialogFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
  },
  submitButton: {
    color: "#fff",
  },
  cancelButton: {
    backgroundColor: "#f8f9fa",
    color: "#000",
    "&:hover": {
      backgroundColor: "#e9ecef",
    },
  },
});
