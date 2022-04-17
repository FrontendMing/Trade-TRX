import fly from './http'

// 基础转账佣金 接口
export function basic2comm(params){
	return fly.post('/trade/basic2comm', params).then(res => res)
}

// 佣金转账基础 接口
export function comm2basic(params){
	return fly.post('/trade/comm2basic', params).then(res => res)
}

// 交易明细 接口
export function getTradeDetail(params){
	return fly.get('/trade/details', params).then(res => res)
}

// 佣金投资 接口
export function getTradeInvest(params) {
	return fly.post('/trade/invest', params).then(res => res)
}
