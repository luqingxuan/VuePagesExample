const webpack = require('webpack');

const extend = require('extend');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

// API服务器
const productionApiServer = ''

const defaults = require('./webpack.common.config.js');
const config = extend(true, {}, defaults);

config.module = config.module || {};
config.module.loaders = config.module.loaders || [];

// vue loader
config.module.loaders.unshift({
    test: /\.vue$/,
    loader: 'vue'
});

// extract css
config.vue = {
    loaders: {
        js: 'es3ify!babel?presets[]=es2015,presets[]=stage-2,plugins[]=transform-runtime',
        css: ExtractTextPlugin.extract('css!postcss'),
        less: ExtractTextPlugin.extract('css!postcss!less'),
        scss: ExtractTextPlugin.extract('css!postcss!scss')
    }
};

config.plugins = config.plugins || [];

// vue global
config.plugins.unshift(
    new webpack.ProvidePlugin({
        Vue: 'vue'
    })
);

// inject env
config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production'),
            'API_SERVER': JSON.stringify(productionApiServer)
        }
    })
);

// 发布压缩
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: {
        except: ['$super', '$', 'exports', 'require']
            // 排除关键字
    },
    comments: false,
    compress: {
        // screw_ie8: true,//IE8
        warnings: false
    }
}));

config.devtool = 'source-map';
config.debug = false;

module.exports = config;
