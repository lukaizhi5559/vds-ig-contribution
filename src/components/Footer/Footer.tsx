/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import * as React from 'react';

import type { FooterProps } from './Footer.types';
import { useFooterStyles } from './Footer.styles';

/**
 * Render the final JSX of Footer
 */
export const Footer: React.FC<React.PropsWithChildren<FooterProps>> = (props: FooterProps) => {
  const { children } = props;
  const styles = useFooterStyles();

  return <footer className={styles.footer}>
    <div>
      <a href="#" className={styles.footerLink}>
        Privacy Policy
      </a>
      <a href="#" className={styles.footerLink}>
        Terms of Service
      </a>
      <a href="#">Contact Us</a>
    </div>
  </footer>;
};
