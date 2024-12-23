/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import * as React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { %name.pascal% } from './../%name.pascal%';

expect.extend(toHaveNoViolations);

describe('%name.pascal%', () => {
  it('should not have a11y violations', async () => {
    expect.assertions(1);
    const { container } = render(<%name.pascal%>Default %name.pascal% A11y</%name.pascal%>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders a default state', () => {
    expect.assertions(1);
    const { container } = render(<%name.pascal%>Default %name.pascal%</%name.pascal%>);
    expect(container).toMatchSnapshot();
  });
});
