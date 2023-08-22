import { Field, withDatasourceCheck, Item, getFieldValue, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';
import React from 'react';

import { ComponentProps } from 'lib/component-props';
import compose from 'lib/enhancers/compose';
import withStyles from 'lib/enhancers/withStyles';
import { RecordOfFields } from 'models/fields';

import styles from './Listings.module.scss';
import ToutListingCard, { type ToutCardFields } from './ToutListingCard';

type ToutListingFields = {
  children: Item[];
  heading: Field<string>;
  headingLevel: Item;
  headingTextStyle: Item | null;
};

type ToutListingProps = ComponentProps & {
  fields: ToutListingFields;
};

const cx = classNames.bind(styles);

const ThreeColumnToutListing = (props: ToutListingProps): JSX.Element => {
  const { className, fields } = props;
  const { children, heading, headingLevel, headingTextStyle } = fields;

  const headLvl = headingLevel?.fields as RecordOfFields;

  const titleTextStyleItemField = headingTextStyle?.fields as RecordOfFields;
  const titleTextStyleValue = getFieldValue<string>(titleTextStyleItemField, 'Value') || 'coconut';

  return (
    <div className={cx('tout-center', className)}>
      <Text className={cx(titleTextStyleValue)} encode={false} field={heading} tag={getFieldValue(headLvl, 'Value')} />
      <div className={cx('tout-container')}>
        {children?.map((item, i) => (
          <ToutListingCard key={i} fields={item.fields as ToutCardFields} />
        ))}
      </div>
    </div>
  );
};

export default compose<ToutListingProps>(withDatasourceCheck(), withStyles())(ThreeColumnToutListing);
