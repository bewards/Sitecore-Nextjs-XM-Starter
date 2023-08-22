/**
 * @param {import('next').NextConfig} nextConfig
 */
const svgrPlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/,
          issuer: /\.[jt]sx?$/,
          // resourceQuery: /react/,
          resourceQuery: { not: /url/ }, // exclude if *.svg?url
          use: ['@svgr/webpack'],
        }
      );

      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i;
      // fileLoaderRule.test = /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$/i;

      if (typeof process.env.WEBPACK_DUMP !== 'undefined') {
        console.log(config.module.rules);
      }

      // Overload the Webpack config if it was already overloaded
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

module.exports = svgrPlugin;
