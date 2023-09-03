const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      editor: './src/js/editor.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // HTML Webpack Plugin for generating HTML files
      new HtmlWebpackPlugin({
      template: './index.html', // Corrected the path to your HTML template
        title: 'texEditor'
      }),

      // Webpack PWA Manifest Plugin for generating a manifest file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'text editor',
        short_name: 'JATE',
        description: 'edit!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve(__dirname, 'src/images/logo.png'), // Corrected the path to your icon
            sizes: [96, 128, 192, 256, 384, 512],
            destination: 'assets/icons', // Updated the destination path
          },
        ],
      }),

      // InjectManifest for service worker
      new InjectManifest({
        swSrc: './src-sw.js', 
        swDest: 'src-sw.js', 
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
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
      ],
    },
  };
};
