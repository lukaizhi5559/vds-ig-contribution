/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withPerformance } from 'storybook-addon-performance';

import { NewThingStuff, NewThingStuffProps } from './..';

export default {
  title: 'Controls/NewThingStuff',
  component: NewThingStuff,
  decorators: [withPerformance],
} as Meta;

const Template: StoryFn<NewThingStuffProps> = (args) => {
  return <NewThingStuff {...args} />;
};

export const Default = Template.bind({});

Default.args = {} as NewThingStuffProps;

Default.parameters = {
  options: { fluentVersion: 9 },
  controls: { disable: false },
};
