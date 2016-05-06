var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    // entry point for your app
    app: ['webpack-hot-middleware/client', __dirname + '/../app/scripts/app.js'],
    // entry point for redux devtools
    tools: ['webpack-hot-middleware/client', __dirname + '/../app/scripts/devtools.jsx'],
    // vendors
    vendors: [
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'lodash',
      'redux',
      'history',
      'redux-thunk'
    ]
  },
  output: {
    path: __dirname + '/../dist',
    publicPath: '/',
    filename: "[name].js",
    sourceMapFilename: "[name].js.map"
  },
  stats: {
    colors: true,
    reasons: true
  },
  debug: true, // switch loaders to debug mode
  devtool: 'source-map', // important for debugging obfuscated from browser
  plugins: [
    new ExtractTextPlugin('styles.css', {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      process: {
        env: {
          BROWSER: JSON.stringify(true),
          feature: {
            DEV: JSON.stringify(true)
          }
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/../app/index.html',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {

    preLoaders: [
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json loader'
      }
    ],
    loaders: [
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$|\.html$/,
        loader: "file"
      },
      {
        test: /\.jsx$/,
        loader: 'babel',
        query: {
          env: {
            development: {
              plugins: [
                ['react-transform', {
                  transforms: [{
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module']
                  }, {
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react']
                  }]
                }]
              ]
            }
          }
        },
        exclude: [/node_modules/]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      },
      // generate css files for general styles
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader?minimize!sass-loader?outputStyle=compressed&linefeed=lfcr&indentedSyntax=false"
        ),
        include: [/app\/styles\/general/],
        exclude: [/node_modules/, /app\/core\/node_modules/]

      },
      // generate inline styles for component files
      {
        test: /\.scss$/,
        loaders: [
          "style-loader",
          "css-loader?minimize",
          "sass-loader?outputStyle=compressed&linefeed=lfcr&indentedSyntax=false"
        ],
        include: [/app\/styles\/component/],
        exclude: /node_modules/
      }
    ]
  },
  externals: {},
  resolve: {
    extensions: ['', '.js', '.jsx', 'index.js', 'index.jsx', '.json', 'index.json']
  },
  node: {},
  browser: {},
  sasslint: {
    configFile: __dirname + '/../.sass-lint.yml'
  }
};

