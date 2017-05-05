const path = require('path');

const config = {
  entry: './main.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ],
  }
};

module.exports = config;
