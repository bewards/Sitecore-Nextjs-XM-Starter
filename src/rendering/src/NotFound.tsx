import StandardPageBanner from 'components/Banners/StandardPageBanner/StandardPageBanner';
import Head from 'next/head';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => (
  <>
    <Head>
      <title>404 Not Found</title>
    </Head>
    <StandardPageBanner
      key={'404banner'}
      fields={{
        bannerTitle: { value: "We're Sorry" },
        bannerTitleHeadingLevel: {
          name: 'H1',
          fields: { Value: { value: 'h1' } },
        },
        bannerBody: {
          value: "The URL may be misspelled or the page you're looking for is no longer available.<br /><br />",
        },
        bannerLinkText: { value: 'Visit the Demo Site Homepage' },
        bannerLinkDestination: {
          value: {
            href: 'https://www.demosite.com',
            text: 'Learn More',
            linktype: 'external',
            url: 'https://www.demosite.com',
            anchor: '',
            target: '_blank',
          },
        },
        bannerLinkIcon: {
          name: 'None',
          fields: { Value: { value: 'none' } },
        },
        bannerSubtitle: { value: 'The page you requested cannot be found.' },
        bannerSubtitleHeadingLevel: {
          name: 'H2',
          fields: { Value: { value: 'h2' } },
        },
        bannerSubtitleTextStyle: {
          name: '26_Coconut',
          fields: { Value: { value: 'coconut' } },
        },
        bannerTitleTextStyle: {
          name: '26_Coconut',
          fields: { Value: { value: 'coconut' } },
        },
        bannerLinkMode: {
          name: 'Primary Button',
          fields: { Value: { value: 'primary' } },
        },
        desktopImage: {
          value: {
            src: '/static-assets/404/404_error.png',
            alt: 'Medical Providers',
            width: '467',
            height: '361',
          },
        },
        mobileImage: {
          value: {
            src: '/static-assets/404/404_error_mobile.png',
            alt: 'Medical Providers',
            width: '467',
            height: '361',
          },
        },
        tabletImage: {
          value: {
            src: '/static-assets/404/404_error_mobile.png',
            alt: 'Medical Providers',
            width: '467',
            height: '361',
          },
        },
        backgroundColor: null,
        imageType: null,
      }}
      rendering={{
        componentName: 'StandardPageBanner',
        uid: '40311a62-7c5f-44c7-afb2-45e006ed7282',
        dataSource: '{FAKE-GUID}',
      }}
      params={{
        imageDirection: '{"Value":{"value":"left"}}',
        presentationMode: '{"Value":{"value":"30-70"}}',
        contentBackgroundColor: '{"Value":{"value":"bg-purple-10"}}',
      }}
    ></StandardPageBanner>
  </>
);

export default NotFound;
