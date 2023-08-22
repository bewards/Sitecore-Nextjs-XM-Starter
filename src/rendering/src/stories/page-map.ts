/********************************************************************
 *
 * * Sitecore Pages that will get their own Story page and layout data
 *
 ********************************************************************/

const pageMap: PageMap = {
  Pages: [
    {
      Name: 'Home',
      Url: '/',
    },
    {
      Name: 'Styleguide',
      Url: '/dev/styleguide',
    },
    {
      Name: 'ComponentPatterns',
      Url: '/dev/component-patterns',
    },
    {
      Name: 'Container3070',
      Url: 'F7AF113E-008F-47E7-8923-AFC65EE1AB7D',
    },
    {
      Name: 'Container5050',
      Url: '/dev/container-50-50',
    },
    {
      Name: 'Container70',
      Url: '/dev/container-70',
    },
    {
      Name: 'RichTextFull',
      Url: '/dev/rich-text-full',
    },
    {
      Name: 'StandardPageBanner',
      Url: '/dev/standard-page-banner',
    },
    {
      Name: 'ThreeColumnToutListing',
      Url: '/dev/three-column-tout-listing',
    },
    {
      Name: 'HorizontalDivider',
      Url: '/dev/horizontal-divider',
    },
    {
      Name: 'ImageTextCallout',
      Url: '/dev/image-text-callout',
    },
    {
      Name: 'Accordion',
      Url: '/dev/accordion',
    },
    {
      Name: 'AlertBanner',
      Url: '/dev/alert-banner-with-multiple-alerts',
    },
    {
      Name: 'FAQ',
      Url: '/dev/faq',
    },
    {
      Name: 'LinkListing',
      Url: '/dev/link-listing',
    },
    {
      Name: 'StackedIconCallout',
      Url: '/dev/stacked-icon-callout',
    },
  ],
};

export default pageMap;
export const defaultPageMap = pageMap.Pages[0];

type PageMap = {
  Pages: Page[];
};

type Page = {
  Name: string;
  Url: string;
};
