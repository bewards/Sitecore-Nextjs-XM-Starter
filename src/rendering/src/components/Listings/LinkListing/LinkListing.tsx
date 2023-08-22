import { Text, Field, LinkField, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';
import React from 'react';

import Link from 'components/helpers/Link/Link';
import type { ComponentProps } from 'lib/component-props';
import compose from 'lib/enhancers/compose';
import withStyles from 'lib/enhancers/withStyles';

import styles from './LinkListing.module.scss';

const cx = classNames.bind(styles);

type LinkItemFields = {
  linkDestination: LinkField;
  linkText: Field<string>;
};

type LinkItem = {
  fields: LinkItemFields;
};

type LinkListingFields = {
  linkItems?: LinkItem[];
  linkTitle: Field<string>;
  viewMoreLinkDestination: LinkField;
  viewMoreLinkText: Field<string>;
};

type LinkListingProps = ComponentProps & {
  fields: LinkListingFields;
};

const LinkListing = (props: LinkListingProps): JSX.Element => {
  const { className, fields } = props;
  const { linkItems, linkTitle, viewMoreLinkDestination, viewMoreLinkText } = fields;

  return (
    <div className={cx('link-listing', className)}>
      <Text field={linkTitle} tag="h2" encode={false} className={cx('link-listing-title')} />
      {viewMoreLinkText?.value !== '' && viewMoreLinkDestination?.value?.href !== '' && (
        <Link
          className={cx('view-more-link')}
          field={viewMoreLinkDestination}
          icon="carat"
          showLinkTextWithChildrenPresent={false}
        >
          <Text field={viewMoreLinkText} />
        </Link>
      )}
      {linkItems && linkItems?.length > 0 && (
        <div className={cx('link-listing-links')}>
          {linkItems?.map((item: LinkItem, index: number) => (
            <Link
              key={index}
              className={cx('link')}
              field={item.fields?.linkDestination}
              showLinkTextWithChildrenPresent={false}
              icon="carat"
            >
              <Text field={item.fields?.linkText} encode={false} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default compose<LinkListingProps>(withDatasourceCheck(), withStyles())(LinkListing);
