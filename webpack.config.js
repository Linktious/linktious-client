const path = require('path')
const {globalVars, isDevelopment} = require('./globalVars')
const webpack = require('webpack')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const {WebpackManifestPlugin} = require('webpack-manifest-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')


const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
const port = process.env.PORT ?? 3000
const publicPath = '/'

const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'build')
const backendProxyURL = process.env.BACKEND_URL ?? 'http://localhost:8000/'


module.exports = {
  devtool: isDevelopment && 'cheap-module-source-map',
  entry: [path.resolve(src, 'index.tsx')],
  mode: isDevelopment ? 'development' : 'production',
  target: 'web',
  watchOptions: {
    ignored: /node_modules/,
  },
  output: {
    library: 'linktious',
    filename: isDevelopment ? 'bundle.js' : '[name].[hash:8].js',
    chunkFilename: isDevelopment ? '[name].chunk.js' : '[name].[hash:8].chunk.js',
    path: dist,
    publicPath: publicPath,
  },
  plugins: [
    new webpack.DefinePlugin(globalVars),
    new WebpackPwaManifest({
      name: 'Linktious',
      short_name: 'Linktious',
      description: 'Linktious application',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(src, 'index.html'),
      // favicon: path.resolve(src, 'favicon.ico'),
    }),
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: publicPath,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    !isDevelopment &&
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/],
      navigateFallback: '/index.html',
      navigateFallbackDenylist: [
        // Exclude URLs starting with /_, as they're likely an API call
        new RegExp('^/_'),
        // Exclude URLs containing a dot, as they're likely a resource in
        // public/ and not a SPA route
        new RegExp('/[^/]+\\.[^/]+$'),
      ],
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '~': src,
    },
  },
  devServer: {
    contentBase: dist,
    port: port,
    host: '0.0.0.0',
    publicPath: publicPath,
    hot: true,
    historyApiFallback: true, // for SPA
    proxy: {
      '/api': {target: backendProxyURL, pathRewrite: {'^/api': ''}},
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?/,
        exclude: /node_modules/,
        include: src,
        loader: require.resolve('babel-loader'),
        options: {
          plugins: [
            isDevelopment && ['react-refresh/babel', {skipEnvCheck: true}],
          ].filter(Boolean),
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: './static/img/',
              publicPath: '/static/img/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './static/font/',
          publicPath: '/static/font/',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  optimization: {
    minimize: !isDevelopment,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: shouldUseSourceMap,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: shouldUseSourceMap ?
            {
              inline: false,
              annotation: true,
            } :
            false,
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      name: false,
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
  },
}
