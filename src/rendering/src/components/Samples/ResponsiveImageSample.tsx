import { ComponentProps } from 'lib/component-props';
import type { ResponsiveImageFields } from 'src/models/responsive-image';
import ResponsiveImages from 'components/helpers/ResponsiveImages/ResponsiveImages';
import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

type ResponsiveImageSampleProps = ComponentProps & {
  // inheriting from ResponsiveImageFields type (just like in Sitecore)
  fields: ResponsiveImageFields & {
    testTextField: Field<string>;
  };
};

const ResponsiveImageSample = (props: ResponsiveImageSampleProps): JSX.Element => {
  const { desktopImage, tabletImage, mobileImage, imageType, backgroundColor } = props.fields;
  return (
    <div className="responsiveImageSample">
      <Text field={props.fields.testTextField} />
      <ResponsiveImages
        desktopImage={desktopImage}
        tabletImage={tabletImage}
        mobileImage={mobileImage}
        imageType={imageType}
        backgroundColor={backgroundColor}
      />
    </div>
  );
};

export default ResponsiveImageSample;
