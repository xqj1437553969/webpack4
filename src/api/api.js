//根据开发环境和生产环境配置不同的接口（不配置的话，打包需要更改接口路径，本地测试又需要改回来比较麻烦）

//此配置具体使用例子需要在src文件夹下的index.js文件中查看
if(DEV){
	//开发环境，开发环境配置在config文件夹下webpack.config.dev.js文件
	//开发环境会使用服务器代理配置，请求url中匹配到"/api"就会把url中"/api"之前的东西全部替换成配置文件中设置的http://order.aichongyue.com
	module.exports = {
	   baseUrl:'/api/fuwii',//baseUrl用来拼接测试服务器接口地址，需要根据实际情况自行设置
	   getImgUrl:'/api'// getImgUrl用来拼接测试服务器图片地址，这里的图片是指从后台获取的图片，需要根据实际情况自行设置
    }
}else{
	//生产环境（也就是打包之后），生产环境配置在config文件夹下webpack.config.prod.js文件
	module.exports = {
	   baseUrl:'..',//baseUrl用来拼接正式服务器接口地址，需要根据实际情况自行设置
	   getImgUrl:''// getImgUrl用来拼接正式服务器图片地址，这里的图片是指从后台获取的图片，需要根据实际情况自行设置
    }
}