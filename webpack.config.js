const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV === 'production' ? false : true;

module.exports = {
	mode: dev ? 'development' : 'production',
	devtool: dev ? 'source-map' : false,
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	devServer: {
		contentBase: './dist',
	},
	module: {
		rules: [
			{test: /\.vue$/, loader: 'vue-loader'},
			{test: /\.s[ac]ss/, use: ['style-loader', 'css-loader', 'sass-loader']},
		],
	},
	plugins: [
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
