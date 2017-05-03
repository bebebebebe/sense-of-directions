const path = require('path');

const config = {
  entry: './main.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};

module.exports = config;
