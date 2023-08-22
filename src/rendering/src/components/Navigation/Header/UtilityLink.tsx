import { useContext } from 'react';
import classNames from 'classnames/bind';

import Link from 'components/helpers/Link/Link';
import { GetLinkFieldIcon } from 'models/fields';

import { contextType, HeaderContext, UtilityLinkItem } from './Header';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

type UtilityLinkProps = {
  index: number;
  linkItem: UtilityLinkItem;
};

const UtilityLink = (props: UtilityLinkProps): JSX.Element | null => {
  const { isMobile, openMenu, currentLang, currentPage, setOpenMenu } = useContext(HeaderContext) as contextType;

  if (!isMobile || !props.linkItem) {
    return null;
  }

  return (
    <li key={props.index} className={cx('header__primary-nav-menu-item', 'header__primary-nav-menu-item--tertiary')}>
      <Link
        field={props.linkItem.link}
        lang={currentLang}
        aria-current={props.linkItem.link?.value.href == currentPage ? 'page' : undefined}
        icon={GetLinkFieldIcon(props.linkItem.link)}
        tabIndex={isMobile && !openMenu ? -1 : 0}
        showLinkTextWithChildrenPresent={false}
        onClick={() => {
          setOpenMenu(false);
          document.body.classList.remove('no-scroll');
        }}
      >
        {props.linkItem.linkText?.value}
      </Link>
    </li>
  );
};

export default UtilityLink;
