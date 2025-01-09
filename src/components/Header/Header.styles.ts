/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { createUseStyles } from 'react-jss';

/**
 * Styles for the Header component
 */
export const useHeaderStyles = createUseStyles({
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  container: {
    maxWidth: '1240px',
    margin: '0 auto',
    padding: '1rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    marginLeft: '2rem',
    '& a': {
      color: '#4a4a4a',
      marginLeft: '1.5rem',
      textDecoration: 'none',
      '&:hover': {
        color: 'black',
      },
    },
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },
  userName: {
    fontSize: "14px",
    color: "#333",
    fontWeight: "bold",
  },
  dropdownContainer: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
    minWidth: "150px",
  },
  dropdownLink: {
    display: "block",
    padding: "10px",
    textDecoration: "none",
    color: "#333",
    fontSize: "14px",
    textAlign: "left",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
    border: "none",
    cursor: "pointer",
    width: "100%",
  },
  searchIcon: {
    backgroundColor: '#b0b0b0',
    borderRadius: '50%',
    height: '2rem',
    width: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
