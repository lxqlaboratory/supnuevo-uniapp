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

export function getSupnuevoMerchantInfoMobile(data) {
	return request.request({
		url: '/merchant/getSupnuevoMerchantInfoMobile',
		method: 'POST',
		data: data
	})
}

export function updateMerchantShopNameMobile(data) {
	return request.request({
		url: '/merchant/updateMerchantShopNameMobile',
		method: 'POST',
		data: data
	})
}

export function setMerchantVisibleEachOtherMobile(data) {
	return request.request({
		url: '/merchant/setMerchantVisibleEachOtherMobile',
		method: 'POST',
		data: data
	})
}

export function submitSupnuevoMerchantQuestionInfoMobile(data) {
	return request.request({
		url: '/merchant/submitSupnuevoMerchantQuestionInfoMobile',
		method: 'POST',
		data: data
	})
}

export function addSupnuevoMerchantPriceOperRel(data) {
	return request.request({
		url: '/merchant/addSupnuevoMerchantPriceOperRel',
		method: 'POST',
		data: data
	})
}

export function getRelMerchantListOfMerchantMobile(data) {
	return request.request({
		url: '/merchant/getRelMerchantListOfMerchantMobile',
		method: 'POST',
		data: data
	})
}

export function updateSupnuevoMerchantPriceOperRel(data) {
	return request.request({
		url: '/merchant/updateSupnuevoMerchantPriceOperRel',
		method: 'POST',
		data: data
	})
}

