import {
  Text,
  Field,
  withDatasourceCheck,
  LinkField,
  ImageField,
  Item,
  getFieldValue,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';
import React from 'react';

import RichTextWrapper from 'components/helpers/RichText/RichTextWrapper';
import { ButtonVariant } from 'components/helpers/Button/Button';
import { IconVariant } from 'components/helpers/Icon';
import Link, { LinkVariant } from 'components/helpers/Link/Link';
import ResponsiveImages from 'components/helpers/ResponsiveImages/ResponsiveImages';
import { ComponentProps } from 'lib/component-props';
import compose from 'lib/enhancers/compose';
import withStyles from 'lib/enhancers/withStyles';
import { getRenderingParam } from 'lib/rendering-params';
import { BREAKPOINTS } from 'models/breakpoints';
import { RecordOfFields } from 'models/fields';

import styles from './ImageTextCallout.module.scss';

type ImageTextCalloutProps = ComponentProps & {
  fields: {
    content: Field<string>;
    desktopImage: ImageField;
    horizontalBorderMode: Field<string>;
    imageDirection: Item;
    link: LinkField;
    linkIcon: Item | null;
    linkMode: Item | null;
    mobileImage: ImageField;
    imageType: Item | null;
    backgroundColor: Item | null;
    presentationMode: Item;
    tabletImage: ImageField;
    title: Field<string>;
    titleHeadingLevel: Item;
  };
};

const cx = classNames.bind(styles);

const ImageTextCallout = (props: ImageTextCalloutProps): JSX.Element => {
  const { className, fields, params } = props;

  const [isMobile, setIsMobile] = React.useState(false);
  const { sitecoreContext } = useSitecoreContext();

  const horizontalBorderModeText = getRenderingParam(params.horizontalBorderMode);

  const imageDirectionItemFields = fields.imageDirection.fields as RecordOfFields;
  const imageDirection = getFieldValue<string>(imageDirectionItemFields, 'Value') || 'left';

  const titleHeadingLevelItemFields = fields.titleHeadingLevel.fields as RecordOfFields;
  const titleHeadingLevel = getFieldValue<string>(titleHeadingLevelItemFields, 'Value');

  const linkIconField = fields.linkIcon?.fields as RecordOfFields;
  const linkIconValue = getFieldValue<IconVariant>(linkIconField, 'Value');

  const linkModeField = fields.linkMode?.fields as RecordOfFields;
  const linkModeValue = getFieldValue<ButtonVariant | LinkVariant>(linkModeField, 'Value');

  const presentationModeItemFields = fields.presentationMode.fields as RecordOfFields;
  const presentationMode = getFieldValue<string>(presentationModeItemFields, 'Value') || '50-50';

  const interactiveElementForLink =
    sitecoreContext.pageEditing || fields.link?.value?.href ? (
      <Link field={fields.link} icon={linkIconValue} variant={linkModeValue} />
    ) : null;

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.MOBILE_MAX}px)`);
    mql.addEventListener('change', (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    });
    setIsMobile(window.innerWidth <= BREAKPOINTS.MOBILE_MAX);
  }, []);

  const textColumn = (
    <div key="text-column" className={cx('text-column')}>
      <Text tag={titleHeadingLevel} field={fields.title} />
      <RichTextWrapper className={cx('text')} field={fields.content} />
      {interactiveElementForLink}
    </div>
  );

  const imageColumn = (
    <div key="text-image" className={cx('image-column')}>
      <ResponsiveImages
        desktopImage={props.fields.desktopImage}
        mobileImage={props.fields.mobileImage}
        tabletImage={props.fields.tabletImage}
        imageType={fields.imageType}
        backgroundColor={fields.backgroundColor}
      />
    </div>
  );

  return (
    <section
      className={cx(
        {
          'section-horizontal-bottom': horizontalBorderModeText === 'bottom' || horizontalBorderModeText === 'both',
          'section-horizontal-top': horizontalBorderModeText === 'top' || horizontalBorderModeText === 'both',
        },
        'image-text-callout',
        `callout-${presentationMode}`,
        className
      )}
    >
      {imageDirection === 'left' || isMobile ? [imageColumn, textColumn] : [textColumn, imageColumn]}
    </section>
  );
};

export default compose<ImageTextCalloutProps>(withDatasourceCheck(), withStyles())(ImageTextCallout);
