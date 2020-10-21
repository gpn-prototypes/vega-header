// ref https://github.com/gpn-prototypes/vega-auth/commit/c0e41589049d99cd63e6616bae937a13aea014f0
const nested = require('postcss-nested');

module.exports = {
  plugins: [nested()],
};
