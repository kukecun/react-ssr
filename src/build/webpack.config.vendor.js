const webpack = require('webpack');
const path = require('path');

module.exports = {

  entry: {
    'vendor': [
      'react',
      'react-dom',
      'react-router-dom',
      'react-router-redux',
      'react-redux',
      'redux',
      'redux-thunk',
      'prop-types',
      'system.global',
      'weixin-js-sdk',
      'js-cookie',
      'qs',
      'axios',
    ],
  },

  output: {
    path: path.resolve(__dirname, '../client/lib'),
    filename: '[name].js',
    library: '[name]_library',
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname,
    }),
  ]
};
