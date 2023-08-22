import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';
import React from 'react';

import type { ComponentProps } from 'lib/component-props';
import withStyles from 'lib/enhancers/withStyles';

import styles from './Container70.module.scss';

const cx = classNames.bind(styles);

const Container70 = (props: ComponentProps): JSX.Element => {
  const { className, rendering } = props;

  return (
    <div className={cx('container-70', className)}>
      <div className={cx('container-70__col')}>
        <Placeholder key={0} name="jss-container-70-content" rendering={rendering} />
      </div>
    </div>
  );
};

export default withStyles()<ComponentProps>(Container70);
