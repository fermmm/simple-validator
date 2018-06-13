const webpack = require('webpack');
const { resolve } = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const sourcePath = 'tests/sandbox';
const buildPath = 'dist/sandbox';
const serverPort = 9000;

"use strict";
module.exports = {
    context: resolve(__dirname, sourcePath),
    entry: [
        // bundle the client for webpack-dev-server and connect to the provided endpoint
        'webpack-dev-server/client?http://localhost:' + serverPort,
        // bundle the client for hot reloading only - means to only hot reload for successful updates
        'webpack/hot/only-dev-server',
        // the entry point of our app
        './index.ts'
    ],
    output: {
        // the output bundle
        filename: 'index.js',
        path: resolve(__dirname, buildPath),
        // necessary for HMR to know where to load the hot update chunks
        publicPath: '/'
    },
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        // Change it if other port needs to be used
        port: serverPort,
        // enable HMR on the server
        hot: true,
        noInfo: true,
        // minimize the output to terminal.
        quiet: false,
        // match the output path
        contentBase: resolve(__dirname, sourcePath),
        // match the output `publicPath`
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                loader: 'file-loader',
                query: {
                    outputPath: './img/',
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(eot|ttf|otf|woff|woff2|json|xml)$/,
                loader: 'file-loader',
                query: {
                    outputPath: './fonts/',
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(json|xml)$/,
                loader: 'file-loader',
                query: {
                    outputPath: './data/',
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(s*)css$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(csv|tsv)$/,
                use: [{ loader: 'csv-loader' }]
            },
            {
                test: /\.exec\.js$/,
                use: [{ loader: 'script-loader' }]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new WebpackNotifierPlugin({ excludeWarnings: true }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:' + serverPort })
    ]
};