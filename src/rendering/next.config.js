const jssConfig = require('./src/temp/config');
const packageConfig = require('./package.json').config;
const { getPublicUrl } = require('@sitecore-jss/sitecore-jss-nextjs');
const plugins = require('./src/temp/next-config-plugins') || {};
const { WebpackConfigDumpPlugin } = require('webpack-config-dump-plugin'); // logs the entire webpack file

const publicUrl = getPublicUrl();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Set assetPrefix to our public URL
  assetPrefix: publicUrl,

  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  // Make the same PUBLIC_URL available as an environment variable on the client bundle
  env: {
    PUBLIC_URL: publicUrl,
  },

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en', 'es', 'es-ES'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: packageConfig.language,
  },

  // Enable React Strict Mode
  reactStrictMode: true,

  async rewrites() {
    // When in connected mode we want to proxy Sitecore paths off to Sitecore
    return [
      // API endpoints
      {
        source: '/sitecore/api/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/api/:path*`,
      },
      // media items
      {
        source: '/-/:path*',
        destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
      },
      // visitor identification
      {
        source: '/layouts/system/:path*',
        destination: `${jssConfig.sitecoreApiHost}/layouts/system/:path*`,
      },
      // healthz check
      {
        source: '/healthz',
        destination: '/api/healthz',
      },
      // rewrite for Sitecore service pages
      {
        source: '/sitecore/service/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/service/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: 'https://cm.demosite.localhost' }],
      },
    ];
  },

  productionBrowserSourceMaps: true,

  webpack: (config) => {
    // if you need to review the entire built webpack config, enable this env variable
    if (typeof process.env.WEBPACK_DUMP !== 'undefined') {
      config.plugins.push(
        new WebpackConfigDumpPlugin({
          depth: 10,
          outputPath: './',
        })
      );
    }
    return config;
  },
};

if (typeof process.env.APP_ENV === 'undefined' || process.env.APP_ENV !== 'local') {
  // copies only the necessary files for a production deployment
  nextConfig.output = 'standalone';
  // nextConfig.experimental = {
  //   turbotrace: {
  //     logLevel: 'error',
  //     logDetail: true,
  //   },
  // };
}

module.exports = () => {
  // Run the base config through any configured plugins
  return Object.values(plugins).reduce((acc, plugin) => plugin(acc), nextConfig);
};
