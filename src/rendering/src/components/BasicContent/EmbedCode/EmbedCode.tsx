import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React from 'react';

type EmbedCodeProps = ComponentProps & {
  fields: {
    embedCode: Field<string>;
  };
};

const EmbedCode = (props: EmbedCodeProps): JSX.Element => {
  const { fields } = props;

  return <div dangerouslySetInnerHTML={{ __html: fields.embedCode.value }} />;
};

export default withDatasourceCheck()<EmbedCodeProps>(EmbedCode);
