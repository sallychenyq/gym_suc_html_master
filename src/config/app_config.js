const config = require('./app-config-local.js')
const appConfig=require('./app.config.json')
exports.program=function () {
    return appConfig.app
}
exports.conf=function () {
    return{
        APPFULLNAME:config.config()[this.program().name].APPFULLNAME,
        MPM:config.config()[this.program().name].MPM,
        ALONE:config.config()[this.program().name].ALONE,
        CC:config.config()[this.program().name].CC,
        SHOW_WXM_TOAST:config.config()[this.program().name].SHOW_WXM_TOAST,
        WX_PLUGINS:config.config()[this.program().name].WX_PLUGINS,
        H5_ROUTE_BASE:config.config()[this.program().name].H5_ROUTE_BASE || '/',
        WX_APPID:this.program().wxAppid,
        RUN_IN_WXM:config.config()[this.program().name].RUN_IN_WXM || false
    }
}
