import { Text, Field, withDatasourceCheck, Item, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import styles from './DatasourceWithChildrenContentResolver.module.scss';

type DatasourceWithChildrenContentResolverProps = ComponentProps & {
  fields: {
    title: Field<string>;
    body: Field<string>;
    children: Item[];
  };
};

/**
 * A component that uses the custom Datasource with Children Content Resolver.
 */
const DatasourceWithChildrenContentResolver = ({ fields }: DatasourceWithChildrenContentResolverProps): JSX.Element => {
  return (
    <div className={styles.datasourceWithChildrenContentResolver}>
      <Text tag="h2" className="contentTitle" field={fields.title} />
      <RichText className="contentDescription" field={fields.body} />

      <section>
        <h5>Children Sitecore Items</h5>
        <p>Rendering the Sub Item Title from children Items of the Datasource.</p>
      </section>
      <ul>
        {fields.children?.map((item, i) => (
          <li key={i}>
            <Text field={item.fields.subItemTitle as Field<string>} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withDatasourceCheck()<DatasourceWithChildrenContentResolverProps>(DatasourceWithChildrenContentResolver);
