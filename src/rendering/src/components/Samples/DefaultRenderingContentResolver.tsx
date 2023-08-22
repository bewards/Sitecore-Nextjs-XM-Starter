import {
  Text,
  RichText,
  Field,
  withDatasourceCheck,
  ImageField,
  Link,
  LinkField,
  Item,
  Image,
  useSitecoreContext,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { BasePageFields } from 'src/models/page-types';
import styles from './DefaultRenderingContentResolver.module.scss';

type DefaultRenderingContentResolverProps = ComponentProps & {
  fields: {
    title: Field<string>;
    body: Field<string>;
    image: ImageField;
    link: LinkField;
    itemLink: Item;
    contentList: Item[];
  };
};

/**
 * A component that uses the OOTB default content resolver
 * that automatically returns the Datasource item in layout data
 */
const DefaultRenderingContentResolver = ({ fields }: DefaultRenderingContentResolverProps): JSX.Element => {
  const value = useSitecoreContext();
  const pageFields = value.sitecoreContext.route?.fields as BasePageFields;
  console.log(value);

  return (
    <div className={styles.defaultRenderingContentResolver}>
      <Text tag="h2" className="contentTitle" field={fields.title} />
      <RichText className="contentDescription" field={fields.body} />

      <section>
        <h5>Image Field</h5>
        <p>If the Image needs to be inline, then use the regular Sitecore Image tag Helper</p>
        <Image field={fields.image} />
        <p>
          If the Image can grow to the parent container, then use the NextImage Sitecore tag Helper with{' '}
          <code>layout=responsive</code>
        </p>
        <NextImage layout="responsive" field={fields.image} />
      </section>

      <section>
        <h5>Link Field</h5>
        <Link field={fields.link} />
      </section>

      <section>
        <h5>Item Link Field</h5>
        <p>
          A Sitecore Field, such as <strong>Droptree</strong> or <strong>Droplink</strong>, that links to a single Item.
        </p>
        {fields.itemLink && (
          <ul>
            <li>
              <strong>Heading Field</strong>: <Text field={fields.itemLink.fields.heading as Field<string>} />
            </li>
            <li>
              <strong>Content Field</strong>:{' '}
              <RichText className="contentDescription" field={fields.itemLink.fields.content as Field<string>} />
            </li>
          </ul>
        )}
      </section>

      <section>
        <h5>Content List Field</h5>
        <p>
          A Sitecore Field, such as <strong>Multilist</strong>, that links to multiple items.
        </p>
        {fields.contentList &&
          fields.contentList.map((listItem, index) => (
            <div key={`localListItem-${index}`}>
              {/* The referenced item's fields can be rendered and edited using normal helper components: */}
              <p>
                <strong>Page Title Field: </strong>
                <Text field={listItem.fields.title as Field<string>} />
              </p>
            </div>
          ))}
      </section>

      <section>
        <h5>Page Specific Fields</h5>
        <p>We also have access to route level fields.</p>
        <ul>
          <li>
            <strong>Current Page, Title Field: </strong>
            <Text field={pageFields.title} />
          </li>
        </ul>
      </section>
    </div>
  );
};

export default withDatasourceCheck()<DefaultRenderingContentResolverProps>(DefaultRenderingContentResolver);
