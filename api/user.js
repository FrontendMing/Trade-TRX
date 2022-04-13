import fly from './http'

// 获取用户邀请码
export function getUserInviteCode(){
	return fly.get('/user/invite/code').then(res => res)
}