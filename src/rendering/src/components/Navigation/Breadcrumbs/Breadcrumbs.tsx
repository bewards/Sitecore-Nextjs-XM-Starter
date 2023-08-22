import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';
import { useI18n } from 'next-localization';
import React from 'react';

import Icon from 'components/helpers/Icon';
import type { ComponentProps } from 'lib/component-props';
import withStyles from 'lib/enhancers/withStyles';
import { BREAKPOINTS } from 'models/breakpoints';

import styles from './Breadcrumbs.module.scss';

const cx = classNames.bind(styles);

type Breadcrumb = {
  label: Field<string>;
  url: string;
};

type BreadcrumbProps = ComponentProps & {
  fields: {
    homeIcon: Field<boolean>;
    crumbs: Breadcrumb[];
  };
};

const Breadcrumbs = (props: BreadcrumbProps): JSX.Element => {
  const { className, fields } = props;
  const { t } = useI18n();

  const ref = React.useRef<null | HTMLOListElement>(null);

  React.useEffect(() => {
    if (window.innerWidth <= BREAKPOINTS.MOBILE_MAX && ref.current) {
      setTimeout(() => {
        if (ref.current) ref.current.scrollLeft = ref.current.offsetWidth;
      }, 100);
    }
  }, [ref]);

  return (
    <div className={cx('breadcrumbs__wrapper', 'component-container-edge', className)}>
      <div className={cx('container-md')}>
        <div className={cx('row')}>
          <div className={cx('col')}>
            <nav aria-label={t('Aria-Label-Breadcrumb')}>
              <ol ref={ref} itemScope itemType="https://schema.org/BreadcrumbList" className={cx('breadcrumbs')}>
                {fields.crumbs?.map((crumb, index) => {
                  if (index == 0 && fields.homeIcon.value) {
                    return (
                      <li
                        itemScope
                        itemType="https://schema.org/ListItem"
                        itemProp="itemListElement"
                        key={index}
                        className={cx('breadcrumb')}
                      >
                        <a itemProp="item" href={crumb.url}>
                          <Icon ariaHidden={true} variant={'home'} />
                          <span className={cx('visually-hidden')}>
                            <Text itemProp="name" field={crumb.label} />
                          </span>
                        </a>
                        {index + 1 < fields.crumbs.length ? (
                          <Icon className={cx('breadcrumb__divider')} ariaHidden={true} variant={'carat'} />
                        ) : null}
                        <meta itemProp="position" content={`${index + 1}`} />
                      </li>
                    );
                  } else if (crumb.url) {
                    return (
                      <li
                        itemScope
                        itemType="https://schema.org/ListItem"
                        itemProp="itemListElement"
                        key={index}
                        className={cx('breadcrumb')}
                      >
                        <a itemProp="item" href={crumb.url}>
                          <Text itemProp="name" field={crumb.label} encode={false} />
                        </a>
                        {index + 1 < fields.crumbs.length ? (
                          <Icon className={cx('breadcrumb__divider')} ariaHidden={true} variant={'carat'} />
                        ) : null}
                        <meta itemProp="position" content={`${index + 1}`} />
                      </li>
                    );
                  } else {
                    return (
                      <li
                        itemScope
                        itemType="https://schema.org/ListItem"
                        itemProp="itemListElement"
                        key={index}
                        className={cx('breadcrumb')}
                      >
                        <a itemProp="item" aira-current={index == fields.crumbs.length - 1 ? 'location' : undefined}>
                          <Text field={crumb.label} encode={false} itemProp="name" />
                        </a>
                        <meta itemProp="position" content={`${index + 1}`} />
                      </li>
                    );
                  }
                })}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles()<BreadcrumbProps>(Breadcrumbs);
