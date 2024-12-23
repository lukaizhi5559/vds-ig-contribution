
/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withPerformance } from 'storybook-addon-performance';

import { Shell, ShellProps } from '..';

export default {
  title: 'Controls/Shell',
  component: Shell,
  decorators: [withPerformance],
} as Meta;

const Template: StoryFn<ShellProps> = (args) => {
  return <Shell {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  skillList: []
} as ShellProps;

Default.parameters = {
  options: { },
  controls: { disable: false },
};
