import { constantCase } from 'constant-case';
import { LayoutServiceData, RestLayoutService } from '@sitecore-jss/sitecore-jss-nextjs';
import { dictionaryServiceFactory } from 'lib/dictionary-service-factory';
import config from '../src/temp/config';

export const layoutService = new RestLayoutService({
  apiHost: process.env[`${constantCase('sitecoreApiHost')}`] || config.sitecoreApiHost,
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
  configurationName: 'default',
});

export const dictionaryService = dictionaryServiceFactory.create(config.jssAppName);

export const getLayoutData = (path: string): Promise<LayoutServiceData> => {
  return layoutService.fetchLayoutData(path || '/');
};

export const getLayoutDataFromJson = (pageName = 'Home'): Promise<LayoutServiceData | null> => {
  // find page-data to return
  return import(`../src/stories/${pageName}/page-data.json`);
};
