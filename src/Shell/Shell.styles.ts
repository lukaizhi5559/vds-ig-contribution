/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { createUseStyles } from 'react-jss';

/**
 * Styles for the Shell slots
 */
export const useShellStyles = createUseStyles({
  root: {
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    minWidth: '80vw',
    display: 'flex',
    flexDirection: 'column',
  },
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
  searchIcon: {
    backgroundColor: '#b0b0b0',
    borderRadius: '50%',
    height: '2rem',
    width: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    margin: '0 auto',
    padding: '2.5rem 1.5rem',
    display: 'grid',
  },
  footer: {
    backgroundColor: '#f1f1f1',
    padding: '1rem 1.5rem',
    marginTop: 'auto',
    textAlign: 'center',
  },
  footerLink: {
    marginRight: '2rem',    
  }
});