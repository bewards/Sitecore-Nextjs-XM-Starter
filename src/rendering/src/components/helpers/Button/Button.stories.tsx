import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import ButtonComponent, { ButtonVariant } from './Button';

export default {
  argTypes: {
    variant: {
      control: { type: 'select' },
      mapping: ButtonVariant,
      options: Object.values(ButtonVariant),
    },
  },
  args: {
    disabled: false,
    loading: false,
    variant: ButtonVariant.Primary,
  },
  component: ButtonComponent,
  parameters: {
    controls: { exclude: 'onClick' },
  },
  title: 'Components/Button',
} as ComponentMeta<typeof ButtonComponent>;

const Template: ComponentStory<typeof ButtonComponent> = (args) => {
  const { children, ...rest } = args;

  return (
    <ButtonComponent onClick={action('click', { clearOnStoryChange: true })} {...rest}>
      {children || 'Click Me!'}
    </ButtonComponent>
  );
};

export const Button = Template.bind({});
