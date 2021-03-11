import request from '@/common/request.js'

export function getSupnuevoBuyerUnionList(data) {
	return request.request({
		url: '/union/getSupnuevoBuyerUnionList',
		method: 'POST',
		data: data
	})
}

export function loginAfterOtherServerAuthed(data) {
	return request.request({
		url: '/auth/loginAfterOtherServerAuthed',
		method: 'POST',
		data: data,
		flag: 2
	})
}

export function getAllVentasInfoFormNew(data) {
	return request.request({
		url: '/sale/getAllVentasInfoFormNew',
		method: 'POST',
		data: data,
		flag: 2
	})
}
