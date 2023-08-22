import { SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs';

const BuildOnceSites: SiteInfo[] = [
  { name: 'demosite_preview', hostName: '#{PREVIEW_URL_HOST}#', language: 'en' },
  { name: 'demosite', hostName: '#{PUBLIC_URL_HOST}#', language: 'en' },
];

export default BuildOnceSites;
