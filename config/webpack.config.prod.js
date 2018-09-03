// 生产环境配置

// 引入基础配置
const webpackBase = require("./webpack.config.base");
// 引入 webpack-merge 插件
const webpackMerge = require("webpack-merge");
// 引入 webpack
const webpack = require("webpack");
// 引入css压缩插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 合并配置文件
module.exports = webpackMerge(webpackBase,{
	mode: 'production',
    plugins:[
        //DefinePlugin允许创建一个在编译时可以配置的全局常量。
	    //全局常量用来区分是开发环境还是生产环境，然后根据不同的环境就可以配置不同的接口路径
	    //全局常量的具体使用是在src文件夹下的api.js文件中
    	new webpack.DefinePlugin({
  			 DEV:false,
		}),
         //压缩css
	    new OptimizeCssAssetsPlugin({})
    ]
});