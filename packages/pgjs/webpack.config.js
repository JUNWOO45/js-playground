const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  let config = {
    entry: ['./src/index.js'],
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        '@src': path.resolve(__dirname, 'src/'),
      },
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  };

  if (argv.mode === 'development') {
    config = {
      ...config,
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title: 'Development',
          showErrors: true,
        }),
      ],
      devServer: {
        open: 'Google Chrome',
        host: '0.0.0.0',
        overlay: {
          warnings: false,
          errors: false,
        },
      },
      devtool: 'eval-cheap-module-source-map',
    };
  }

  return config;
};
