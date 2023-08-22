import { Field, LinkField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { useContext } from 'react';
import { contextType, HeaderContext } from './Header';
import Link from 'components/helpers/Link/Link';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

type HomeLinkProps = {
  link: LinkField;
  linkText: Field<string>;
};

const HomeLink = (props: HomeLinkProps): JSX.Element | null => {
  const { isMobile, openMenu, currentLang, setOpenMenu } = useContext(HeaderContext) as contextType;

  if (!props || (props.link.value.href == '' && props.linkText.value == '')) {
    return null;
  }

  return (
    <li
      className={cx(
        { 'header__primary-nav-menu-item': isMobile },
        { 'header__primary-nav-menu-item--tertiary': isMobile }
      )}
    >
      <Link
        field={props.link}
        lang={currentLang}
        tabIndex={isMobile && !openMenu ? -1 : 0}
        showLinkTextWithChildrenPresent={false}
        onClick={() => {
          setOpenMenu(false);
        }}
      >
        <Text field={props.linkText} encode={false} />
      </Link>
    </li>
  );
};

export default HomeLink;
