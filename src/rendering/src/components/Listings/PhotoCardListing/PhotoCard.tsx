import { Image, Text, ImageField, LinkField, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';
import React from 'react';

import Link from 'components/helpers/Link/Link';

import styles from './PhotoCardListing.module.scss';

export type PhotoCardFields = {
  image: ImageField;
  link: LinkField;
  linkText: Field<string>;
};

type PhotoCardProps = {
  fields: PhotoCardFields;
};

const cx = classNames.bind(styles);

const PhotoCard = (props: PhotoCardProps): JSX.Element => {
  const { fields } = props;
  const { image, link, linkText } = fields;

  const href = link?.value?.href;

  return (
    <>
      <Image
        class={cx({ 'photo-card-container__image': true, 'has-link': href })}
        field={image}
        onClick={() => {
          if (!href) return;

          if (link?.value.target === '_blank') {
            window.open(href);
          } else {
            window.location.href = href;
          }
        }}
      />
      <div className={cx('photo-card-container__content')}>
        {href !== '' && (
          <Link
            field={link}
            className={cx('photo-card-container__arrowLink')}
            showLinkTextWithChildrenPresent={false}
            icon="carat"
          >
            <Text field={linkText} encode={false} />
          </Link>
        )}
      </div>
    </>
  );
};

export default PhotoCard;
