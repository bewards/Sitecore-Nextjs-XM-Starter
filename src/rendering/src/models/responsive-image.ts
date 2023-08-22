import { ImageField, Item } from '@sitecore-jss/sitecore-jss-nextjs';

export type ResponsiveImageFields = {
  mobileImage: ImageField;
  tabletImage: ImageField;
  desktopImage: ImageField;
  imageType: Item | null;
  backgroundColor: Item | null;
};
