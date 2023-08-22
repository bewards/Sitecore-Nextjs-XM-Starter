import classNames from 'classnames/bind';
import React from 'react';

import Icon, { IconVariant } from '../Icon';
import Loader, { LoaderVariant } from '../Loader/Loader';

import styles from './Button.module.scss';

/**
 * Style variants enum of the Button component.
 * @enum
 */
export enum ButtonVariant {
  Anchor = 'anchor',
  Danger = 'danger',
  Ghost = 'ghost',
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

/** Properties interface of the Button component. */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** React children of the Button component. */
  children?: React.ReactNode;

  /** Determines if the Button component is disabled. */
  disabled?: boolean;

  /** Icon to display within the Button component. */
  icon?: IconVariant;

  /** Determines if the Button component is loading. */
  loading?: boolean;

  /** Name of the Button component when submitted with a form. */
  name?: string;

  /**
   * Callback method for when the Button component is clicked.
   * @param e - A mouse event.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /** Focus order of the Button component. */
  tabIndex?: number;

  /**
   * Default behavior of the Button component.
   * @defaultValue `'button'`
   */
  type?: 'button' | 'reset' | 'submit';

  /** Value of the Button component when submitted with a form. */
  value?: string;

  /**
   * Style variant of the Button component.
   * @defaultValue `ButtonVariant.Primary`
   */
  variant?: ButtonVariant;
}

/** Default properties of the Button component. */
const defaultProps: Partial<ButtonProps> = {
  type: 'button',
  variant: ButtonVariant.Primary,
};

/**
 * Classnames binding for the Button component.
 * @see [Classnames Usage](https://github.com/JedWatson/classnames#alternate-bind-version-for-css-modules)
 */
const cx = classNames.bind(styles);

/**
 * A Sitecore-ready implementation of the Button component.
 *
 * @example
 * ```tsx
 * <Button variant={ButtonVariant.Primary} />
 * ```
 *
 * @param props - Button properties.
 * @returns A JSX element.
 */
const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, disabled, icon, loading, onClick, tabIndex, variant, ...rest } = props;

  /** Combined className string for the underlying button element. */
  const classes: string = cx({ button: true, loading: loading === true, [variant as ButtonVariant]: true }, className);

  /** Combined className string for the Icon component. */
  const iconClasses: string = cx({ icon: true, [icon as IconVariant]: true });

  /** Determines if the button element is interactive. */
  const interactive = !disabled && !loading;

  /**
   * Event handler for when the button element is clicked.
   * @param e - A mouse event.
   */
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!interactive) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      aria-busy={loading}
      aria-live={loading ? 'polite' : undefined}
      className={classes}
      disabled={disabled}
      onClick={handleClick}
      tabIndex={!interactive ? -1 : tabIndex}
      {...rest}
    >
      {loading ? <Loader variant={LoaderVariant.Spinner} /> : ''}
      {children}
      {icon ? <Icon ariaHidden={true} className={iconClasses} variant={icon} /> : null}
    </button>
  );
};

Button.defaultProps = defaultProps;
Button.displayName = 'Button';

export default Button;
