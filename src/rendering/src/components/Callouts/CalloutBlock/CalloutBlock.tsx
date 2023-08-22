import {
  RichText as JssRichText,
  Field,
  Image,
  ImageField,
  Item,
  withDatasourceCheck,
  getFieldValue,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { RecordOfFields } from 'models/fields';
import compose from 'lib/enhancers/compose';
import withStyles from 'lib/enhancers/withStyles';
import styles from './CalloutBlock.module.scss';

type CalloutBlockFields = {
  content: Field<string>;
  image: ImageField;
  backgroundColor: Item;
};

type CalloutBlockProps = ComponentProps & {
  fields: CalloutBlockFields;
};

const CalloutBlock = (props: CalloutBlockProps): JSX.Element => {
  const {
    fields: { content, image, backgroundColor },
    className,
  } = props;
  const bgrndColor = backgroundColor?.fields as RecordOfFields;

  const withImage = (
    <div className={styles['icon-flex-item']}>
      <div className={styles['img-cell']}>
        <Image field={image} />
      </div>
      <div>
        <JssRichText field={content} />
      </div>
    </div>
  );

  const withoutImage = <JssRichText field={content} />;

  return (
    <div className={`${styles['calloutBox']} ${getFieldValue(bgrndColor, 'Value')} ${className}`}>
      {image.value?.src === undefined ? withoutImage : withImage}
    </div>
  );
};

export default compose<CalloutBlockProps>(withDatasourceCheck(), withStyles())(CalloutBlock);
