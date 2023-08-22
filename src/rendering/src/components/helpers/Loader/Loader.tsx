import classNames from 'classnames/bind';
import React from 'react';

import styles from './Loader.module.scss';

/**
 * Style variants enum of the Loader component.
 * @enum
 */
export enum LoaderVariant {
  Spinner = 'spinner',
}

/** Properties interface of the Loader component. */
export interface LoaderProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** React classname of the Loader component. */
  className?: string;

  /**
   * Style variant of the Loader component.
   * @defaultValue `LoaderVariant.Spinner`
   */
  variant?: LoaderVariant;
}

/** Default properties of the Loader component. */
const defaultProps: Partial<LoaderProps> = {
  variant: LoaderVariant.Spinner,
};

/**
 * Classnames binding for the Loader component.
 * @see [Classnames Usage](https://github.com/JedWatson/classnames#alternate-bind-version-for-css-modules)
 */
const cx = classNames.bind(styles);

/**
 * A Sitecore-ready implementation of the Loader component.
 *
 * @example
 * ```tsx
 * <Loader variant={LoaderVariant.Spinner} />
 * ```
 *
 * @param props - Loader properties.
 * @returns A JSX element.
 */
const Loader: React.FC<LoaderProps> = (props) => {
  const { className, variant, ...rest } = props;

  /** Combined className string for the underlying label element. */
  const classes: string = cx(
    {
      loader: true,
      [variant as LoaderVariant]: true,
    },
    className
  );

  return (
    <label className={classes} {...rest}>
      <span className={cx({ label: true, 'screen-reader-only': true })}>Loading...</span>
      <progress className={cx({ progress: true, 'screen-reader-only': true })} />
      <div className={styles.value} />
      <div className={styles.track} />
    </label>
  );
};

Loader.defaultProps = defaultProps;
Loader.displayName = 'Loader';

export default Loader;
