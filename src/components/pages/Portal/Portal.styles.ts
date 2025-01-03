/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import {createUseStyles} from 'react-jss'

export const usePortalStyles = createUseStyles({
    root: {
      display: 'flex',
      gap: '4rem',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
    },
    cardHeader: {
      marginBottom: '0.5rem',
      paddingBottom: '0.5rem'
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
    cardContent: {
      color: '#4a4a4a',
      marginBottom: '1rem',
    },
    button: {
      backgroundColor: '#e53e3e',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      textDecoration: 'none',
      '&:hover': {
        backgroundColor: '#c53030',
      },
    }
});