const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          minimize: false,
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext][query]',
        },
      },
      {
        test: /\.(mp3|wav)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/sounds/',
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        include: path.resolve(__dirname, 'src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: false,
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html'),
      filename: 'index.html',
      minify: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new ESLintPlugin(),
  ],
  devServer: {
    open: true,
    port: 3000,
    static: path.join(__dirname, 'dist'),
    watchFiles: ['src/**/*.html', 'src/**/*.js', 'src/**/*.scss'],
  },
};
