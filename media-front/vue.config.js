module.exports = {
	publicPath: './',                 //根路径
	devServer: {
		open: true,              //自动开启首页
		host: 'localhost',
		port: '8090',            //端口号
		https: false,
		hotOnly: false,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:5000', //对应自己的接口
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}