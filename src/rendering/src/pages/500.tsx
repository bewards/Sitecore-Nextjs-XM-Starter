import Head from 'next/head';
import { GraphQLErrorPagesService, SitecoreContext, ErrorPages } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import Layout from 'src/Layout';
import { componentFactory } from 'temp/componentFactory';
import { GetStaticProps } from 'next';
import config from 'temp/config';
import { siteResolver } from 'lib/site-resolver';

/**
 * Rendered in case if we have 500 error and cannot fetch SXA generated page content
 */
const ServerError = (): JSX.Element => (
  <>
    <Head>
      <title>Server Error</title>
      <style>
        {`
          body {
            font-family: 'Gotham', Arial, Helvetica, sans-serif;
                  color: #232526;
          }

              .logo {
                  text-align: center;
                  padding: 74px 0 48px 0;
              }

                  .logo img {
                      height: 25px;
                  }

              .callout {
                  display: flex;
                  flex-direction: column;
                  margin: 0 16px;
                  background-color: #FFF7F5;
                  padding: 0 24px;
                  border-bottom: 4px solid #DD2E0B;
                  gap: 30px;
              }

                  .callout img {
                      filter: invert(18%) sepia(74%) saturate(7497%) hue-rotate(18deg) brightness(103%) contrast(91%);
                      height: 48px;
                      width: 48px;
                      margin: auto;
                      padding-top: 30px;
                  }

              h1, h2, h3, h4, h5, h6 {
                  font-weight: bold;
                  font-size: 20px;
                  line-height: 28px;
                  margin: 0;
              }

              p {
                  font-size: 16px;
                  line-height: 24px;
                  margin: 0;
                  padding: 8px 0 24px 0;
              }

              @media only screen and (max-width: 992px) and (min-width: 481px) {
                  .callout {
                      flex-direction: row;
                      margin: 0 30px;
                      padding: 0 32px;
                      gap: 32px;
                  }

                      .callout img {
                          padding-top: 0;
                      }

                  .text_area {
                      padding: 48px 0;
                  }

                  p {
                      padding-bottom: 0
                  }
              }

              @media only screen and (min-width: 991px) {
                  .callout {
                      flex-direction: row;
                      margin: 0 auto;
                      padding: 0 32px;
                      gap: 32px;
                      width: 800px;
                  }

                      .callout img {
                          padding-top: 0;
                      }

                  .text_area {
                      padding: 48px 0;
                  }

                  p {
                      padding-bottom: 0
                  }
              }
        `}
      </style>
    </Head>
    <div className="logo">
      <img src="/sc_logo.svg" alt="demosite" />
    </div>
    <div className="callout">
      <img src="/static-assets/svg-icons/error.svg" alt="Error" />
      <div className="text_area">
        <h3>500 - Internal Service Error</h3>
        <p>
          The server encountered an internal error or misconfiguration and was unable to complete your request. We are
          working to resolve this issue.
        </p>
      </div>
    </div>
  </>
);

const Custom500 = (props: SitecorePageProps): JSX.Element => {
  if (!(props && props.layoutData)) {
    return <ServerError />;
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
    language: context.locale || context.defaultLocale || config.defaultLanguage,
  });
  let resultErrorPages: ErrorPages | null = null;

  // do not fetch error pages during BUILD
  if (!process.env.DISABLE_SSG_FETCH) {
    try {
      resultErrorPages = await errorPagesService.fetchErrorPages();
    } catch (error) {
      console.log('Error occurred while fetching error pages');
      console.log(error);
    }
  }

  return {
    props: {
      layoutData: resultErrorPages?.serverErrorPage?.rendered || null,
    },
    // revalidate: 120, // 120 seconds
  };
};

export default Custom500;
