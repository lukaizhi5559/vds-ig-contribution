
/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import * as React from "react";

import type { ShellProps } from "./Shell.types";
import { useShellStyles } from "./Shell.styles";
import ContributionForm from '../components/ContributionForm/ContributionForm'; // Adjust path as needed


/**
 * Render the final JSX of Shell
 */
export const Shell: React.FC<ShellProps> = (props: ShellProps) => {
  const styles = useShellStyles();

  return (
    <div className={styles.root}>
      <h1>Welcome to the VDS Contribution Model</h1>
      <ContributionForm />
    </div>
  );
};
