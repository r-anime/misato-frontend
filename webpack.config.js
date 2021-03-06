const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV === 'production' ? false : true;

const runtimeConfig = dev ? require('./config') : require('./config.prod');

module.exports = {
	mode: dev ? 'development' : 'production',
	devtool: dev ? 'source-map' : false,
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
		clean: !dev,
	},
	devServer: {
		contentBase: './dist',
		historyApiFallback: true,
	},
	module: {
		rules: [
			{test: /\.vue$/, loader: 'vue-loader'},
			{test: /\.s[ac]ss/, use: ['style-loader', 'css-loader', 'sass-loader']},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			__RUNTIME_CONFIG__: JSON.stringify(runtimeConfig),
		}),
		new VueLoaderPlugin(),
		// Create HTML base
		new HtmlWebpackPlugin({
			template: './template.html',
			filename: 'index.html',
			title: 'test',
		}),
	],
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
		},
		extensions: ['*', '.js', '.vue', '.json'],
	},
};
