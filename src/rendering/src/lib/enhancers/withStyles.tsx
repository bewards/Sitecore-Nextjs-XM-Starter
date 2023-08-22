import classNames from 'classnames';
import React from 'react';

import type { ComponentProps as WithStylesProps } from 'lib/component-props';

export function withStyles() {
  return function withStylesEnhancer<ComponentProps extends WithStylesProps>(
    Component: React.ComponentType<ComponentProps>
  ) {
    return function WithStyles(props: ComponentProps) {
      const { params: { Styles } = {} } = props;

      return <Component {...props} className={classNames(Styles)} />;
    };
  };
}

export default withStyles;
