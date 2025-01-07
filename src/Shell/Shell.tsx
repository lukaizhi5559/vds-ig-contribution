/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useUserContext } from "@/context/UserContext";
import { getInitials } from "@/lib/utils";
import { useShellStyles } from "./Shell.styles";
import type { ShellProps } from "./Shell.types";

/**
 * Render the final JSX of Shell
 */
export const Shell: React.FC<ShellProps> = () => {
  const styles = useShellStyles();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userDetails, isAuthenticated, logout } = useUserContext();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/login", replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.root}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className="flex items-center">
            <a href="/" className={styles.logo}>
              Verizon
            </a>
            <nav className={styles.nav}>
              {/* Uncomment possible nav links */}
              {/* <a href="#">Mobile</a>
              <a href="#">Internet</a>
              <a href="#">Solutions</a>
              <a href="#">Insights</a> */}
            </nav>
          </div>
          <div className={styles.userSection}>
            {userDetails && (
              <span className={styles.userName}>
                Welcome, {userDetails.name}
              </span>
            )}
            <div
              className={styles.dropdownContainer}
              ref={dropdownRef}
            >
              <button
                className={styles.searchIcon}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {getInitials(userDetails?.name)}
              </button>
              {isDropdownOpen && (
                <div className={styles.dropdown}>
                  <a
                    className={styles.dropdownLink}
                    href="/"
                  >
                    Home
                  </a>
                  <a
                    className={styles.dropdownLink}
                    href="/submission-detail"
                  >
                    Submission Detail
                  </a>
                  <button
                    className={styles.dropdownLink}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
