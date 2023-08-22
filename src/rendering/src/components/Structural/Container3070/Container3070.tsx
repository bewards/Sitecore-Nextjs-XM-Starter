import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';
import React from 'react';

import type { ComponentProps } from 'lib/component-props';
import withStyles from 'lib/enhancers/withStyles';

import styles from './Container3070.module.scss';

const cx = classNames.bind(styles);

const Container3070 = (props: ComponentProps): JSX.Element => {
  const { className, params = {}, rendering } = props;

  const leftColClass = params?.flipContainerSizes ? 'container-3070__col--70' : 'container-3070__col--30';
  const rightColClass = params?.flipContainerSizes ? 'container-3070__col--30' : 'container-3070__col--70';

  return (
    <div className={cx('container-3070', className)}>
      <div className={cx('container-3070__col', leftColClass)}>
        <Placeholder key={0} name="jss-container-3070-left" rendering={rendering} />
      </div>
      <div className={cx('container-3070__col', rightColClass)}>
        <Placeholder key={1} name="jss-container-3070-right" rendering={rendering} />
      </div>
    </div>
  );
};

export default withStyles()<ComponentProps>(Container3070);
