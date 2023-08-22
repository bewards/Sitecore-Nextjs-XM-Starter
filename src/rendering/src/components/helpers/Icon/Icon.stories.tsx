import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import IconComponent from './Icon';

export default {
  args: {
    variant: 'app',
  },
  component: IconComponent,
  parameters: {
    controls: { exclude: 'className' },
  },
  title: 'Components/Icon',
} as ComponentMeta<typeof IconComponent>;

const Template: ComponentStory<typeof IconComponent> = (args) => {
  const { ...rest } = args;
  return <IconComponent {...rest} />;
};

export const Icon = Template.bind({});
