import fly from './http'

// 测试接口
export function test() {
	return fly.get('/api/userId').then(res => 1)
}

// 登录接口
export function login(params){
	return fly.post('/api/login', params).then(res => res)
}

// 登出接口
export function logout(params){
	return fly.post('/api/logout', params).then(res => res)
}

// 注册接口
export function register(params){
	return fly.post('/api/register', params).then(res => res)
}

// vip接口
export function getVipLevel() {
	return fly.get('/api/levels').then(res => res)
}

// 产品列表接口
export function getProducts() {
	return fly.get('/api/products').then(res => res)
}

// 查询平台数据接口
export function getPlatformData() {
	return fly.get('/api/platform/data').then(res => res)
}

// 查询平台通知接口
export function getPlatformNotices() {
	return fly.get('/api/platform/notices').then(res => res)
}
