/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import * as React from 'react';

import type { NewThingStuffProps } from './NewThingStuff.types';
import { useNewThingStuffStyles } from './NewThingStuff.styles';

/**
 * Render the final JSX of NewThingStuff
 */
export const NewThingStuff: React.FC<NewThingStuffProps> = (props: NewThingStuffProps) => {
  const { children } = props;
  const styles = useNewThingStuffStyles();

  return <div className={styles.root}>{children}</div>;
};
