import {
  DictionaryPhrases,
  Field,
  GetStaticComponentProps,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';
import { useI18n } from 'next-localization';
import React, { useEffect, useState, createContext } from 'react';

import { ButtonVariant } from 'components/helpers/Button/Button';
import Link from 'components/helpers/Link/Link';
import { ComponentProps } from 'lib/component-props';
import { BREAKPOINTS } from 'models/breakpoints';

import TertiaryNav from './TertiaryNav';
import LogoLink from './LogoLink';
import HomeLink from './HomeLink';
import TranslationLink from './TranslationLink';
import UtilityLink from './UtilityLink';
import MenuButton from './MenuButton';
import PrimaryNav from './PrimaryNav';
import SecondaryNav from './SecondaryNav';

import styles from './Header.module.scss';
import { dictionaryService } from 'scripts/layout-data-helper';

const cx = classNames.bind(styles);

export interface contextType {
  currentLang: string;
  currentPage: string;
  handleBlur: React.FocusEventHandler;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openMenu: boolean;
  setCloseMenu: React.Dispatch<React.SetStateAction<boolean>>;
  closeMenu: boolean;
  setOpenSubNav: React.Dispatch<React.SetStateAction<number>>;
  openSubNav: number;
  setShowFlyout: React.Dispatch<React.SetStateAction<boolean>>;
  openFlyout: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  hidden: boolean;
}

export const HeaderContext = createContext<contextType | null>(null);

type HeaderProps = ComponentProps & {
  fields: {
    firstLogo: ImageField;
    firstLogoLink: LinkField;
    secondLogo: ImageField;
    secondLogoLink: LinkField;
    enableTranslation: Field<boolean>;
    homeLink: LinkField;
    homeLinkText: Field<string>;
    primaryNav: PrimaryNavigation;
    utilitySection: UtilitySection;
    currentPage: string;
    lang: string;
    translation: Translation;
    utilityNavCustomerTypes: CustomerType[];
  };
};

export type FlyOut = {
  userTypeDropdownLabel: Field<string>;
  customerTypes: CustomerType[];
  usernameLabel: Field<string>;
  buttonText: Field<string>;
  errorTextForDropdown: Field<string>;
  errorTextForUsername: Field<string>;
  mobileIcon: ImageField;
  mobileDestination: LinkField;
};

export type CustomerType = {
  fields: {
    dropdownLabel: Field<string>;
    portalDestinationLink: LinkField;
    forgotPasswordLink: LinkField;
    registerLink: LinkField;
    forgotPasswordShortInstructions: Field<string>;
    forgotPasswordLongInstructions: Field<string>;
  };
};

export type PrimaryNavigation = {
  linkText: Field<string>;
  link: LinkField;
  navSections: NavSections[];
};

export type NavSections = {
  title: Field<string>;
  link: LinkField;
  isDescendant: boolean;
  subNavSections: SubNavSection[];
};

export type SubNavSection = {
  title: Field<string>;
  link: LinkField;
  subNavSectionLinks: SubNavLinks[];
};

export type SubNavLinks = {
  langAttributeValue: Field<string>;
  link: LinkField;
  linkText: Field<string>;
};

export type UtilitySection = {
  utilityLinks: Array<UtilityLinkItem | FlyOut>;
};

export type UtilityLinkItem = {
  linkText: Field<string>;
  link: LinkField;
};

export type Translation = {
  href: string;
  locale: string;
};

const Header = (props: HeaderProps): JSX.Element => {
  const [openMenu, setOpenMenu] = useState(false);
  const [closeMenu, setCloseMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openSubNav, setOpenSubNav] = useState(-1);
  const [openFlyout, setShowFlyout] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { fields } = props;
  const currentLang = fields.lang;
  const currentPage = fields.currentPage;
  const { t } = useI18n();
  const navId = 'header-primary-nav';

  const handleBlur: React.FocusEventHandler<HTMLElement> = (e) => {
    const relatedTarget = e.relatedTarget as HTMLElement;

    if (relatedTarget?.dataset?.id !== 'sublink') {
      setOpenSubNav(-1);
    }

    setShowFlyout(false);
  };

  function isUtilityLink(link: UtilityLinkItem | FlyOut): link is UtilityLinkItem {
    return (link as UtilityLinkItem).link !== undefined;
  }

  useEffect(() => {
    const mql: MediaQueryList = window.matchMedia(`(max-width: ${BREAKPOINTS.MOBILE_MAX}px)`);

    mql.addEventListener('change', (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      setHidden(e.matches);
      if (!e.matches) {
        setOpenMenu(false);
        document.body.classList.remove('no-scroll');
      }
    });

    setIsMobile(window.innerWidth <= BREAKPOINTS.MOBILE_MAX);
  }, [fields.translation.locale, openMenu]);

  return (
    <HeaderContext.Provider
      value={{
        currentPage,
        currentLang,
        handleBlur,
        setIsMobile,
        isMobile,
        setOpenMenu,
        openMenu,
        setCloseMenu,
        closeMenu,
        setOpenSubNav,
        openSubNav,
        setShowFlyout,
        openFlyout,
        hidden,
        setHidden,
      }}
    >
      <header className={cx('header')}>
        <Link
          className={cx('skip-to-content')}
          field={{ value: { href: '#main' } }}
          showLinkTextWithChildrenPresent={false}
          variant={ButtonVariant.Primary}
        >
          {t('SkipToContent-Label')}
        </Link>
        <div className={cx('header__divider')}>
          <div className={cx('container', 'header__divider--wrapper')}>
            <div className={cx('header__branding')}>
              <LogoLink logo={fields.firstLogo} link={fields.firstLogoLink} />
              <LogoLink logo={fields.secondLogo} link={fields.secondLogoLink} />
            </div>
            <div className={cx('header__secondary-nav-wrapper')}>
              <TertiaryNav
                isHidden={
                  !fields.enableTranslation.value && fields.homeLink.value.href == '' && fields.homeLinkText.value == ''
                }
              >
                {!isMobile ? <HomeLink link={fields.homeLink} linkText={fields.homeLinkText} /> : null}
                <TranslationLink
                  translation={fields.translation}
                  enableTranslation={fields.enableTranslation}
                  {...props}
                />
              </TertiaryNav>
              <SecondaryNav utilitySection={fields.utilitySection}>
                {fields.utilitySection?.utilityLinks.filter(isUtilityLink).length &&
                fields.primaryNav?.navSections.length ? (
                  <MenuButton id={navId} />
                ) : null}
              </SecondaryNav>
            </div>
          </div>
        </div>
        <PrimaryNav navItem={fields.primaryNav} id={navId}>
          {fields.utilitySection?.utilityLinks.map((link, index) => {
            if ((link as UtilityLinkItem)?.link) {
              const utilityLinkItem: UtilityLinkItem = link as UtilityLinkItem;
              return <UtilityLink key={index} index={index} linkItem={utilityLinkItem} />;
            } else {
              return null;
            } //NavFlyOuts should not show in Utility Links
          })}
          {isMobile ? <HomeLink link={fields.homeLink} linkText={fields.homeLinkText} /> : null}
        </PrimaryNav>
      </header>
    </HeaderContext.Provider>
  );
};

export const getStaticProps: GetStaticComponentProps = async (rendering, _layoutData, _context) => {
  let data: DictionaryPhrases = {};
  try {
    data = await dictionaryService.fetchDictionaryData(
      (rendering as unknown as HeaderProps).fields.translation.locale ?? 'en'
    );
  } catch (e) {
    console.log(e);
  }

  return {
    translationText: data ? data['Translation-Link'] : '',
  };
};

export default Header;
