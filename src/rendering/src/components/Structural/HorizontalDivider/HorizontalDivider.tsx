import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';

import { ComponentProps } from 'lib/component-props';
import withStyles from 'lib/enhancers/withStyles';

import styles from './HorizontalDivider.module.scss';

const cx = classNames.bind(styles);

type DividerProps = ComponentProps;

const HorizontalDivider = (props: DividerProps): JSX.Element => {
  const {
    className,
    params: { enableAriaHidden },
  } = props;
  const { sitecoreContext } = useSitecoreContext();

  const hrComponent: JSX.Element = (
    <hr aria-hidden={enableAriaHidden == '1' ? true : false} className={cx('divider', className)} />
  );

  return sitecoreContext.pageEditing ? <div>{hrComponent}</div> : hrComponent;
};

export default withStyles()<DividerProps>(HorizontalDivider);
