import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { useContext } from 'react';
import classNames from 'classnames/bind';

import Link from 'components/helpers/Link/Link';
import { GetLinkFieldIcon } from 'models/fields';

import { contextType, HeaderContext, SubNavSection } from './Header';
import SubnavigationTitle from './SubnavigationTitle';
import BackButton from './BackButton';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

type SubnavigationProps = {
  id: string;
  sections: SubNavSection[];
  isOpen: boolean;
};

const Subnavigation = (props: SubnavigationProps): JSX.Element | null => {
  const { isMobile, currentLang, handleBlur, setOpenSubNav, setOpenMenu } = useContext(HeaderContext) as contextType;

  if (!props.sections || props.sections?.length < 1) return null;

  return (
    <div id={props.id} className={cx('header__subnavigation', { 'header__subnavigation--open': props.isOpen })}>
      <div className={cx('container', 'header__subnavigation-container')}>
        <div className={cx('row', 'header__subnavigation-row')}>
          <div className={cx('col', 'header__subnavigation-col')}>
            <BackButton controls={props.id} visibile={props.isOpen} />
            {props.sections.map((section, i) => {
              return (
                <section key={i} className={cx('header__subnavigation-section')}>
                  <SubnavigationTitle title={section.title} link={section.link} isOpen={props.isOpen} />
                  <ul>
                    {section.subNavSectionLinks.map((link, j) => {
                      return (
                        <li key={j}>
                          <Link
                            field={link.link}
                            lang={currentLang}
                            data-id="sublink"
                            icon={!isMobile ? 'carat' : GetLinkFieldIcon(section.link)}
                            tabIndex={props.isOpen ? 0 : -1}
                            showLinkTextWithChildrenPresent={false}
                            onBlur={handleBlur}
                            onClick={() => {
                              setOpenMenu(false);
                              setOpenSubNav(-1);
                              document.body.classList.remove('no-scroll');
                            }}
                          >
                            <Text field={link.linkText} encode={false} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>

          <div className={cx('col', 'header__subnavigation-col', 'header__subnavigation--gray')}></div>
        </div>
      </div>
    </div>
  );
};

export default Subnavigation;
