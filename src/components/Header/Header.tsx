/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import type { HeaderProps } from './Header.types';
import React, { useRef, useState, useEffect } from "react";
import { useUserContext } from "@/context/UserContext";
import { getInitials } from "@/lib/utils";
import { useHeaderStyles } from "./Header.styles";

/**
 * Render the final JSX of Header
 */
export const Header: React.FC<React.PropsWithChildren<HeaderProps>> = (props: HeaderProps) => {
  const styles = useHeaderStyles();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userDetails, logout } = useUserContext();
  
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
        <div className={styles.userSection}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
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
            >
              {getInitials(userDetails?.name)}
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <a
                  className={styles.dropdownLink}
                  href="/"
                >
                  Portal
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
  );
};
