import config from 'temp/config';
import {
  GraphQLErrorPagesService,
  SitecoreContext,
  ErrorPages,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
// import NotFound from 'src/NotFound';
import { componentFactory } from 'temp/componentFactory';
import Layout from 'src/Layout';
import { GetStaticProps } from 'next';
import { siteResolver } from 'lib/site-resolver';
import * as staticData from 'src/static-layout-data/404-not-found.json';

const Custom404 = (props: SitecorePageProps): JSX.Element => {
  if (!(props && props.layoutData)) {
    return (
      <SitecoreContext componentFactory={componentFactory}>
        {/* NOTE: switched to using static layout data instead of manual react components */}
        {/* <main id="main" className="error-page">
          <NotFound />
        </main> */}
        <Layout layoutData={staticData as unknown as LayoutServiceData} />
      </SitecoreContext>
    );
  }

  return (
    <SitecoreContext componentFactory={componentFactory} layoutData={props.layoutData}>
      <Layout layoutData={props.layoutData} />
    </SitecoreContext>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const site = siteResolver.getByName(config.jssAppName);
  const errorPagesService = new GraphQLErrorPagesService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: site.name,
    language: context.locale || config.defaultLanguage,
  });
  let resultErrorPages: ErrorPages | null = null;

  // do not fetch error pages during BUILD
  if (!process.env.DISABLE_SSG_FETCH_DURING_BUILD) {
    try {
      resultErrorPages = await errorPagesService.fetchErrorPages();
    } catch (error) {
      console.log('Error occurred while fetching error pages');
      console.log(error);
    }
  }

  return {
    props: {
      layoutData: resultErrorPages?.notFoundPage?.rendered || null,
    },
    revalidate: 120, // 120 seconds
  };
};

export default Custom404;
