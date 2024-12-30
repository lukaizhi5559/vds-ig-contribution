/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import {createUseStyles} from 'react-jss'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const usePortalStyles = createUseStyles({
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

const Portal = () => {
  const styles = usePortalStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
     {/* Contribution Model Card */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Contribution Model</CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <p className={styles.cardContent}>
            Streamline submissions and tracking
          </p>
          <Button 
            className={styles.button}
            onClick={() => navigate("/contribution")}
          >
            Get Started
          </Button>
        </CardContent>
      </Card>

      {/* Expansion Packing Card */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Expansion Packing</CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <p className={styles.cardContent}>
            Maintain high-quality contributions
          </p>
          <Button className={styles.button}>
            Explore
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portal;
