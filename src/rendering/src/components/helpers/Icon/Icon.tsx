import classNames from 'classnames/bind';
import React from 'react';

import { IconVariant, svgByIconVariant } from './Icon.data';
import styles from './Icon.module.scss';

/** Properties interface of the Icon component. */
export interface IconProps {
  /** Determines if the icon should be read by screen readers. */
  ariaHidden?: boolean;

  /** Custom classname of the Icon component. */
  className?: string;

  /** Style variant of the Icon component. */
  variant: IconVariant;
}

/**
 * Classnames binding for the Icon component.
 * @see [Classnames Usage](https://github.com/JedWatson/classnames#alternate-bind-version-for-css-modules)
 */
const cx = classNames.bind(styles);

/**
 * A Sitecore-ready implementation of the Icon component.
 *
 * @example
 * ```tsx
 * <Icon variant="app" />
 * ```
 *
 * @param props - Icon properties.
 * @returns A JSX element.
 */
const Icon: React.FC<IconProps> = (props) => {
  const { ariaHidden, className, variant } = props;

  const classes = cx({ icon: true }, className);
  const svg = svgByIconVariant[variant];

  return variant === 'none' ? null : (
    <div aria-hidden={ariaHidden} className={classes}>
      {svg}
    </div>
  );
};

export default Icon;
