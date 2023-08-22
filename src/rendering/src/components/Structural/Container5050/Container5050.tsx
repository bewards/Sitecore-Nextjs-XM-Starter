import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';

import { ComponentProps } from 'lib/component-props';
import withStyles from 'lib/enhancers/withStyles';

import styles from './Container5050.module.scss';

const cx = classNames.bind(styles);

type Container5050Props = ComponentProps;

const Container5050 = (props: Container5050Props): JSX.Element => {
  const { className, rendering } = props;

  return (
    <div className={cx('container-5050', className)}>
      <div className={cx('container-5050__col')}>
        <Placeholder key={0} name="jss-container-5050-left" rendering={rendering} />
      </div>
      <div className={cx('container-5050__col')}>
        <Placeholder key={0} name="jss-container-5050-right" rendering={rendering} />
      </div>
    </div>
  );
};

export default withStyles()<Container5050Props>(Container5050);
