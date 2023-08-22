import chalk from 'chalk';
import { ConfigPlugin, JssConfig } from '..';
import { GraphQLSiteInfoService, SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs';
import BuildOnceSites from 'scripts/multisite/build-once-sites';

/**
 * This plugin will set the "sites" config prop.
 * By default this will attempt to fetch site information directly from Sitecore (using the GraphQLSiteInfoService).
 * You could easily modify this to fetch from another source such as a static JSON file instead.
 */
class MultisitePlugin implements ConfigPlugin {
  order = 3;

  async exec(config: JssConfig) {
    let sites: SiteInfo[] = [];

    const endpoint = `${config.sitecoreApiHost}${config.graphQLEndpointPath}`; // UPDATED: this needs to use the Sitecore API host over config.graphQLEndpoint for Locals
    const apiKey = config.sitecoreApiKey;

    console.log('MultisitePlugin exec config value:');
    console.log(config);

    if (!endpoint || !apiKey) {
      console.warn(chalk.yellow('Skipping site information fetch (missing GraphQL endpoint or API key).'));
    } else if (config.buildOnceSites) {
      sites = BuildOnceSites;
    } else {
      console.log(`Fetching site information from ${endpoint}`);
      try {
        const siteInfoService = new GraphQLSiteInfoService({
          endpoint,
          apiKey,
        });
        sites = await siteInfoService.fetchSiteInfo();
      } catch (error) {
        console.error(chalk.red('Error fetching site information'));
        console.error(error);
      }
    }

    return Object.assign({}, config, {
      sites: JSON.stringify(sites),
    });
  }
}

export const multisitePlugin = new MultisitePlugin();
