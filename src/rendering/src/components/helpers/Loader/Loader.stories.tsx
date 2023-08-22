import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import LoaderComponent, { LoaderVariant } from './Loader';

export default {
  argTypes: {
    variant: {
      control: { type: 'select' },
      mapping: LoaderVariant,
      options: Object.values(LoaderVariant),
    },
  },
  args: {
    variant: LoaderVariant.Spinner,
  },
  component: LoaderComponent,
  title: 'Components/Loader',
} as ComponentMeta<typeof LoaderComponent>;

const Template: ComponentStory<typeof LoaderComponent> = (args) => (
  <LoaderComponent style={{ width: '16px' }} {...args} />
);

export const Loader = Template.bind({});
