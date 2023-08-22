import classNames from 'classnames/bind';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

type TertiaryNavProps = {
  children: React.ReactNode;
  isHidden: boolean;
};

const TertiaryNav = (props: TertiaryNavProps): JSX.Element | null => {
  return props.isHidden ? null : (
    <nav className={cx('header__tertiary-nav')}>
      <ul>{props.children}</ul>
    </nav>
  );
};

export default TertiaryNav;
