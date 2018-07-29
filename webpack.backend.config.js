const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    put_dbrecord_lambda: './backend/src/put_dbrecord_lambda.js',
    list_dbrecord_lambda: './backend/src/list_dbrecord_lambda.js',
    delete_dbrecord_lambda: './backend/src/delete_dbrecord_lambda.js'
  },
  externals: [
    'aws-sdk'
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/backend/js'),
    library: "[name]",
    libraryTarget: "umd"
  },
  target: 'node'
};
