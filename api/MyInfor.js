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

export function getSupnuevoBuyerUnionPriceTaxFormList(data) {
	return request.request({
		url: '/union/getSupnuevoBuyerUnionPriceTaxFormList',
		method: 'POST',
		data: data
	})
}

export function updateSupnuevoBuyerUnionPriceRatio(data) {
	return request.request({
		url: '/union/updateSupnuevoBuyerUnionPriceRatio',
		method: 'POST',
		data: data
	})
}

export function getSupnuevoBuyerUnionPriceFormListByTaxId(data) {
	return request.request({
		url: '/union/getSupnuevoBuyerUnionPriceFormListByTaxId',
		method: 'POST',
		data: data
	})
}

export function updateSupnuevoBuyerUnionPriceRatio1(data) {
	return request.request({
		url: '/union/updateSupnuevoBuyerUnionPriceRatio1',
		method: 'POST',
		data: data
	})
}

export function getSupnuevoBuyerUnionPriceClassList(data) {
	return request.request({
		url: '/union/getSupnuevoBuyerUnionPriceClassList',
		method: 'POST',
		data: data
	})
}

export function setUnionCurrentMerchantCount(data) {
	return request.request({
		url: '/union/setUnionCurrentMerchantCount',
		method: 'POST',
		data: data
	})
}

export function getSupnuevoBuyerUnionPriceListByPriceCount(data) {
	return request.request({
		url: '/union/getSupnuevoBuyerUnionPriceListByPriceCount',
		method: 'POST',
		data: data
	})
}

export function setAllCommodityIsAlive(data) {
	return request.request({
		url: '/union/setAllCommodityIsAlive',
		method: 'POST',
		data: data
	})
}

export function setSupnuevoBuyerUnionCommodityIsAlive(data) {
	return request.request({
		url: '/union/setSupnuevoBuyerUnionCommodityIsAlive',
		method: 'POST',
		data: data
	})
}

export function getUnionQueryDataListByInputString(data) {
	return request.request({
		url: '/union/getUnionQueryDataListByInputString',
		method: 'POST',
		data: data
	})
}

export function getSupnuevoBuyerUnionPriceByCommodityId(data) {
	return request.request({
		url: '/union/getSupnuevoBuyerUnionPriceByCommodityId',
		method: 'POST',
		data: data
	})
}

export function getSupnuevoBuyerUnionPriceDiscountInfoList(data) {
	return request.request({
		url: '/union/getSupnuevoBuyerUnionPriceDiscountInfoList',
		method: 'POST',
		data: data
	})
}

export function updateSupnuevoBuyerUnionPriceDiscountInfo(data) {
	return request.request({
		url: '/union/updateSupnuevoBuyerUnionPriceDiscountInfo',
		method: 'POST',
		data: data
	})
}

export function getSupnuevoBuyerUnionOrderDiscountForm(data) {
	return request.request({
		url: '/union/getSupnuevoBuyerUnionOrderDiscountForm',
		method: 'POST',
		data: data
	})
}

export function updateSupnuevoBuyerUnionOrderDiscount(data) {
	return request.request({
		url: '/union/updateSupnuevoBuyerUnionOrderDiscount',
		method: 'POST',
		data: data
	})
}

export function getSupnuevoBuyerUnionAdvertisementFormList(data) {
	return request.request({
		url: '/union/getSupnuevoBuyerUnionAdvertisementFormList',
		method: 'POST',
		data: data
	})
}

export function deleteSupnuevoBuyerUnionAdvertisement(data) {
	return request.request({
		url: '/union/deleteSupnuevoBuyerUnionAdvertisement',
		method: 'POST',
		data: data
	})
}

export function createSupnuevoBuyerUnionAdvertisement(data) {
	return request.request({
		url: '/union/createSupnuevoBuyerUnionAdvertisement',
		method: 'POST',
		data: data
	})
}

export function getSupnuevoBuyerUnionMemberFormList(data) {
	return request.request({
		url: '/union/getSupnuevoBuyerUnionMemberFormList',
		method: 'POST',
		data: data
	})
}

export function getSupnuevoCustomerOrderListOfDateByUnion(data) {
	return request.request({
		url: '/union/getSupnuevoCustomerOrderListOfDateByUnion',
		method: 'POST',
		data: data
	})
}

export function getSupnuevoCustomerOrderListOfUnionCanGrab(data) {
	return request.request({
		url: '/union/getSupnuevoCustomerOrderListOfUnionCanGrab',
		method: 'POST',
		data: data
	})
}

export function affirmCustomerOrder(data) {
	return request.request({
		url: '/customer/affirmCustomerOrder',
		method: 'POST',
		data: data
	})
}

export function finishCustomerOrder(data) {
	return request.request({
		url: '/customer/finishCustomerOrder',
		method: 'POST',
		data: data
	})
}

export function getHashNotUnionCommodityListOfMerchant(data) {
	return request.request({
		url: '/union/getHashNotUnionCommodityListOfMerchant',
		method: 'POST',
		data: data
	})
}

export function getIncompleteCommodityCodigoList(data) {
	return request.request({
		url: '/union/getIncompleteCommodityCodigoList',
		method: 'POST',
		data: data
	})
}

export function getSupnuevoCommodityCodigoMapCodigoList(data) {
	return request.request({
		url: '/commodity/getSupnuevoCommodityCodigoMapCodigoList',
		method: 'POST',
		data: data
	})
}

export function deleteSupnuevoCommodityCodigoMap(data) {
	return request.request({
		url: '/commodity/deleteSupnuevoCommodityCodigoMap',
		method: 'POST',
		data: data
	})
}

export function addSupnuevoCommodityCodigoMap(data) {
	return request.request({
		url: '/commodity/addSupnuevoCommodityCodigoMap',
		method: 'POST',
		data: data
	})
}

export function addSupnuevoCommodityCodigoMapSub(data) {
	return request.request({
		url: '/commodity/addSupnuevoCommodityCodigoMapSub',
		method: 'POST',
		data: data
	})
}

export function deleteSupnuevoCommodityCodigoMapSub(data) {
	return request.request({
		url: '/commodity/deleteSupnuevoCommodityCodigoMapSub',
		method: 'POST',
		data: data
	})
}