const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const path = require('path');

const config = require("./config");

module.exports = merge(webpackBaseConfig, {
  entry: config.entry(),
	output: {
		publicPath: '/dist/prod/',
		path: path.resolve(__dirname, '../client/dist/prod'),
		filename: '[name].js',
		chunkFilename: '[name].chunk.js'
	},
	plugins: [
		new cleanWebpackPlugin(['client/dist/prod/*'], {
			root: __dirname, //根目录
			verbose: false, //开启在控制台输出信息
			dry: true //启用删除文件
		}),
		new ExtractTextPlugin({
				filename: '[name].css',
				allChunks: true
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
	]
});
