/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { createUseStyles } from "react-jss";

export const useAuthLoginStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    minWidth: '80vw',
    backgroundColor: "#f5f5f5",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    height: "40px",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  navLink: {
    fontSize: "16px",
    color: "black",
    textDecoration: "none",
    '&:hover': {
      textDecoration: "underline",
    },
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333333",
  },
  subtitle: {
    fontSize: "16px",
    color: "gray",
    marginBottom: "30px",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  tabButton: {
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "bold",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#eaeaea",
    },
    "&.active": {
      backgroundColor: "#007bff",
      color: "white",
      borderColor: "#007bff",
    },
  },
  formGroup: {
    marginBottom: "20px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333333",
  },
  forgotPasswordContainer: {
    textAlign: "right",
    marginBottom: "20px",
    width: "100%",
    maxWidth: "400px",
  },
  forgotPasswordLink: {
    fontSize: "14px",
    color: "#3182ce",
    textDecoration: "none",
    '&:hover': {
      textDecoration: "underline",
    },
  },
  signInButton: {
    width: "100%",
    maxWidth: "400px",
    padding: "10px 0",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#e53e3e",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    '&:hover': {
      backgroundColor: "#c53030",
    },
    marginBottom: "20px",
  },
  divider: {
    margin: "20px 0",
    fontSize: "16px",
    color: "gray",
    textAlign: "center",
    '&::before, &::after': {
      content: "''",
      display: "inline-block",
      width: "40%",
      height: "1px",
      backgroundColor: "gray",
      verticalAlign: "middle",
      margin: "0 5px",
    },
  },
  createAccountSection: {
    textAlign: "center",
  },
  createAccountText: {
    marginBottom: "10px",
    fontSize: "16px",
    color: "#333333",
  },
  createAccountButton: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#f5f5f5",
    color: "black",
    border: "1px solid gray",
    borderRadius: "4px",
    cursor: "pointer",
    '&:hover': {
      backgroundColor: "#e0e0e0",
    },
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "10px 0",
    backgroundColor: "white",
    boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
  },
  footerLink: {
    fontSize: "14px",
    color: "black",
    textDecoration: "none",
    '&:hover': {
      textDecoration: "underline",
    },
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
});
