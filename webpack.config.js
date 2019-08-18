const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
  let hotPlugin;
  let styleLoader;
  let cssExtractPlugin;
  let isSourceMap;

  switch (env.mode) {
    case 'production':
      cssExtractPlugin = new MiniCssExtractPlugin({
        filename: 'main.css',
      });
      styleLoader = { loader: MiniCssExtractPlugin.loader };
      isSourceMap = false;
      break;

    default:
      styleLoader = { loader: 'style-loader' };
      isSourceMap = 'inline-source-map';
      hotPlugin = new webpack.HotModuleReplacementPlugin();
  }

  const config = {
    mode: env.mode,
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    devtool: isSourceMap,

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.scss/,
          use: [
            styleLoader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                localsConvention: 'camelCase',
                modules: {
                  localIdentName: '[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]',
              },
            },
          ],
        },
      ],
    },

    devServer: {
      compress: true,
      open: true,
      port: 6289,
      historyApiFallback: true,
      hot: true,
      progress: true,
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
      new CleanWebpackPlugin(),
    ],

    resolve: {
      alias: {
        Components: resolve(__dirname, 'src/components/'),
        Containers: resolve(__dirname, 'src/containers/'),
        'react-dom': '@hot-loader/react-dom',
      },
    },
  };

  if (env.mode === 'production') {
    config.plugins.push(cssExtractPlugin);
  } else {
    config.plugins.push(hotPlugin);
  }

  return config;
};
