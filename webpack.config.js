var path = require('path');

var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

// CSS浏览器前缀问题
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
	context : __dirname + '/src',
	entry : {
		build : __dirname + '/src/main',
		vendor : __dirname + '/src/vendor',
		bootstrap : __dirname + '/src/bootstrap'
	},
	output : {
		path : path.resolve(__dirname, './dist'),
		publicPath : '/dist/',
		filename : '[name].js'
	},
	resolveLoader : {
		root : path.join(__dirname, 'node_modules')
	},
	resolve : {
		root : path.join(__dirname, 'node_modules'),
		extensions : [ '', '.js' ],
		alias : {}
	},
	plugins : [
	// 全局依赖jQuery
	new webpack.ProvidePlugin({
		$ : "jquery",
		jQuery : "jquery",
		"window.jQuery" : "jquery"
	}),
	// 提取依赖的jQuery通用插件
	new CommonsChunkPlugin({
		name : "vendor",
		minChunks : Infinity
	}),
	// 提取CSS文件
	new ExtractTextPlugin("[name].css"),
	// 查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
	new webpack.optimize.DedupePlugin() ],
	module : {
		loaders : [
				{
					test : /\.vue$/,
					loader : 'vue'
				},
				{
					test : /\.js$/,
					loader : 'babel',
					query : {
						compact : false
					},
					exclude : /node_modules/
				},
				{
					test : /\.json$/,
					loader : 'json'
				},
				{
					test : /\.(png|jpg|gif)$/,
					loader : 'url',
					query : {
						limit : 10000,
						// CSS图片目录
						name : '[path][name]_[hash].[ext]'
					}
				},
				{
					test : /\.less$/,
					loader : ExtractTextPlugin.extract("style-loader",
							"css-loader!postcss-loader")
				},
				{
					test : /\.css$/,
					loader : 'style!css',
					loader : ExtractTextPlugin.extract("style-loader",
							"css-loader!postcss-loader")
				}, {// bootstrap font-awesome
					test : /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
					loader : 'url',
					query : {
						limit : 10000,
						mimetype : 'application/font-woff',
						// 字体文件放置目录
						name : 'font/[name]_[hash].[ext]'
					}
				}, {// bootstrap
					test : /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
					loader : 'url',
					query : {
						limit : 10000,
						mimetype : 'application/octet-stream',
						// 字体文件放置目录
						name : 'font/[name]_[hash].[ext]'
					}
				}, {// bootstrap
					test : /\.eot(\?v=\d+\.\d+\.\d+)?$/,
					loader : 'file',
					query : {
						limit : 10000,
						// 字体文件放置目录
						name : 'font/[name]_[hash].[ext]'
					}
				}, {// bootstrap
					test : /\.svg(\?v=\d+\.\d+\.\d+)?$/,
					loader : 'url',
					query : {
						limit : 10000,
						mimetype : 'application/image/svg+xml',
						// 字体文件放置目录
						name : 'font/[name]_[hash].[ext]'
					}
				}, {// font-awesome
					test : /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader : "file",
					query : {
						limit : 10000,
						// 字体文件放置目录
						name : 'font/[name]_[hash].[ext]'
					}
				}, {// 如果要加载jQuery插件,解析路径&参数
					test : "/lib/jquery/**/*.js$",
					loader : "'imports?jQuery=jquery,$=jquery,this=>window"
				} ]
	},
	postcss : function() {
		return [ autoprefixer({
			browsers : [ 'not ie <= 8' ]
		}), precss ];
	},
	vue : {// 提取CSS
		loaders : {
			// 这个地方就不需要加POST CSS了
			css : ExtractTextPlugin.extract("css"),
			// 这个地方就不需要加POST CSS了
			less : ExtractTextPlugin.extract("css!less")
		// sass?
		}
	},
	devServer : {
		historyApiFallback : true,
		noInfo : true,
		// 其实很简单的，只要配置这个参数就可以了
		proxy : {
			'/v1/*' : {
				target : 'http://localhost:3000/',
				secure : false
			}
		}
	},
	devtool : 'eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = 'source-map'
	// http://vuejs.github.io/vue-loader/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
			new webpack.DefinePlugin({
				'process.env' : {
					NODE_ENV : '"production"'
				}
			}), new webpack.optimize.UglifyJsPlugin({
				compress : {
					warnings : false
				}
			}), new webpack.optimize.OccurenceOrderPlugin() ])
}