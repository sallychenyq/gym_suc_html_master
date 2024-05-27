import Vue from 'vue'
import App from './App'

// Api函数polyfill（目前为实验版本，如不需要，可删除！）';
import Polyfill from './polyfill/polyfill';
Polyfill.init();


import dayjs from 'dayjs'

Vue.prototype.$dayjs = dayjs

import * as NIJ from 'common/networkInterfaceJ.js'
Vue.prototype.$api=NIJ

import * as cfg from 'common/config'
Vue.prototype.$cfg=cfg

import * as config from 'common/_config'
Vue.prototype.$config=config

import * as router from 'common/router'
Vue.prototype.$v_router=router

import * as utils from 'common/utils'
Vue.prototype.$utils=utils
import * as message from 'common/message'
Vue.prototype.$message=message

// main.js，注意要在use方法之后执行
import uView from 'uview-ui'
Vue.use(uView)
// 如此配置即可
uni.$u.config.unit = 'rpx'

import store from './store'
Vue.prototype.$store = store

// 全局mixins，用于实现setData等功能，请勿删除！';
import Mixin from './polyfill/mixins';
Vue.mixin(Mixin);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
