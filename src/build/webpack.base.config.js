const path = require('path');
const os = require('os');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const manifest = require('./dll/vendor-manifest.json');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

let resolve = (dir) => (path.join(__dirname, dir));

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.js[x]?$/,
				include: [resolve('src')],
				exclude: /node_modules/,
				loader: 'happypack/loader?id=happybabel'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader?minimize', 'autoprefixer-loader'],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.less$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
					fallback: 'style-loader'
				})),
			},
			{
				test: /\.scss$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, 'autoprefixer-loader', 'sass-loader'],
					fallback: 'style-loader'
				})),
			},
			{
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader?limit=1024'
			},
			{
				test: /\.(html|tpl)$/,
				loader: 'html-loader'
			}
		]
	},
	plugins: [
		new HappyPack({
			id: 'happybabel',
			loaders: ['babel-loader'],
			threadPool: happyThreadPool,
			verbose: true
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest,
		})
	],
	resolve: {
		extensions: ['.js'],
		alias: {
			'@': resolve('../client/src')
		}
	}
};
