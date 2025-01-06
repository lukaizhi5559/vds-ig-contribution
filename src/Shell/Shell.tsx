/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import * as React from "react";
import { Outlet } from "@tanstack/react-router";
import { useShellStyles } from "./Shell.styles";
import type { ShellProps } from "./Shell.types";

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
            <a href="/" className={styles.logo}>Verizon</a>
            <nav className={styles.nav}>
              {/* Uncomment possible nav links */}
              {/* <a href="#">Mobile</a>
              <a href="#">Internet</a>
              <a href="#">Solutions</a>
              <a href="#">Insights</a> */}
            </nav>
          </div>
          <div className={styles.searchIcon}>
            <a href="/login" className={styles.logo}>🔍</a>
          </div>
        </div>
      </header>

      {/* Portal Page Content */}
      <main className={styles.main}>
        <Outlet /> {/* Child routes will render here */}
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div>
          <a href="#" className={styles.footerLink}>
            Privacy Policy
          </a>
          <a href="#" className={styles.footerLink}>
            Terms of Service
          </a>
          <a href="#">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};