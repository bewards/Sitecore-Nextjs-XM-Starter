import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { useContext } from 'react';
import NextLink from 'next/link';
import classNames from 'classnames/bind';

import { Translation, contextType, HeaderContext } from './Header';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

type TranslationLinkProps = {
  translation: Translation;
  enableTranslation: Field<boolean>;
  translationText?: string;
};

const TranslationLink = (props: TranslationLinkProps): JSX.Element | null => {
  const { setOpenMenu } = useContext(HeaderContext) as contextType;
  const locale = props?.translation.locale ?? 'en';

  /**
   * If the translation link is not enabled or the text for the link
   * is not set we return null
   */
  if (!props || !props.enableTranslation.value) return null;

  /**
   * Setting the href of the translation link based on the locale.
   * Prepending version if locale is not 'en'
   */
  const href = locale == 'en' ? props.translation.href : `/${locale}${props.translation.href}`;

  return (
    <li>
      <NextLink
        href={href}
        locale={locale}
        className={cx('translation-link')}
        onClick={() => {
          setOpenMenu(false);
        }}
      >
        {props.translationText}
      </NextLink>
    </li>
  );
};

export default TranslationLink;
