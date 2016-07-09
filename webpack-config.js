/* eslint-env node */

require('dotenv').config();
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

var plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.EnvironmentPlugin([
        'NODE_ENV',
        'SHORTY_API_URL'
    ]),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/templates/app.html'),
        inject: true
    })
];
var entry = [path.resolve(__dirname, 'src/bootstrap.js')];
var jsLoader = 'babel-loader?cacheDirectory';
var cssLoader;

if (process.env.NODE_ENV == 'development') {
    plugins.push(new webpack.HotModuleReplacementPlugin()),
    cssLoader = 'style-loader!css?sourceMap&camelCase&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass?sourceMap';
    jsLoader = 'react-hot!' + jsLoader;
    entry.unshift(
        'webpack-dev-server/client?http://0.0.0.0:' + process.env.SHORTY_PORT,
        'webpack/hot/only-dev-server'
    );
} else {
    plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {drop_console: true, drop_debugger: true, warnings: false}
        }),
        new ExtractTextPlugin("bundle-[contenthash].css", {allChunks: true})
    );
    cssLoader = ExtractTextPlugin.extract('style-loader', 'css?camelCase&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass');
}

module.exports = {
    resolve: {root: path.resolve(__dirname, 'src')},
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle-[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: jsLoader
            },
            {
                test: /(\.scss$|\.css$)/,
                loader: cssLoader
            },
            {
                test: /(\.jpeg$|\.jpg$|\.gif$|\.png$|\.woff$|\.woff2$|\.ttf$|\.eot$)/,
                loader: 'url-loader',
                query: {limit: 8192}
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite?' + JSON.stringify({
                    name: '[name]-[hash]'
                })
            }
        ]
    },
    plugins: plugins,
    postcss: function() {return [autoprefixer];},
    devServer: {
        port: process.env.SHORTY_PORT,
        host: '0.0.0.0',
        contentBase: 'build',
        inline: true,
        colors: true,
        hot: true
    }
};
