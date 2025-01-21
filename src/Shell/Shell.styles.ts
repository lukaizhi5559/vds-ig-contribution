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
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    margin: '0 auto',
    padding: '2.5rem 1.5rem',
    display: 'grid',
  },
});