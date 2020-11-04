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

export function saveOrUpdateSupnuevoBuyerCommodityPriceMobile(data) {
	return request.request({
		url: '/commodity/saveOrUpdateSupnuevoBuyerCommodityPriceMobile',
		method: 'POST',
		data: data
	})
}

export function getSupnuevoBuyerCommodityPriceFormListOfGroupMobile(data) {
	return request.request({
		url: '/commodity/getSupnuevoBuyerCommodityPriceFormListOfGroupMobile',
		method: 'POST',
		data: data
	})
}

export function updateSupnuevoBuyerCommodityPriceGroupMobile(data) {
	return request.request({
		url: '/commodity/updateSupnuevoBuyerCommodityPriceGroupMobile',
		method: 'POST',
		data: data
	})
}

export function saveOrUpdateSupnuevoBuyerCommodityPriceAllRelMerchantMobile(data) {
	return request.request({
		url: '/commodity/saveOrUpdateSupnuevoBuyerCommodityPriceAllRelMerchantMobile',
		method: 'POST',
		data: data
	})
}

export function getSupnuevoCommodityTaxInfoListMobile(data) {
	return request.request({
		url: '/commodity/getSupnuevoCommodityTaxInfoListMobile',
		method: 'POST',
		data: data
	})
}

export function setCalculationStorageMobile(data) {
	return request.request({
		url: '/commodity/setCalculationStorageMobile',
		method: 'POST',
		data: data
	})
}

export function getSupnuevoScaleInfoListMobile(data) {
	return request.request({
		url: '/commodity/getSupnuevoScaleInfoListMobile',
		method: 'POST',
		data: data
	})
}

export function saveOrUpdateSupnuevoCommonCommodityMobile(data) {
	return request.request({
		url: '/commodity/saveOrUpdateSupnuevoCommonCommodityMobile',
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

export function changeSupnuevoCommonCommodityImage(data) {
	return request.request({
		url: '/commodity/changeSupnuevoCommonCommodityImage',
		method: 'POST',
		data: data
	})
}

export function deleteSupnuevoCommonCommodityImage(data) {
	return request.request({
		url: '/commodity/deleteSupnuevoCommonCommodityImage',
		method: 'POST',
		data: data
	})
}

