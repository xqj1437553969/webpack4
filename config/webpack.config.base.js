const path = require("path");
const webpack = require("webpack");
// 自动生成HTML插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 清理 dist 文件夹
const CleanWebpackPlugin = require("clean-webpack-plugin")
// 抽取 css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 复制插件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 引入多页面文件列表
const config = require("./config");
// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = [];
// 入口文件集合
let Entries = {}

// 生成多页面的集合
config.HTMLDirs.forEach((page) => {
    const htmlPlugin = new HTMLWebpackPlugin({
        filename: `${page}.html`,
        template: path.resolve(__dirname, `../src/${page}.html`),
        chunks:[page,'vendor']
    });
    HTMLPlugins.push(htmlPlugin);
    Entries[page] = path.resolve(__dirname, `../src/js/${page}.js`);
})

module.exports = {
    entry:Entries,
//  devtool:"cheap-module-source-map",
    output:{
        filename:"js/[name].[chunkhash].js",
        path:path.resolve(__dirname,"../dist")
    },
    // 加载器
    module:{
        rules:[
            {  
               //处理html中的img标签中的图片，解决img标签中的图片不会被打包的问题
		       test:/\.html$/,
			   loader:'html-loader'
            },
            {
                // 对 css 后缀名进行处理
                test:/\.css$/,
                // 不处理 node_modules 文件中的 css 文件
                exclude: /node_modules/,
                // 抽取 css 文件到单独的文件夹
                    
                use:[{
                   loader:MiniCssExtractPlugin.loader,
                   options:{
						publicPath: config.cssPublicPath
            	   }
                   
                },"css-loader","postcss-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:[
	                  {
	                    loader:"url-loader",
	                    options:{
	                    	limit: 10000,//表示小于10kb的图片转为base64
	                        // 打包生成图片的名字
	                        name:"[name].[hash:7].[ext]",
	                        // 图片的生成路径
	                        outputPath:config.imgOutputPath
	                    }
	                  },
	                  {
	                  	//压缩图片
					    loader: 'image-webpack-loader'
		   			  }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use:["file-loader"]
            }
        ],
    },
    plugins:[
        //通过npm install安装jquery时,对jquery进行打包
//      new webpack.ProvidePlugin({
//		      $: 'jquery',
//		      jQuery: 'jquery'
//      }),
        // 自动清理 dist 文件夹
        new CleanWebpackPlugin(["dist"],{
           root: path.resolve(__dirname, '../'),
           verbose:true,
           dry:false 
        }),
        // 将 css 抽取到某个文件夹
 		new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            allChunks: true
     	}), 
        // 自动生成 HTML 插件
        ...HTMLPlugins,
        
        //复制插件，用于复制根目录static文件夹下的静态文件，比如jquery.js
        new CopyWebpackPlugin([
			   {
			        from: path.resolve(__dirname, '../static'),
			        to:'static',
			        ignore: ['.*']//忽略.*的文件
			   }
    	])
    ]
}
