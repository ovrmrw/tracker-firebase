const webpack = require('webpack');

module.exports = {
  entry: {
    beacon: './beacon/src/index.ts',
  },
  output: {
    path: process.cwd() + '/public/static/js',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader",
        options: {
          configFileName: './beacon/tsconfig.json'
        },
      },
    ],
  },
  // devtool: 'source-map',
}
