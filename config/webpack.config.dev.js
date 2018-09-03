// 开发环境配置

// 引入基础配置文件
const webpackBase = require("./webpack.config.base");
// 引入 webpack-merge 插件
const webpackMerge = require("webpack-merge");
// 引入 webpack
const webpack = require("webpack");
// 引入配置文件
const config = require("./config");
// 合并配置文件
module.exports = webpackMerge(webpackBase,{
	mode: 'development',
	plugins:[
	    //DefinePlugin 允许创建一个在编译时可以配置的全局常量。
	    //用来区分是开发环境还是生产环境，然后根据不同的环境就可以配置不同的接口路径
	    //全局常量具体使用是在src文件夹下的api.js文件中
    	new webpack.DefinePlugin({
  			 DEV:true
		})
    ],
	//cheap-module-source-map的作用
	//如果压缩文件出现了报错，我们能够准确地定位到报错的原位置，就是找到报错在没有打包之前的未压缩的文件中的位置
	devtool:"cheap-module-source-map",
    // 配置 webpack-dev-server，用来监测js、HTML、CSS并自动刷新网页
    devServer:{
        // 项目根目录
        contentBase:config.devServerOutputPath,
        port:8080,
        proxy: {//服务器代理
            '/api': {//url中匹配到"/api"就会把url中"/api"之前的东西全部替换成下面target中的东西
                //target需要根据实际情况自行设置，比如也可设置为本地开启的java服务器或者php服务器，例 http://localhost:8888(8888为端口号)
                target: 'http://order.aichongyue.com',//测试服务器地址（这是测试服的服务器，不是本地开启的java服务器或php服务器，当然也可以设置本地的服务器）
                pathRewrite:{'^/api':''},// pathRewrite重写请求，请求会将/api替换为空字符串
                secure: false,
                changeOrigin:true
            }
        },
        // 错误、警告展示设置
        overlay:{
            errors:true,
            warnings:true
        }
    }
});

