import fly from './http'


// 登录
export function login(params){
	return fly.post('/login', params).then(res => res)
}

// 登出
export function logout(params){
	return fly.post('/logout', params).then(res => res)
}

// 注册
export function register(params){
	return fly.post('/register', params).then(res => res)
}

// vip
export function getVipLevel() {
	return fly.get('/levels').then(res => res)
}

// 产品列表
export function getProducts() {
	return fly.get('/products').then(res => res)
}

// 查询平台数据
export function getPlatformData() {
	return fly.get('/platform/data').then(res => res)
}

// 查询平台通知
export function getPlatformNotices(params) {
	return fly.get('/platform/notices', params).then(res => res)
}



/*
 * 充值接口
 */
// 基础账户充值
export function rechargeBasic(params) {
	return fly.post('/recharge/basic', params).then(res => res)
}

// 佣金账户充值
export function rechargeCommission(params) {
	return fly.post('/recharge/commission', params).then(res => res)
}


/*
 * 代理接口
 */
// 查询代理关系
export function getRelations(params) {
	return fly.get('/relations', params).then(res => res)
}

// 查询代理人数
export function getRelationsCount(params) {
	return fly.get('/relations/count', params).then(res => res)
}



/*
 * 退款接口
 */
// 基础账户退款
export function refundBasic(params) {
	return fly.post('/refund/basic', params).then(res => res)
}

// 基础账户退款
export function refundCommission(params) {
	return fly.post('/refund/commission', params).then(res => res)
}


/*
 * 利润接口
 */
// 收取挖矿利润
export function collectProfit(params) {
	return fly.post('/profit/collect', params).then(res => res)
}

// 获取利润收益快表数据
export function getProfitFast(params) {
	return fly.get('/profit/fast', params).then(res => res)
}

// 获取利润收益更多数据
export function getProfitDetails(params) {
	return fly.get('/profit/details', params).then(res => res)
}
