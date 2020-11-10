import request from '@/common/request.js'

export function updateSupnuevoBuyerUnionAllPriceInfo(data) {
	return request.request({
		url: '/union/updateSupnuevoBuyerUnionAllPriceInfo',
		method: 'POST',
		data: data
	})
}

export function uploadAttachData(data) {
	return request.request({
		url: '/comm/uploadAttachData',
		method: 'POST',
		data: data
	})
}

export function getSupnuevoBuyerUnionRegulationInfo(data) {
	return request.request({
		url: '/union/getSupnuevoBuyerUnionRegulationInfo',
		method: 'POST',
		data: data
	})
}

export function updateSupnuevoBuyerUnion(data) {
	return request.request({
		url: '/union/updateSupnuevoBuyerUnion',
		method: 'POST',
		data: data
	})
}
