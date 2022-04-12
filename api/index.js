import * as common from './common'
import * as user from './user'
import * as trade from './trade'
import Vue from 'vue'

//api返回结果，正确的状态
export const STATUS_OK = '000'

const api = {
	STATUS_OK: STATUS_OK,
	...common,
	...user,
	...trade,
}

Vue.prototype.$api = api
export default api
