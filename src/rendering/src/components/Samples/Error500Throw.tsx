import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type Error500ThrowProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Error500Throw = (props: Error500ThrowProps): JSX.Element => (
  <div>
    <p>Error500Throw Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default withDatasourceCheck()<Error500ThrowProps>(Error500Throw);
