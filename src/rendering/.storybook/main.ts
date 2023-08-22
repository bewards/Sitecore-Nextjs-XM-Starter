import * as path from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import SassAlias from 'sass-alias';

import type { StorybookConfig } from '@storybook/nextjs';
import type { RuleSetRule } from 'webpack/types';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/!(_template)/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-breakpoints',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    const fileLoaderRule = config.module?.rules?.find((rule: any) => rule.test?.test?.('.svg')) as RuleSetRule;

    if (config.resolve?.plugins !== undefined) {
      // typescript path mapping plugin to resolve tsconfig.paths
      config.resolve.plugins = [
        ...(config.resolve?.plugins || []),
        new TsconfigPathsPlugin({
          logLevel: 'WARN',
          extensions: config.resolve?.extensions,
        }),
      ];
    }

    if (config.module?.rules !== undefined) {
      // sass-alias
      config.module.rules.push({
        test: /^.*\.(sass|scss)$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: new SassAlias({
                  '@sass': path.join(__dirname, '../src/assets', 'sass'),
                  '@fontawesome': path.join(__dirname, '../node_modules', 'font-awesome'),
                }).getImporter(),
              },
            },
          },
        ],
      });

      // ability to load in graphql files
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      });
      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        {
          test: /\.svg$/,
          issuer: /\.[jt]sx?$/,
          resourceQuery: {
            not: /url/,
          },
          use: ['@svgr/webpack'],
        }
      );
    }

    fileLoaderRule.exclude = /\.svg$/i;

    // Return the altered config
    return config;
  },
  env: (config) => ({
    ...config,
    PUBLIC_URL: 'http://localhost:6006',
  }),
  docs: {
    autodocs: true,
  },
};

export default config;

