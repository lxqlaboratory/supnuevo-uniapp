
import Request from '@/request/index.js'

// 切换baseUrl 
const config = {
    // baseUrl: 'https://wxgradms.sdu.edu.cn/func',
      baseUrl: 'http://localhost:8080/func',
	  // baseUrl: 'http://192.168.1.102:8080/func',
	  // baseUrl: 'http://union.supnuevo.com.ar/func',
	header: {"Content-Type": "application/json",
	},
	cancelReject: {
		text: '请求未通过验证,检查是否登录或者数据正确',
		type: 'warning'
	},
	failReject: {
		type: 'error',
		text: "网络异常，请求发送失败，请检查网络"
	}
}

const reqInterceptor = async (options) => {
	 if(options.url != 'http://localhost:8080/func/auth/webLogin')
	// if(options.url != 'https://wxgradms.sdu.edu.cn/func/auth/webLogin')
	// if(options.url != 'http://192.168.1.102:8080/func/auth/webLogin')
	 // if(options.url != 'http://union.supnuevo.com.ar/func/auth/webLogin')
	{options.header= {"Content-Type": "application/json",
	"Cookie":"JSESSIONID="+getApp().globalData.vueSessionId}}
	return options
}


const resInterceptor = (response, conf={}) => {
	
	return response.data
}

const req = new Request(config, reqInterceptor, resInterceptor)

export default req
