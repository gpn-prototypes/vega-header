const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const ImportMapPlugin = require('webpack-import-map-plugin');
const { getAppConfig } = require('./app-config');

const { projectName } = getAppConfig();

const SHELL_PORT = process.env.PORT || 9000;
const SHELL_URL = process.env.BASE_URL || `http://localhost:${SHELL_PORT}`;

function withTrailingSlash(path) {
  if (path.endsWith('/')) {
    return path;
  }

  return `${path}/`;
}

const synonyms = {
  'apollo-client': '@apollo/client',
};

const externalPackages = ['@apollo/client'];

const URL = withTrailingSlash(SHELL_URL);

const webpackExternals = Object.fromEntries(
  externalPackages.map((package) => {
    const packageName = Object.keys(synonyms).includes(package) ? synonyms[package] : package;
    return [packageName, `${URL}${package}.js`];
  }),
);

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'vega',
    projectName,
    webpackConfigEnv,
  });

  console.log(defaultConfig.externals)

  const config = webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    entry: ['./src/singleSpaEntry.tsx'],
    externals: [...externalPackages],
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
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

  console.log(config.externals);

  return config;
};
