import { Link as SitecoreLink, LinkField, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';
import React, { HTMLAttributeAnchorTarget, HTMLAttributeReferrerPolicy } from 'react';
import { useI18n } from 'next-localization';

import buttonStyles from 'components/helpers/Button/Button.module.scss';
import { ButtonVariant } from 'components/helpers/Button/Button';
import Icon, { IconVariant } from 'components/helpers/Icon';
import { isValueInEnum } from 'lib/enum';

import styles from './Link.module.scss';

/**
 * Style variants enum of the Link component.
 * @enum
 */
export enum LinkVariant {
  Inline = 'inline',
  Standalone = 'standalone',
}

export interface SitecoreLinkProps {
  /**
   * Determines if inline editing is permitted.
   * @defaultValue `true`
   */
  editable?: boolean;

  /** Field data of the Link component. */
  field: LinkField;

  /**
   * Determines if a Sitecore `description` should display, even with children present.
   * @defaultValue `true`
   */
  showLinkTextWithChildrenPresent?: boolean;
}

/** Properties interface of the Link component. */
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, SitecoreLinkProps {
  /** React children of the Link component. */
  children?: React.ReactNode;

  /** Determines if the Link component should be treated as a download. */
  download?: boolean;

  /** URL that the Link component points to. */
  href?: string;

  /** Language of the linked URL. */
  hrefLang?: string;

  /** Icon to display within the Link component. */
  icon?: IconVariant;

  /**Set aria-hidden for the indicated icon */
  iconAriaHidden?: boolean;

  /**
   * Callback method for when the Link component is clicked.
   * @param e - A mouse event.
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;

  /** List of URLs to track from when clicked. */
  ping?: string;

  /** Referrer information to send with the URL when clicked. */
  referrerPolicy?: HTMLAttributeReferrerPolicy;

  /** The relationship of the linked URL as space-separated link types. */
  rel?: string;

  /** Determines the focus order of the Link component. */
  tabIndex?: number;

  /** Browsing context for where to display the linked URL. */
  target?: HTMLAttributeAnchorTarget;

  /** Media type of the Link component. */
  type?: string;

  /**
   * Style variant of the Link component.
   * @defaultValue `LinkVariant.Standalone`
   */
  variant?: ButtonVariant | LinkVariant;
}

/** Default properties of the Link component. */
const defaultProps: Partial<LinkProps> = {
  editable: true,
  showLinkTextWithChildrenPresent: true,
  tabIndex: 0,
  variant: LinkVariant.Standalone,
};

/**
 * Classnames binding for the Link component.
 * @see [Classnames Usage](https://github.com/JedWatson/classnames#alternate-bind-version-for-css-modules)
 */
const cx = classNames.bind(styles);

/**
 * A Sitecore-ready implementation of the Link component.
 *
 * @example
 * ```tsx
 * <Link field={linkField} variant={LinkVariant.Standalone}>Click Me!</Link>
 * ```
 *
 * @param props - Link properties.
 * @returns A JSX element.
 */
const Link: React.FC<LinkProps> = (props) => {
  const { sitecoreContext } = useSitecoreContext();
  const {
    children,
    className,
    editable,
    field,
    icon,
    iconAriaHidden,
    onClick,
    showLinkTextWithChildrenPresent,
    variant,
    ...rest
  } = props;
  const { t } = useI18n();

  /** Combined className string for the underlying anchor element. */
  const classes = isValueInEnum(LinkVariant, variant)
    ? cx({ link: true, [variant as LinkVariant]: true }, className)
    : cx(
        {
          button: true,
          [buttonStyles.button]: true,
          [buttonStyles[variant as ButtonVariant]]: variant !== ButtonVariant.Primary,
        },
        className
      );

  /** Combined className string for the Icon component. */
  const iconClasses: string = cx({ icon: true, [icon as IconVariant]: true });
  /** Determines if the link component is being viewed in Experience Editor. */
  const isEditing = sitecoreContext?.pageEditing ?? false;

  /**
   * Event handler for when the anchor element is clicked.
   * @param e - A mouse event.
   */
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  const linkProps = {
    className: classes,
    editable,
    field,
    onClick: handleClick,
    showLinkTextWithChildrenPresent,
    ...rest,
  };

  /**
   * Checking if link has been setup to open a new tab.
   * Will append alt text(optional) and suffix to the
   * link text within a screen reader only element for accessibility.
   */
  const srMessage: string = field.value.title
    ? `${field.value.title} ${t('Aria-Label-ExternalLinkSuffix')}`
    : t('Aria-Label-ExternalLinkSuffix');

  const linkChildren = (
    <>
      {children}
      {field.value.target == '_blank' ? <span className={cx('visually-hidden')}>{` ${srMessage}`}</span> : null}
      {icon ? <Icon className={iconClasses} variant={icon} ariaHidden={iconAriaHidden} /> : null}
    </>
  );

  /**
   * By default, Experience Editor renders two link elements when `children` are present.
   * Our workaround is to render `children` outside of the Link when in Experience Editor only.
   *
   * @see [JSS Link Field](https://github.com/Sitecore/jss/blob/3dcf5a176b441356afce0aea5263419f205ce806/packages/sitecore-jss-react/src/components/Link.tsx#L63)
   */
  return isEditing ? (
    <span className={styles.editing}>
      <SitecoreLink {...linkProps} />
      {linkChildren}
    </span>
  ) : (
    <SitecoreLink {...linkProps}>{linkChildren}</SitecoreLink>
  );
};

Link.defaultProps = defaultProps;
Link.displayName = 'Link';

export default Link;
