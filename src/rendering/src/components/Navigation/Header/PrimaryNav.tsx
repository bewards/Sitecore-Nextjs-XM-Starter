import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import { useI18n } from 'next-localization';

import Link from 'components/helpers/Link/Link';
import { GetLinkFieldIcon } from 'models/fields';
import { contextType, HeaderContext, PrimaryNavigation } from './Header';
import PrimaryNavItem from './PrimaryNavItem';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

type PrimaryNavProps = {
  id: string;
  navItem?: PrimaryNavigation;
  children?: React.ReactNode;
};

const PrimaryNav = (props: PrimaryNavProps): JSX.Element | null => {
  // const PrimaryNav = React.forwardRef<HTMLElement, PrimaryNavProps>(
  //   (props: PrimaryNavProps, ref: React.MutableRefObject<HTMLElement>): JSX.Element | null => {
  const { isMobile, openMenu, closeMenu, currentLang, currentPage, setOpenSubNav, setOpenMenu, hidden, setHidden } =
    useContext(HeaderContext) as contextType;
  const { t } = useI18n();
  const isHomePage = props.navItem?.link?.value.href == currentPage;
  // const [hidden, setHidden] = useState(true);

  function handleAnimationStart() {
    setHidden(false);
  }

  function handleAnimationEnd() {
    setHidden(true);
  }

  if (!isMobile && !props.navItem) {
    return null;
  }

  return (
    <nav
      // ref={ref}
      id={props.id}
      aria-label={t('Aria-Label-Primary')}
      aria-hidden={isMobile && !openMenu}
      className={cx('header__primary-nav', {
        'header__primary-nav--open': openMenu && isMobile,
        'header__primary-nav--close': closeMenu && isMobile,
        'd-none': (!openMenu && hidden) || (!openMenu && !closeMenu && !hidden && isMobile), // Second check is for initial page load. Everything except isMobile starts false
        'invisible ': (!openMenu && hidden) || (!openMenu && !closeMenu && !hidden && isMobile),
      })}
      onAnimationStart={handleAnimationStart}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={cx('container', 'header__primary-nav-container')}>
        <ul className={cx('header__primary-nav-menu')}>
          {props.navItem?.link?.value.href ? (
            <li
              className={cx('header__primary-nav-menu-item', 'header__primary-nav-menu-item--home', {
                'header__primary-nav-menu-item--current': isHomePage,
              })}
            >
              <Link
                field={props.navItem.link}
                lang={currentLang}
                aria-current={isHomePage ? 'page' : undefined}
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
                {props.navItem.linkText?.value}
              </Link>
            </li>
          ) : null}
          {props.navItem?.navSections.map((navItem, index) => {
            return <PrimaryNavItem key={index} navItem={navItem} index={index} />;
          })}
          {props.children}
        </ul>
      </div>
    </nav>
  );
};

// PrimaryNav.displayName = 'PrimaryNav';

export default PrimaryNav;
