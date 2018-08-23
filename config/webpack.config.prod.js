// 引入基础配置
const webpackBase = require("./webpack.config.base");
// 引入 webpack-merge 插件
const webpackMerge = require("webpack-merge");
// 引入 webpack
const webpack = require("webpack");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 合并配置文件
module.exports = webpackMerge(webpackBase,{
    mode: 'production',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    name: "vendor",
                    enforce: true
                }
            }
        }
    },
    plugins:[
        //压缩css
	    new OptimizeCssAssetsPlugin({}),
        // 提取公共 JavaScript 代码
         
    ]
});