import {
  Text,
  Field,
  ImageField,
  Image,
  LinkField,
  Item,
  getFieldValue,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';
import React from 'react';

import RichTextWrapper from 'components/helpers/RichText/RichTextWrapper';
import Link, { LinkVariant } from 'components/helpers/Link/Link';
import { ButtonVariant } from 'components/helpers/Button/Button';
import { RecordOfFields } from 'models/fields';

import styles from './Listings.module.scss';

const cx = classNames.bind(styles);

type ToutListingCardProps = {
  fields: ToutCardFields;
  rendering?: ComponentRendering;
};

export type ToutCardFields = {
  title: Field<string>;
  titleTextStyle: Item | null;
  titleLevel: Item;
  image: ImageField;
  description: Field<string>;
  buttonLink: LinkField;
  buttonLinkMode: Item;
  arrowLink: LinkField;
};

const ToutListingCard = (props: ToutListingCardProps): JSX.Element => {
  const titleLvl = props.fields.titleLevel?.fields as RecordOfFields;

  const btnMode = props.fields.buttonLinkMode?.fields as RecordOfFields;
  const btnFieldValue = getFieldValue<ButtonVariant | LinkVariant>(btnMode, 'Value');
  const titleTextStyleItemField = props.fields.titleTextStyle?.fields as RecordOfFields;
  const textStyleValue = getFieldValue<string>(titleTextStyleItemField, 'Value') || 'coconut';

  const card = (
    <div
      className={cx({
        'tout-card-container': true,
        'has-button-no-link-spacing':
          props.fields.arrowLink?.value.href == '' && props.fields.buttonLink?.value.href !== '',
      })}
    >
      <Image class={styles['tout-card-container__image']} field={props.fields.image} />

      <Text
        field={props.fields.title}
        className={cx({ [textStyleValue]: true })}
        tag={getFieldValue(titleLvl, 'Value')}
        encode={false}
      />

      <RichTextWrapper
        tag="div"
        field={props.fields.description}
        className={styles['tout-card-container__description']}
      />

      {props.fields.buttonLink?.value.href !== '' && (
        <div className={styles['button']}>
          <Link className={btnFieldValue} field={props.fields.buttonLink} variant={btnFieldValue} />
        </div>
      )}
      {props.fields.arrowLink?.value.href !== '' && (
        <Link field={props.fields.arrowLink} className={styles['tout-card-container__arrowLink']} icon="carat" />
      )}
    </div>
  );

  if (props.rendering) {
    return <div className={cx({ 'd-grid': true })}>{card}</div>;
  }

  return card;
};

export default ToutListingCard;
