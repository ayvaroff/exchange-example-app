const merge = require('webpack-merge')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const globImporter = require('node-sass-glob-importer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./base.config.js')

const folderName = 'docs'

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name].bundle.[hash].js',
    path: path.resolve(__dirname, `../${folderName}`),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                indentType: 'spaces',
                indentWidth: 1,
                includePaths: [
                  path.join(__dirname, 'node_modules'),
                ],
                importer: globImporter(),
              },
            }
          ]
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'assets/images/',
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'assets/fonts/',
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: 'style.[hash].css',
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, `../${folderName}/index.html`),
      template: path.resolve(__dirname, '../public/prod.html'),
    }),
  ],
})
