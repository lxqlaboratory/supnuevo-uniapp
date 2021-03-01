import request from '@/common/request.js'

export function getSupnuevoBuyerPriceCommodityListByLastFourCodigoMobile(data) {
	return request.request({
		url: '/sale/getSupnuevoBuyerPriceCommodityListByLastFourCodigoMobile',
		method: 'POST',
		data: data
	})
}

export function gerCommodityInfoByCodigoMobile(data) {
	return request.request({
		url: '/sale/gerCommodityInfoByCodigoMobile',
		method: 'POST',
		data: data
	})
}

export function saveCommoditySaleMobile(data) {
	return request.request({
		url: '/sale/saveCommoditySaleMobile',
		method: 'POST',
		data: data
	})
}
