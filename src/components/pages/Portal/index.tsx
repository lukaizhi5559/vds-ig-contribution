/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortalStyles } from "./Portal.styles";

const Portal = () => {
  const styles = usePortalStyles();
  
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
          <a href="/contribution">
            <Button className={styles.button}>Get Started</Button>
          </a>
         
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
