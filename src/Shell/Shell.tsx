/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import * as React from "react";

import type { ShellProps } from "./Shell.types";
import { useShellStyles } from "./Shell.styles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Render the final JSX of Shell
 */
export const Shell: React.FC<ShellProps> = (props: ShellProps) => {
  const styles = useShellStyles();

  return (
    <div className={styles.root}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className="flex items-center">
            <span className={styles.logo}>Verizon</span>
            <nav className={styles.nav}>
              <a href="#">Mobile</a>
              <a href="#">Internet</a>
              <a href="#">Solutions</a>
              <a href="#">Insights</a>
            </nav>
          </div>
          <div className={styles.searchIcon}>
            🔍
          </div>
        </div>
      </header>

      {/* Landing Page Content */}
      <main className={styles.main}>
        {/* Contribution Model Card */}
        <Card className={styles.card}>
          <CardHeader className={styles.cardHeader}>
            <CardTitle className={styles.cardTitle}>Contribution Model</CardTitle>
          </CardHeader>
          <CardContent className={styles.cardContent}>
            <p className={styles.cardContent}>
              Streamline submissions and tracking
            </p>
            <Button className={styles.button}>
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
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        © 2023 Verizon. All rights reserved.
      </footer>
    </div>
  );
};