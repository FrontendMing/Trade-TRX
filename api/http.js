// import flyio from 'flyio'
var Fly=require("flyio/dist/npm/wx")
var fly=new Fly

//设置超时
fly.config.timeout = 30000;
//设置请求基地址
fly.config.baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'http://175.178.60.142:8081/api'		// http请求地址

// 添加请求拦截器
fly.interceptors.request.use((request) => {
	// 在发送请求之前做些什么
	let token = uni.getStorageSync('token')
	if (token) {
		request.headers['token'] = token
	}
	return request
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error)
})

fly.interceptors.response.use((res) => {
	// 对响应数据做些事
	if (!res.data) {
		return Promise.reject(res)
	}
	// 账号在别处登录、token不能为空、token失效
	if ([603, 606, 607].includes(res.data.code)) {
		uni.showToast({
			title: res.data.msg,
			icon: 'none'
		})
		// 账号在别处登录，清空登录信息
		if (res.data.code === 603) {
			uni.clearStorageSync()
		}
		setTimeout(() => {
			uni.redirectTo({
				url: '/pages/login'
			})
		}, 1500)
		return Promise.reject(res.data)
	}
	if (res.data.code !== 0) {
		uni.showToast({
			title: res.data.msg,
			icon: 'error'
		})
		return Promise.reject(res.data)
	}
	return res.data
}, (error) => {
	return Promise.reject(error)
})

export default fly
