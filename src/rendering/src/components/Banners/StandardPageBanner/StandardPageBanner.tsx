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
import RichTextWrapper from 'components/helpers/RichText/RichTextWrapper';
import { ButtonVariant } from 'components/helpers/Button/Button';
import { IconVariant } from 'components/helpers/Icon';
import Link, { LinkVariant } from 'components/helpers/Link/Link';
import ResponsiveImages from 'components/helpers/ResponsiveImages/ResponsiveImages';
import { ComponentProps } from 'lib/component-props';
import compose from 'lib/enhancers/compose';
import withStyles from 'lib/enhancers/withStyles';
import { getRenderingParam } from 'lib/rendering-params';
import { RecordOfFields } from 'models/fields';

import styles from './StandardPageBanner.module.scss';

const cx = classNames.bind(styles);

type StandardPageBannerProps = ComponentProps & {
  fields: {
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
    bannerTitleTextStyle: Item | null;
    bannerSubtitleHeadingLevel: Item | null;
    bannerSubtitleTextStyle: Item | null;
  };
};

const StandardPageBanner = (props: StandardPageBannerProps): JSX.Element => {
  const { className, fields, params } = props;
  const contentBackgroundColor = getRenderingParam(params.contentBackgroundColor);
  const imageDirection = getRenderingParam(params.imageDirection);
  const presentationMode = getRenderingParam(params.presentationMode);

  const linkIconField = fields.bannerLinkIcon?.fields as RecordOfFields;
  const linkIconValue = getFieldValue<IconVariant>(linkIconField, 'Value');

  const linkModeField = fields.bannerLinkMode?.fields as RecordOfFields;
  const linkModeValue = getFieldValue<ButtonVariant | LinkVariant>(linkModeField, 'Value');

  const bannerTitleHeadingLevelItemField = fields.bannerTitleHeadingLevel?.fields as RecordOfFields;
  const bannerTitleHeadingLevelValue = getFieldValue<string>(bannerTitleHeadingLevelItemField, 'Value') || 'h1';

  const bannerTitleTextStyleItemField = fields.bannerTitleTextStyle?.fields as RecordOfFields;
  const bannerTitleTextStyleValue = getFieldValue<string>(bannerTitleTextStyleItemField, 'Value') || 'coconut';

  const bannerSubtitleHeadingLevelItemField = fields.bannerSubtitleHeadingLevel?.fields as RecordOfFields;
  const bannerSubtitleHeadingLevelValue = getFieldValue<string>(bannerSubtitleHeadingLevelItemField, 'Value') || 'h1';

  const bannerSubtitleTextStyleItemField = fields.bannerSubtitleTextStyle?.fields as RecordOfFields;
  const bannerSubtitleTextStyleValue = getFieldValue<string>(bannerSubtitleTextStyleItemField, 'Value') || 'coconut';

  const imagecolumnClasses: string = cx('image-column', contentBackgroundColor);
  const textcolumnClasses: string = cx('text-column', contentBackgroundColor);

  const imageColumn = (
    <div className={imagecolumnClasses} key="standard-page-banner-image-column">
      <ResponsiveImages
        desktopImage={fields.desktopImage}
        mobileImage={fields.mobileImage}
        tabletImage={fields.tabletImage}
        imageType={fields.imageType}
        backgroundColor={fields.backgroundColor}
      />
    </div>
  );
  const hasWhiteText = contentBackgroundColor.includes('text-white');
  const textColumn = (
    <div className={textcolumnClasses} key="standard-page-banner-text-column">
      <Text
        className={cx({ title: true, 'text-white': hasWhiteText, [bannerTitleTextStyleValue]: true })}
        encode={typeof fields.bannerTitle.editable !== 'undefined'}
        field={fields.bannerTitle}
        tag={bannerTitleHeadingLevelValue}
        editable={true}
      />
      <Text
        className={cx({ subtitle: true, [bannerSubtitleTextStyleValue]: true })}
        field={fields.bannerSubtitle}
        tag={bannerSubtitleHeadingLevelValue}
      />
      <RichTextWrapper className={cx('body')} field={fields.bannerBody} tag="div" />
      {props.fields.bannerLinkDestination?.value.href !== '' && (
        <Link
          className={cx('link', { 'text-white': hasWhiteText })}
          field={fields.bannerLinkDestination}
          icon={linkIconValue}
          showLinkTextWithChildrenPresent={false}
          variant={linkModeValue}
        >
          <Text field={fields.bannerLinkText} />
        </Link>
      )}
    </div>
  );

  return (
    <div
      className={cx(
        'banner',
        `mode-${presentationMode}`,
        'component-container-edge',
        'component-container-full',
        className
      )}
    >
      {imageDirection === 'left' ? [imageColumn, textColumn] : [textColumn, imageColumn]}
    </div>
  );
};

export default compose<StandardPageBannerProps>(withDatasourceCheck(), withStyles())(StandardPageBanner);
