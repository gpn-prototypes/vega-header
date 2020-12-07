const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const ImportMapPlugin = require('webpack-import-map-plugin');
const { getAppConfig } = require('./app-config');
const dotenv = require('dotenv');

const webpack = require('webpack');

const { projectName } = getAppConfig();

const externalPackages = ['@gpn-prototypes/vega-ui', '@apollo/client', 'grapqhl'];

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'vega',
    projectName,
    webpackConfigEnv,
  });

  const envConfig = dotenv.config();

  const env = envConfig.error ? {} : envConfig.parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    // eslint-disable-next-line no-param-reassign
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  if (!process.env.BASE_API_URL) {
    throw new Error('env.BASE_API_URL is empty');
  }

  const config = webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    entry: ['./src/singleSpaEntry.tsx'],
    externals: [...externalPackages],
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'postcss-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        ...envKeys,
      }),
      new ImportMapPlugin({
        fileName: 'import-map.json',
        baseUrl: process.env.BASE_URL,
        filter(x) {
          return ['main.js'].includes(x.name);
        },
        transformKeys(filename) {
          if (filename === 'main.js') {
            return '@vega/header';
          }

          return undefined;
        },
      }),
    ],
  });

  return config;
};
