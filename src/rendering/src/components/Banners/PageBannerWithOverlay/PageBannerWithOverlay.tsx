import {
  Field,
  ImageField,
  Item,
  LinkField,
  Text,
  getFieldValue,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';
import React from 'react';

import ResponsiveImages from 'components/helpers/ResponsiveImages/ResponsiveImages';
import type { ComponentProps } from 'lib/component-props';
import compose from 'lib/enhancers/compose';
import withStyles from 'lib/enhancers/withStyles';
import { getRenderingParam } from 'lib/rendering-params';
import type { RecordOfFields } from 'models/fields';
import type { ResponsiveImageFields } from 'models/responsive-image';
import RichTextWrapper from 'components/helpers/RichText/RichTextWrapper';
import { ButtonVariant } from 'components/helpers/Button/Button';
import { IconVariant } from 'components/helpers/Icon';
import Link, { LinkVariant } from 'components/helpers/Link/Link';

import styles from './PageBannerWithOverlay.module.scss';

type PageBannerWithOverlayFields = ResponsiveImageFields & {
  bannerBody: Field<string>;
  bannerLinkDestination: LinkField;
  bannerLinkIcon: Item | null;
  bannerLinkMode: Item | null;
  bannerLinkText: Field<string>;
  bannerSubtitle: Field<string>;
  bannerTitle: Field<string>;
  desktopImage: ImageField;
  mobileImage: ImageField;
  tabletImage: ImageField;
  imageType: Item | null;
  backgroundColor: Item | null;
  bannerTitleHeadingLevel: Item | null;
};

type PageBannerWithOverlayProps = ComponentProps & {
  fields: PageBannerWithOverlayFields;
};

const cx = classNames.bind(styles);

const PageBannerWithOverlay = (props: PageBannerWithOverlayProps): JSX.Element => {
  const { fields, className, params } = props;

  const overlayMode = getRenderingParam(params.overlayMode);

  const linkIconField = fields.bannerLinkIcon?.fields as RecordOfFields;
  const linkIconValue = getFieldValue<IconVariant>(linkIconField, 'Value');

  const linkModeField = fields.bannerLinkMode?.fields as RecordOfFields;
  const linkModeValue = getFieldValue<ButtonVariant | LinkVariant>(linkModeField, 'Value');

  const bannerTitleHeadingLevelItemField = fields.bannerTitleHeadingLevel?.fields as RecordOfFields;
  const bannerTitleHeadingLevelValue = getFieldValue<string>(bannerTitleHeadingLevelItemField, 'Value') || 'h1';

  const imageClasses: string = cx('image');
  const textClasses: string = cx('text', overlayMode);

  return (
    <div className={cx({ banner: true }, 'component-container-edge', 'component-container-full', className)}>
      <div className={imageClasses} key="page-banner-overlay-image">
        <ResponsiveImages
          desktopImage={fields.desktopImage}
          mobileImage={fields.mobileImage}
          tabletImage={fields.tabletImage}
          imageType={fields.imageType}
          backgroundColor={fields.backgroundColor}
        />
      </div>

      <div className={textClasses} key="page-banner-overlay-text">
        <Text
          className={cx({ title: true, 'text-white': true })}
          encode={typeof fields.bannerTitle.editable !== 'undefined'}
          field={fields.bannerTitle}
          tag={bannerTitleHeadingLevelValue}
          editable={true}
        />
        <Text className={cx({ subtitle: true, 'text-white': true })} field={fields.bannerSubtitle} />
        <RichTextWrapper className={cx('body', { 'text-white': true })} field={fields.bannerBody} tag="div" />
        {props.fields.bannerLinkDestination?.value.href !== '' && (
          <Link
            className={cx('link', { 'text-white': true })}
            field={fields.bannerLinkDestination}
            icon={linkIconValue}
            showLinkTextWithChildrenPresent={false}
            variant={linkModeValue}
          >
            <Text field={fields.bannerLinkText} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default compose<PageBannerWithOverlayProps>(withDatasourceCheck(), withStyles())(PageBannerWithOverlay);
