/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import * as React from 'react';

import type { FigmaProviderProps } from './FigmaProvider.types';
import { useFigmaProviderStyles } from './FigmaProvider.styles';

/**
 * Render the final JSX of FigmaProvider
 */
export const FigmaProvider: React.FC<FigmaProviderProps> = (props: FigmaProviderProps) => {
  const { children } = props;
  const styles = useFigmaProviderStyles();

  return <div className={styles.root}>{children}</div>;
};
