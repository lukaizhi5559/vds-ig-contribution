/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import * as React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { NewThingStuff } from './../NewThingStuff';

expect.extend(toHaveNoViolations);

describe('NewThingStuff', () => {
  it('should not have a11y violations', async () => {
    expect.assertions(1);
    const { container } = render(<NewThingStuff>Default NewThingStuff A11y</NewThingStuff>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders a default state', () => {
    expect.assertions(1);
    const { container } = render(<NewThingStuff>Default NewThingStuff</NewThingStuff>);
    expect(container).toMatchSnapshot();
  });
});
