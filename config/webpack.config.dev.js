// 引入基础配置文件
const webpackBase = require("./webpack.config.base");
// 引入 webpack-merge 插件
const webpackMerge = require("webpack-merge");
// 引入配置文件
const config = require("./config");
// 合并配置文件
module.exports = webpackMerge(webpackBase,{
    mode: 'development',
	//cheap-module-source-map的作用
	//如果压缩文件出现了报错，我们能够准确地定位到报错的原位置，就是找到报错在没有打包之前的未压缩的文件中的位置
	devtool:"cheap-module-source-map",
    // 配置 webpack-dev-server
    devServer:{
        // 项目根目录
        contentBase:config.devServerOutputPath,
        port:8080,
        // 错误、警告展示设置
        overlay:{
            errors:true,
            warnings:true
        }
    }
});
