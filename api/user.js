import fly from './http'

// 测试接口
export function getRegion(params){
	return fly.post('/test/test1', params).then(res => res)
}