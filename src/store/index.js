// 页面路径：store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
    state: {
        deviceInfo: null,
    },
    mutations: {
        SET_DEVICE_INFO(state, deviceInfo) {
            state.deviceInfo = deviceInfo
        }
    },
    getters: {
        isWindowInited: (state) =>() => {
            return state.deviceInfo!=null
        }
    },
    actions: {
        // 获取系统配置
        initSysConfig(store) {
            return new Promise((resolve, reject) => {
                if (store.state.deviceInfo){
                    resolve(store.state.deviceInfo)
                    return
                }
                var systemInfoSync = uni.getSystemInfoSync();
                console.log(systemInfoSync);
                const deviceInfo={
                    inited:true,
                    screenWidth:systemInfoSync.screenWidth,
                    screenHeight:systemInfoSync.screenHeight,
                    statusBarHeight:systemInfoSync.statusBarHeight,
                    windowWidth:systemInfoSync.windowWidth,
                    windowHeight:systemInfoSync.windowHeight,
                }
                console.log(deviceInfo);
                store.commit('SET_DEVICE_INFO', deviceInfo)
                resolve(deviceInfo)
            })
        }
    }
})
export default store
