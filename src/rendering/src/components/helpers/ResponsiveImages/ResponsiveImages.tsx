import { Image, useSitecoreContext, getFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';
import type { ResponsiveImageFields } from 'src/models/responsive-image';
import { RecordOfFields } from 'models/fields';
import classNames from 'classnames/bind';
import styles from './ResponsiveImages.module.scss';

const cx = classNames.bind(styles);

const Default = (props: ResponsiveImageFields): JSX.Element | null => {
  const { imageType, backgroundColor, desktopImage, mobileImage, tabletImage } = props;
  const { sitecoreContext } = useSitecoreContext();

  const imageTypeField = imageType?.fields as RecordOfFields;
  const imageTypeValue = getFieldValue<string>(imageTypeField, 'Value') || 'responsive';

  const backgroundColorField = backgroundColor?.fields as RecordOfFields;
  const backgroundColorValue = getFieldValue<string>(backgroundColorField, 'Value') || 'bg-transparent';

  let fallbackImageField = desktopImage;
  if (!fallbackImageField?.value?.src) {
    if (tabletImage?.value?.src) {
      fallbackImageField = tabletImage;
    } else if (mobileImage?.value?.src) {
      fallbackImageField = mobileImage;
    }
  }

  // in EE mode, images are always going to have a src value set, so we need to check the 'editable' property instead
  if (!fallbackImageField.value?.src && !sitecoreContext.pageEditing) {
    // otherwise return empty on front-end
    return null;
  }

  const showMobileSourceTag =
    props.mobileImage?.value?.src && fallbackImageField?.value?.src !== props.mobileImage?.value?.src;

  const showTabletSourceTag =
    props.tabletImage?.value?.src && fallbackImageField?.value?.src !== props.tabletImage?.value?.src;

  return (
    <div
      className={cx({
        [imageTypeValue as string]: true,
        [backgroundColorValue as string]: true,
      })}
    >
      <picture>
        {showMobileSourceTag && <source media="(max-width:767px)" srcSet={props.mobileImage.value?.src} />}
        {showTabletSourceTag && <source media="(max-width:991px)" srcSet={props.tabletImage.value?.src} />}
        <Image field={fallbackImageField} className="img-fluid" />
      </picture>
    </div>
  );
};
export default Default;
