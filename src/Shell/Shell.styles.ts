
/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { createUseStyles } from 'react-jss';

/**
 * Styles for the Shell slots
 */
export const useShellStyles = createUseStyles({
  root: {
    display: 'flex',          
    flexDirection: 'column',  
    justifyContent: 'center', 
    alignItems: 'center',     
    padding: '5px',          
    minHeight: '100vh',      
    backgroundColor: '#f9f9f9',
    '& h1': {
      marginBottom: '20px', // Add margin-bottom for h1 tag
    },
  },
});
