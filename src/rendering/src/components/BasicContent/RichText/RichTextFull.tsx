import { Field, RichText as JssRichText, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';
import React from 'react';

import { ComponentProps } from 'lib/component-props';
import compose from 'lib/enhancers/compose';
import withStyles from 'lib/enhancers/withStyles';

import styles from './RichTextFull.module.scss';

const cx = classNames.bind(styles);

type RichTextFields = {
  content: Field<string>;
};

type RichTextProps = ComponentProps & {
  fields: RichTextFields;
};

const RichTextFull = (props: RichTextProps): JSX.Element | null => {
  const {
    className,
    fields: { content },
    params: { RenderingIdentifier } = {},
  } = props;

  return content ? (
    <div className={cx('component', 'rich-text', 'rich-text-full', className)} id={RenderingIdentifier}>
      <JssRichText field={content} />
    </div>
  ) : null;
};

export default compose<RichTextProps>(withDatasourceCheck(), withStyles())(RichTextFull);
