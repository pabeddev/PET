
// craco.config.js
const webpack = require('webpack');

module.exports = {
  webpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.REACT_APP_MAPBOX_TOKEN': JSON.stringify(process.env.REACT_APP_MAPBOX_TOKEN),
      }),
    ],
  },
};
