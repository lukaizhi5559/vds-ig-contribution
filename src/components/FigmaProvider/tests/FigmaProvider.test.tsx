/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import * as React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { FigmaProvider } from './../FigmaProvider';

expect.extend(toHaveNoViolations);

describe('FigmaProvider', () => {
  it('should not have a11y violations', async () => {
    expect.assertions(1);
    const { container } = render(<FigmaProvider>Default FigmaProvider A11y</FigmaProvider>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders a default state', () => {
    expect.assertions(1);
    const { container } = render(<FigmaProvider>Default FigmaProvider</FigmaProvider>);
    expect(container).toMatchSnapshot();
  });
});
