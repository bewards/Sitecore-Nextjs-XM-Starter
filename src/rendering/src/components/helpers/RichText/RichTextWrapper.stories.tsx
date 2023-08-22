import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RichTextWrapper from './RichTextWrapper';

export default {
  title: 'Components/RichTextWrapper',
  component: RichTextWrapper,
} as ComponentMeta<typeof RichTextWrapper>;

const Template: ComponentStory<typeof RichTextWrapper> = (args) => <RichTextWrapper {...args} />;

export const RichText = Template.bind({});
RichText.args = {
  className: 'custom-class',
  field: {
    value: '<p>This is a rich text content.</p>',
    editable:
      '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><h4>Heading 4</h4><h5>Heading 5</h5><h6>Heading 6</h6><p> This is an editable rich text content.</p>',
  },
  tag: 'div',
};
