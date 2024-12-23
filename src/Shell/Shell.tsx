
/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import * as React from "react";

import type { ShellProps } from "./Shell.types";
import { useShellStyles } from "./Shell.styles";

/**
 * Render the final JSX of Shell
 */
export const Shell: React.FC<ShellProps> = (props: ShellProps) => {
  const styles = useShellStyles();

  return <div className={styles.root}>READY</div>;
};
