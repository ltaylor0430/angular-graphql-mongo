const webpack = require('webpack');
const helpers = require('./helpers');
const path = require('path');
const fs = require('fs');
const WebpackShellPlugin = require('webpack-shell-plugin');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './src/server/index.ts',
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js']
  },
  resolveLoader: {
    modules: [helpers.root('node_modules')]
  },

  devtool: 'sourcemap',
  output: {
    path: helpers.root('build'),
    filename: 'backend.js'
  },
  externals: [
    nodeModules
  ],
  module: {

    rules: [
      {
        test: /\.ts$/,
        use: [
        {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: 'tsconfig.webpack.json'
          }
        }
       ]
      }
    ]
  },
  plugins: [
    new WebpackShellPlugin({ onBuildStart: ['echo "Webpack Start"'], onBuildEnd: ['echo "Starting Node Server" && nodemon build/backend.js --watch build"'] }),
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin(
      {
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false
      }),
    new webpack.HotModuleReplacementPlugin({ quiet: true })
  ],

}
