import React from 'react';
import { RichText as JSSRichText, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames/bind';

import styles from './RichTextWrapper.module.scss';

export interface RichTextWrapperProps {
  className?: string;
  field: RichTextField;
  tag?: string;
  editable?: boolean;
  // Rest of the props...
}

const cx = classNames.bind(styles);

const RichTextWrapper: React.FC<RichTextWrapperProps> = (props) => {
  const { className, field, tag, editable, ...rest } = props;
  const classes = cx('rich-text', className);

  return <JSSRichText className={classes} field={field} tag={tag} editable={editable} {...rest} />;
};

export default RichTextWrapper;
