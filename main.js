import Vue from 'vue'
import App from './App'

import uniPopup from '@/components/uni-popup/uni-popup.vue'
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'

Vue.component('uniPopup', uniPopup)
Vue.component('uniPopupDialog', uniPopupDialog)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
