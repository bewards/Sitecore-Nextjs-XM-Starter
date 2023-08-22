import { Field, withDatasourceCheck, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import styles from './GraphQLSamples.module.scss';

type GraphQLSamplesProps = ComponentProps & {
  fields: {
    data: {
      datasource: {
        body: Field<string>;
      };
    };
  };
};

const GraphQLSamples = (props: GraphQLSamplesProps): JSX.Element => {
  const fields = props.fields?.data?.datasource;

  return fields ? (
    <div className={styles.graphqlsamples}>
      <h2>GraphQL Patterns</h2>
      <RichText className="contentDescription" field={fields.body} />
    </div>
  ) : (
    <div>no results</div>
  );
};

/**
 * Will be called during SSG
 * @param {ComponentRendering} rendering
 * @param {LayoutServiceData} layoutData
 * @param {GetStaticPropsContext} context
 */
// export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData) => {
//   if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
//     return null;
//   }

//   console.log('graphql sample rules!');

//   return {
//     GraphQLSamples: 'getStaticProps',
//     rendering: rendering,
//     layoutData: layoutData,
//   };
// };

export default withDatasourceCheck()<GraphQLSamplesProps>(GraphQLSamples);
