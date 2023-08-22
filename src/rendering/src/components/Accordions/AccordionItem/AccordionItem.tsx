import { Field, Item, Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';
import { useState } from 'react';

import Button, { ButtonVariant } from 'components/helpers/Button/Button';
import RichTextWrapper from 'components/helpers/RichText/RichTextWrapper';
import { type ComponentProps } from 'lib/component-props';

import styles from './AccordionItem.module.scss';

const cx = classNames.bind(styles);

type AccordionItemFields = {
  body: Field<string>;
  headingLevel: Item;
  title: Field<string>;
};

export type AccordionItemProps = ComponentProps & {
  fields: AccordionItemFields;
  id: string;
};

const AccordionItem = (props: AccordionItemProps): JSX.Element => {
  const { fields, id } = props;
  const { sitecoreContext } = useSitecoreContext();

  const defaultOpen = sitecoreContext?.pageEditing ?? false;
  const [open, setOpen] = useState(defaultOpen);

  const buttonId = `accordion-button-${id}`;
  const contentId = `accordion-content-${id}`;

  const headingLevel = fields.headingLevel.fields['Value'] as Field<string>;

  const onClick: React.MouseEventHandler = () => {
    setOpen(!open);
  };

  return (
    <div className={cx('container')}>
      <Button
        aria-controls={contentId}
        aria-expanded={open}
        className={cx('button')}
        icon="carat"
        id={buttonId}
        onClick={onClick}
        type="button"
        variant={ButtonVariant.Ghost}
      >
        <Text className={cx('header')} field={fields?.title} tag={headingLevel?.value} />
      </Button>
      <div aria-labelledby={buttonId} className={cx('content')} hidden={!open} id={contentId} role="region">
        <RichTextWrapper field={fields?.body} />
      </div>
    </div>
  );
};

export default AccordionItem;
