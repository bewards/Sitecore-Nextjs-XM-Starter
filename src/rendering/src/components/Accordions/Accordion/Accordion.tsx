import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';
import React from 'react';

import AccordionItem, { type AccordionItemProps } from 'components/Accordions/AccordionItem/AccordionItem';
import type { ComponentProps } from 'lib/component-props';
import compose from 'lib/enhancers/compose';
import withStyles from 'lib/enhancers/withStyles';

import styles from './Accordion.module.scss';

const cx = classNames.bind(styles);

type AccordionFields = {
  children: AccordionItemProps[];
};

type AccordionProps = ComponentProps & {
  fields: AccordionFields;
};

const Accordion = (props: AccordionProps): JSX.Element => {
  const { className, fields } = props;

  return (
    <div className={cx('container', className)}>
      {fields?.children?.map((childProps: AccordionItemProps) => {
        const { id, ...rest } = childProps;
        return <AccordionItem id={id} key={`accordion-key-${id}`} {...rest} />;
      })}
    </div>
  );
};

export default compose<AccordionProps>(withDatasourceCheck(), withStyles())(Accordion);
