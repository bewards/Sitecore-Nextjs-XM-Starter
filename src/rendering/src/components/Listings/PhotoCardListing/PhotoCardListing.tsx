import {
  Field,
  getFieldValue,
  Item,
  LinkField,
  RichText,
  Text,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';
import React from 'react';

import Link from 'components/helpers/Link/Link';
import type { ComponentProps } from 'lib/component-props';
import compose from 'lib/enhancers/compose';
import withStyles from 'lib/enhancers/withStyles';
import type { RecordOfFields } from 'models/fields';

import PhotoCard, { type PhotoCardFields } from './PhotoCard';
import styles from './PhotoCardListing.module.scss';

const cx = classNames.bind(styles);

type PhotoCardListingFields = {
  children: Item[];
  description: Field<string>;
  heading: Field<string>;
  headingLevel: Item;
  link: LinkField;
  linkText: Field<string>;
};

type PhotoCardListingProps = ComponentProps & {
  fields: PhotoCardListingFields;
};

const PhotoCardListing = (props: PhotoCardListingProps): JSX.Element => {
  const { className, fields } = props;
  const { children, description, heading, headingLevel, link, linkText } = fields;

  const headLvl = headingLevel?.fields as RecordOfFields;

  return (
    <div className={cx('photo-listing', className)}>
      <Text
        field={heading}
        tag={getFieldValue(headLvl, 'Value')}
        className={cx('photo-listing-title')}
        encode={false}
      />
      <RichText tag="div" field={description} className={cx('photo-listing-description')} />
      <div className={cx('photo-listing-container')}>
        {children?.map((item: Item, i: number) => (
          <div className={cx('photo-card-container')} key={i}>
            <PhotoCard fields={item.fields as PhotoCardFields} />
          </div>
        ))}
      </div>
      {link?.value?.href !== '' && (
        <Link
          field={link}
          className={cx('photo-listing-view-all')}
          icon="carat"
          showLinkTextWithChildrenPresent={false}
        >
          <Text field={linkText} />
        </Link>
      )}
    </div>
  );
};

export default compose<PhotoCardListingProps>(withDatasourceCheck(), withStyles())(PhotoCardListing);
