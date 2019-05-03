const path = require('path')

module.exports = {
  entry: [
    '@babel/polyfill',
    './src/index',
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
    ],
  },
}
