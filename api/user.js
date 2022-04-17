import fly from './http'

// 用户信息
export function getUserInfo(){
	return fly.get('/user').then(res => res)
}

// 基础账户信息
export function getUserBasic(){
	return fly.get('/user/basic').then(res => res)
}

// 佣金账户信息
export function getUserCommission(){
	return fly.get('/user/commission').then(res => res)
}

// 用户投资明细
export function getUserInvestDetail(){
	return fly.get('/user/invest/detail').then(res => res)
}

// 获取用户邀请码
export function getUserInviteCode(){
	return fly.get('/user/invite/code').then(res => res)
}

// 修改登录密码
export function modifyLoginPassword(){
	return fly.put('/user/password/login').then(res => res)
}

// 重置密码
export function resetPassword(){
	return fly.put('/user/password/reset').then(res => res)
}

// 修改安全密码
export function modifySafePassword(){
	return fly.put('/user/password/safe').then(res => res)
}

// 发送邮箱验证码
export function sendEmailCode(){
	return fly.get('/user/send/code').then(res => res)
}

// 发送忘记密码邮箱url
export function sendEmailReset(params){
	return fly.get('/user/send/reset', params).then(res => res)
}