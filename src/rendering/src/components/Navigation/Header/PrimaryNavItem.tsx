import { useContext } from 'react';
import classNames from 'classnames/bind';
import { useI18n } from 'next-localization';

import Link from 'components/helpers/Link/Link';
import Button from 'components/helpers/Button/Button';
import { GetLinkFieldIcon } from 'models/fields';

import { contextType, HeaderContext, NavSections } from './Header';
import Subnavigation from './Subnavigation';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

type PrimaryNavItemProps = {
  index: number;
  navItem: NavSections;
};

const PrimaryNavItem = (props: PrimaryNavItemProps): JSX.Element | null => {
  const { isMobile, openMenu, openSubNav, setOpenSubNav, handleBlur, currentLang, currentPage, setOpenMenu } =
    useContext(HeaderContext) as contextType;
  const { t } = useI18n();
  const isOpen = openSubNav === props.index;
  const subNavId = `sub-nav-${props.index}`;

  if (!props.navItem.subNavSections?.length && !props.navItem.link) return null;

  if (!props.navItem.subNavSections?.length) {
    return (
      <li
        key={props.index}
        className={cx('header__primary-nav-menu-item', {
          'header__primary-nav-menu-item--current': props.navItem.isDescendant,
        })}
      >
        <Link
          field={props.navItem.link}
          lang={currentLang}
          aria-current={props.navItem.link?.value.href == currentPage ? 'page' : undefined}
          icon={GetLinkFieldIcon(props.navItem.link)}
          tabIndex={isMobile && !openMenu ? -1 : 0}
          showLinkTextWithChildrenPresent={false}
          onFocus={() => {
            setOpenSubNav(-1);
          }}
          onClick={() => {
            document.body.classList.remove('no-scroll');
            setOpenMenu(false);
          }}
        >
          {props.navItem.title?.value}
        </Link>
      </li>
    );
  }

  return (
    <li
      key={props.index}
      className={cx('header__primary-nav-menu-item', {
        'header__primary-nav-menu-item--current': props.navItem.isDescendant,
      })}
    >
      <Button
        type="button"
        lang={currentLang}
        icon={isMobile ? 'carat' : undefined}
        tabIndex={isMobile && !openMenu ? -1 : 0}
        aria-controls={subNavId}
        aria-expanded={isOpen}
        aria-label={isOpen ? t('Aria-Label-CloseSubMenu') : t('Aria-Label-OpenSubMenu')}
        onClick={() => {
          if (isOpen) {
            setOpenSubNav(-1);
          } else {
            setOpenSubNav(props.index);
          }
        }}
        onBlur={handleBlur}
      >
        {props.navItem.title?.value}
      </Button>
      <Subnavigation id={subNavId} sections={props.navItem.subNavSections} isOpen={isOpen} />
    </li>
  );
};

export default PrimaryNavItem;
