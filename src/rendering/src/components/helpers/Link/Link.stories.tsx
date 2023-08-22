import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { I18nProvider } from 'next-localization';

import { ButtonVariant } from 'components/helpers/Button/Button';
import dictionary from '../../../../data/dictionary/storybook-dictionary-data.json';

import LinkComponent, { LinkVariant } from './Link';

export default {
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: ['carat', 'download', 'external-link', 'none'],
    },
    variant: {
      control: { type: 'select' },
      mapping: LinkVariant,
      options: [...Object.values(LinkVariant), ...Object.values(ButtonVariant)].filter(
        (variant) => variant !== 'anchor'
      ),
    },
  },
  args: {
    icon: 'carat',
    href: '#',
    target: '_blank',
    variant: LinkVariant.Standalone,
  },
  component: LinkComponent,
  parameters: {
    controls: { exclude: 'onClick' },
  },
  title: 'Components/Link',
} as ComponentMeta<typeof LinkComponent>;

const Template: ComponentStory<typeof LinkComponent> = (args) => {
  const { children, href, target, ...rest } = args;
  const linkFieldValue: LinkField = {
    value: {
      href: href || '#',
      text: 'text',
      linktype: 'internal',
      url: '#',
      anchor: '',
      title: 'title',
      target,
      class: '',
      querystring: '',
    },
  };

  return (
    <I18nProvider lngDict={dictionary} locale="en">
      <LinkComponent
        {...rest}
        field={linkFieldValue}
        onClick={action('click', { clearOnStoryChange: true })}
        showLinkTextWithChildrenPresent={false}
      >
        {children || 'Click Me!'}
      </LinkComponent>
    </I18nProvider>
  );
};

export const Link = Template.bind({});
