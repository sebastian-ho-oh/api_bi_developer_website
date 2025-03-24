const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // Setze den Kontext auf den public-Ordner:
  context: path.resolve(__dirname, 'public'),
  entry: './js/main.js',  // Da main.js in public/js liegt
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']  // Damit CSS gebündelt wird
      },
      // weitere Loader falls nötig...
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: '.', to: '.', globOptions: { ignore: ['**/index.html'] } }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    port: 3000,
    open: true,
    client: {
      overlay: false
    }
  }
};
