import { useContext } from 'react';
import classNames from 'classnames/bind';
import { useI18n } from 'next-localization';

import Link from 'components/helpers/Link/Link';
import { GetLinkFieldIcon } from 'models/fields';
import { contextType, HeaderContext, UtilitySection, UtilityLinkItem, FlyOut } from './Header';

import styles from './Header.module.scss';
import UtilityNavFlyOut from './UtilityNavFlyOut';

const cx = classNames.bind(styles);

type SecondaryNavProps = {
  utilitySection: UtilitySection;
  children?: React.ReactNode;
};

const SecondaryNav = (props: SecondaryNavProps): JSX.Element => {
  const { isMobile, currentLang, currentPage, setOpenMenu } = useContext(HeaderContext) as contextType;
  const { t } = useI18n();

  if (!props.utilitySection) {
    return <>{props.children}</>;
  }

  return (
    <>
      <nav aria-hidden={isMobile} aria-label={t('Aria-Label-Utility')} className={cx('header__secondary-nav')}>
        <ul>
          {props.utilitySection.utilityLinks.map((utility, i) => {
            if ((utility as UtilityLinkItem)?.link) {
              const utilityLinkItem: UtilityLinkItem = utility as UtilityLinkItem;
              return (
                <li key={i}>
                  <Link
                    field={utilityLinkItem.link}
                    lang={currentLang}
                    icon={GetLinkFieldIcon(utilityLinkItem.link)}
                    aria-current={utilityLinkItem.link.value.href == currentPage ? 'page' : undefined}
                    showLinkTextWithChildrenPresent={false}
                    onClick={() => {
                      setOpenMenu(false);
                    }}
                  >
                    {utilityLinkItem.linkText?.value}
                  </Link>
                </li>
              );
            } else {
              const utilityFlyOut: FlyOut = utility as FlyOut;
              return (
                <li key={i}>
                  <UtilityNavFlyOut
                    userTypeDropdownLabel={utilityFlyOut.userTypeDropdownLabel}
                    customerTypes={utilityFlyOut.customerTypes}
                    usernameLabel={utilityFlyOut.usernameLabel}
                    buttonText={utilityFlyOut.buttonText}
                    errorTextForDropdown={utilityFlyOut.errorTextForDropdown}
                    errorTextForUsername={utilityFlyOut.errorTextForUsername}
                    mobileIcon={utilityFlyOut.mobileIcon}
                    mobileDestination={utilityFlyOut.mobileDestination}
                  />
                </li>
              );
            }
          })}
        </ul>
      </nav>
      {isMobile &&
        props.utilitySection.utilityLinks.map((utility, i) => {
          if ((utility as FlyOut)?.mobileIcon) {
            const utilityFlyOut: FlyOut = utility as FlyOut;
            return (
              <UtilityNavFlyOut
                key={i}
                userTypeDropdownLabel={utilityFlyOut.userTypeDropdownLabel}
                customerTypes={utilityFlyOut.customerTypes}
                usernameLabel={utilityFlyOut.usernameLabel}
                buttonText={utilityFlyOut.buttonText}
                errorTextForDropdown={utilityFlyOut.errorTextForDropdown}
                errorTextForUsername={utilityFlyOut.errorTextForUsername}
                mobileIcon={utilityFlyOut.mobileIcon}
                mobileDestination={utilityFlyOut.mobileDestination}
              />
            );
          } else {
            return null;
          }
        })}
      {props.children}
    </>
  );
};

export default SecondaryNav;
