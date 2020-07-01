'use strict'

const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
      main: path.resolve(__dirname, 'src/index.tsx'),
      vendor: ['react', 'react-dom']
    },
    output: {
      path: path.resolve(__dirname, 'build')
    },
    target: 'web',
    mode: 'development',
    devServer: {
      contentBase: path.resolve(__dirname, 'src'),
      watchContentBase: true,
      compress: true,
      port: 3000,
      hot: true
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {loader: 'html-loader'}
        },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'ts-loader']
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        },
        {
          test: /\.js(x?)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'style-loader',
              options: { hmr: true }
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie <9'],
                    flexbox: 'no-2009'
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, 'src/scss')]
              }
            }
          ]
        },
        {
          test: /\.(jpg|png|gif|otf)$/,
          use: 'file-loader?name=assets/[name].[ext]'
        },
        {
          test: /\.svg$/,
          use: 'url-loader'
        },
        {
          test: /\.glsl$/,
          loader: 'webpack-glsl-loader'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['build']),
      new webpack.HotModuleReplacementPlugin(),
      new htmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    devtool: 'inline-source-map',
    optimization: {
      namedModules: true,
      splitChunks: {
        chunks: 'async'
      }
    },
    performance: {
      hints: false
   }
}