/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withPerformance } from 'storybook-addon-performance';

import { FigmaProvider, FigmaProviderProps } from './..';

export default {
  title: 'Controls/FigmaProvider',
  component: FigmaProvider,
  decorators: [withPerformance],
} as Meta;

const Template: StoryFn<FigmaProviderProps> = (args) => {
  return <FigmaProvider {...args} />;
};

export const Default = Template.bind({});

Default.args = {} as FigmaProviderProps;

Default.parameters = {
  options: { fluentVersion: 9 },
  controls: { disable: false },
};
