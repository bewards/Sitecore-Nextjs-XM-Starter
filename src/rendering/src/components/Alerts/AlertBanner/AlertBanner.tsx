import { Field, Item, Text, getFieldValue, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';
import React from 'react';
import RichTextWrapper from 'components/helpers/RichText/RichTextWrapper';
import Icon, { IconVariant } from 'components/helpers/Icon';
import { ComponentProps } from 'lib/component-props';
import { RecordOfFields } from 'models/fields';
import { useI18n } from 'next-localization';
import styles from './AlertBanner.module.scss';

interface Alert {
  fields: {
    alertPriority: Field<number>;
    body: Field<string>;
    statusType: Item;
    title: Field<string>;
  };
  id: string;
}

type AlertBannerProps = ComponentProps & {
  fields: {
    items: Alert[];
  };
};

const cx = classNames.bind(styles);

const AlertBanner = (props: AlertBannerProps): JSX.Element => {
  const { items } = props.fields;
  const { t } = useI18n();
  const { sitecoreContext } = useSitecoreContext();

  const alerts = items
    .sort((a: Alert, b: Alert) => b.fields?.alertPriority?.value - a.fields?.alertPriority?.value)
    .map((alert: Alert) => {
      const { body, statusType, title } = alert.fields;
      const statusTypeValue = getFieldValue<IconVariant>(statusType?.fields as RecordOfFields, 'Value') || 'error';
      const errorIcon = statusTypeValue === 'warning' ? 'warning' : 'error';

      return (
        <div className={cx({ alert: true, [statusTypeValue]: true })} key={alert.id}>
          <div className={cx({ 'container-md': true, 'icon-flex-item': true })}>
            <Icon className={cx({ 'alert-icon': true, [statusTypeValue]: true })} variant={errorIcon} />
            <div>
              <Text className={cx('title')} field={title} tag="strong" />
              <RichTextWrapper field={body} />
            </div>
          </div>
        </div>
      );
    });

  return sitecoreContext?.pageEditing && alerts.length === 0 ? (
    <div className={cx('alert-placeholder')}>
      <div className="container">{t('AlertPlaceholder')}</div>
    </div>
  ) : (
    <div className={cx('alert-container')}>
      <aside aria-label="Site alerts">{alerts}</aside>
    </div>
  );
};

export default AlertBanner;
