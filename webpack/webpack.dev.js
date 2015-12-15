var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        // entry point for your app
        app: ['webpack-hot-middleware/client', __dirname + '/../app/scripts/app.js'],
        // entry point for redux devtools
        tools: ['webpack-hot-middleware/client', __dirname + '/../app/scripts/devtools.js'],
        // vendors
        vendors: [
            'react',
            'react-dom',
            'react-router'
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
    devtool: 'eval-source-map', // important for debugging obfuscated from browser
    plugins: [
      new ExtractTextPlugin('styles.css', {
        allChunks: true
      }),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || true)),
            'process.env': {
                BROWSER: JSON.stringify(true)
            }
      }),
      new HtmlWebpackPlugin({
        template: __dirname + '/../app/index.html',
        filename: 'index.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
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
                  loaders: ['react-hot', 'babel?stage=1'],
                  exclude: [/node_modules/,/app\/core\/node_modules/]
              },
              {
                  test: /\.js$/,
                  loaders: ["react-hot", 'babel-loader'],
                  exclude: [/node_modules/,/app\/core\/node_modules/]
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
                  include: [/app\/styles\/component/]
              },
              // lint all sass
              {
                  test: /\.scss$/,
                  loader: "sasslint"
              },
              {
                  test: /\.js$|\.jsx$/,
                  loader: "eslint",
                  exclude: [/node_modules/,/app\/core\/node_modules/]
              }
        ]
    },
    externals: {},
    resolve: {
        extensions: ['', '.js', '.jsx', 'index.js', 'index.jsx', '.json', 'index.json']
    },
    node: {},
    browser: {},
    eslint: {
        configFile: __dirname + '/../.eslintrc'
    },
    sasslint: {
        configFile: __dirname + '/../.sass-lint.yml'
    }
};
