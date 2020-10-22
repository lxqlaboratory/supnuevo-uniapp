import request from '@/common/request.js'

export function login(data) {
	return request.request({
		url: '/auth/webLogin',
		method: 'POST',
		data: data
	})
}

export function getMerchantInitInfoMobile(data) {
	return request.request({
		url: '/merchant/getMerchantInitInfoMobile',
		method: 'POST',
		data: data
	})
}