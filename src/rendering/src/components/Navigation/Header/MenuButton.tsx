import React, { useContext } from 'react';
import { useI18n } from 'next-localization';
import Icon from 'components/helpers/Icon/Icon';
import classNames from 'classnames/bind';
import { contextType, HeaderContext } from './Header';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

type MenuBtnProps = {
  id: string;
};

const MenuButton = (props: MenuBtnProps): JSX.Element => {
  // const MenuButton = React.forwardRef<HTMLElement, MenuBtnProps>((props: MenuBtnProps, ref): JSX.Element => {
  const { isMobile, setOpenMenu, openMenu, setCloseMenu, setHidden } = useContext(HeaderContext) as contextType;
  const { t } = useI18n();

  return (
    <button
      type="button"
      aria-hidden={!isMobile}
      aria-controls={props.id}
      aria-expanded={openMenu}
      aria-label={openMenu ? t('Aria-Label-CloseMenu') : t('Aria-Label-OpenMenu')}
      className={cx('d-lg-none', 'header__menu-btn')}
      onClick={() => {
        setHidden(false);
        setOpenMenu(isMobile && openMenu ? false : true);
        setCloseMenu(isMobile && openMenu);

        if (!(isMobile && openMenu)) {
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
        }
      }}
    >
      <Icon className={cx('header__menu-icon')} variant={openMenu ? 'close' : 'menu'} />
    </button>
  );
};

// MenuButton.displayName = 'MenuButton';

export default MenuButton;
