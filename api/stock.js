import request from '@/common/request.js'

export function getSupnuevoBuyerUnionList(data) {
	return request.request({
		url: '/union/getSupnuevoBuyerUnionList',
		method: 'POST',
		data: data
	})
}
