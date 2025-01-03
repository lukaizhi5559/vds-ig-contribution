/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import type { ShellProps } from "./Shell.types";
import { useShellStyles } from "./Shell.styles";
import Portal from "@/components/pages/Portal";
import ContributionDashboard from "@/components/pages/ContributionDashboard";
import SubmissionDetailView from "@/components/pages/SubmissionDetailView";
import AuthLogin from "@/components/pages/AuthLogin";

/**
 * Render the final JSX of Shell
 */
export const Shell: React.FC<ShellProps> = (props: ShellProps) => {
  const styles = useShellStyles();

  return (
    <Router>
    <div className={styles.root}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className="flex items-center">
            <a href="/" className={styles.logo}>Verizon</a>
            <nav className={styles.nav}>
              {/* Uncomment some possible navs link */}
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
        <Routes>
          <Route path="/" element={<Portal />} />
          <Route path="/contribution" element={<ContributionDashboard />} />
          <Route path="/submission-detail" element={<SubmissionDetailView />} />
          <Route path="/login" element={<AuthLogin />} />
        </Routes>
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
    </Router>
  );
};