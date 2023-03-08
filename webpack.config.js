const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssWebpackPlugin = require('mini-css-extract-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  mode: 'production',
  devServer: {
    port: 3000,
    hot: true
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssWebpackPlugin({
      filename: 'bundle.css'
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssWebpackPlugin.loader,
          options: {
            hmr: true,
            reloadAll: true
          }
        }, 'css-loader']
      }
    ]
  }
}