const path = require('path');
const webpack = require('webpack');

const PATHS = {
  app: path.resolve(__dirname, 'app'),
  out: path.resolve(__dirname, 'public')
};

module.exports = {
  entry: PATHS.app,
  output: {
    path: PATHS.out,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['react', 'es2015']
      },
      include: PATHS.app
    }]
  },
  devtool: '#cheap-module-source-map',
  devServer: {
    contentBase: PATHS.out
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
