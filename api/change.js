import request from '@/common/request.js'

export function getQueryDataListByInputStringMobile(data) {
	return request.request({
		url: '/commodity/getQueryDataListByInputStringMobile',
		method: 'POST',
		data: data
	})
}
export function getSupnuevoBuyerPriceFormByCodigoMobile(data) {
	return request.request({
		url: '/commodity/getSupnuevoBuyerPriceFormByCodigoMobile',
		method: 'POST',
		data: data
	})
}