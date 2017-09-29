const Env = require('./env.json')[process.env.NODE_ENV];

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const IsProduct = process.env.NODE_ENV === 'production';

const config = require('./webpack.common.config.js');

const cssLoader = {
    loader: 'css-loader',
    options: {
        minimize: true //css压缩
    }
};

config.module.rules.push({
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
        loaders: {
            css: !IsProduct ? 'style-loader!css-loader!postcss-loader' : ExtractTextPlugin.extract({
                use: [cssLoader, 'postcss-loader'],
                fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
            }),
            less: !IsProduct ? 'style-loader!css-loader!postcss-loader!less-loader' : ExtractTextPlugin.extract({
                use: [cssLoader, 'postcss-loader', 'less-loader'],
                fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
            }),
            scss: !IsProduct ? 'style-loader!css-loader!postcss-loader!sass-loader' : ExtractTextPlugin.extract({
                use: [cssLoader, 'postcss-loader', 'sass-loader'],
                fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
            })
        }
    }
});

// inject env
config.plugins.push(new webpack.DefinePlugin({
    'process.env.API_SERVER': JSON.stringify(Env.apiServer)
}));

// 注意: package.json commind line refuse --hot config
for (var key in (IsProduct ? {} : config.entry)) {
    if (!config.entry.hasOwnProperty(key))
        continue;

    if (!(config.entry[key] instanceof Array))
        config.entry[key] = [config.entry[key]];

    // 按照官网说法，命令行--inline或者devServer配置inline：true即可实现此步功能
    // 但是如果通过Node.js API new WebpackDevServer的方式创建，不存在inline参数，就需要手动添加了
    // 如果在命令行添加了--inline参数，此处可删除，测试过
    // config.entry[key].unshift('webpack-dev-server/client/?http://' + Env.devHost + ':' + Env.devPort);

    // 按照官网说法，命令行--inline或者devServer配置inline：true即可实现此步功能
    // 但是如果通过Node.js API new WebpackDevServer的方式创建，不存在inline参数，就需要手动添加了
    // 如果在命令行添加了--inline参数，此处可删除，测试过
    // config.entry[key].unshift('webpack-dev-server/client/?http://' + Env.devHost + ':' + Env.devPort);
}

// api proxy for develop
config.devServer.proxy = Env.devProxy;

config.devtool = IsProduct ? 'cheap-module-source-map' : 'source-map';

module.exports = config;
