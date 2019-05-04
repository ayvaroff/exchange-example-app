const webpack = require('webpack')
const merge = require('webpack-merge')
const globImporter = require('node-sass-glob-importer')
const baseConfig = require('./base.config.js')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        enforce: 'pre',
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
          options: {
            importer: globImporter()
          }
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  output: {
    path: `${__dirname}/public`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './public',
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  stats: {
    errorDetails: true
  }
})
