// 发布时动态修改 manifest.json
// 读取 manifest.json ，修改后重新写入
const theme={
    'orange':{remark:'黄色主题色',value:{'$app-main-color':'#ff7e00','$app-main-color-1':'#ffcea2'}},
    'red':{remark:'嘉实红',value:{'$app-main-color':'#ed0000','$app-main-color-1':'rgba(218, 0, 0, 0.05)'}},
    'blue':{remark:'新奥蓝',value:{'$app-main-color':'rgba(41, 66, 244,1)','$app-main-color-1':'rgba(41, 66, 244, 0.1)'}},
}
function writeTheme(theme) {
    let themeStrJS=`//* 主题颜色变量 主题配置文件  ${theme.remark || ''}*/\n`
    let themeStr=`/* 主题颜色变量 主题配置文件  ${theme.remark || ''}*/\n`
    themeStr+=`/* 该文件由auto-config.js自动创建 */\n`
    const colors=theme.value
    for (let colorsKey in colors) {
        themeStr+=`${colorsKey}:${colors[colorsKey]};\n`
        let k=null
        switch (colorsKey) {
            case '$app-main-color':
                k='colorMain'
                break
            case '$app-main-color-1':
                k='colorMain1'
                break
            default:
                continue
        }
        themeStrJS+=`export const ${k} = '${colors[colorsKey]}';\n`
    }
    fs.writeFile(
        __dirname+'/src/config/style.scss',
        themeStr,
        e => (e ? console.error(e) : console.log(`主题:${theme.remark || ''},config/style.scss 主题配置文件更新成功`))
    );
    fs.writeFile(
        __dirname+'/src/config/style.js',
        themeStrJS,
        e => (e ? console.error(e) : console.log(`主题:${theme.remark || ''},config/style.scss 主题配置文件更新成功`))
    );

}
const fs = require('fs')

let Manifest = require(`./manifest-default.json`);

const UNI_PLATFORM=process.env.UNI_PLATFORM
// const app=process.UNI_SCRIPT_ENV.APP
console.log(process.env);
const app={
    APPFULLNAME:process.env.VUE_APP_APP_APPFULLNAME,
    H5_ROUTE_BASE:process.env.VUE_APP_APP_H5_ROUTE_BASE,
    WX_APPID:process.env.VUE_APP_APP_WX_APPID,
    // WX_LIVE:process.env.VUE_APP_APP_WX_LIVE,
    WX_LIVE:false,
    THEME:process.env.VUE_APP_APP_THEME,
}
if (!(app.THEME && theme[app.THEME])){
    app.THEME='orange'
}
writeTheme(theme[app.THEME])
console.log(app);
if (!app){
    throw '未配置APP环境变量'
}
Manifest['name']=app.APPFULLNAME
switch (UNI_PLATFORM) {
    case 'h5':
        //写入routerBase
        // replaceManifest('h5.router.base', app.H5_ROUTE_BASE || '/')
        Manifest['h5'].router.base=app.H5_ROUTE_BASE || '/'
        break
    case 'mp-weixin':
        //写入微信appid
        // replaceManifest('mp-weixin.appid', app.WX_APPID || '')
        Manifest['mp-weixin'].appid=app.WX_APPID || ''
        if (app.WX_LIVE){
            //直播
            Manifest['mp-weixin'].plugins['live-player-plugin']={
                "version": "1.3.5",
                "provider": "wx2b03c6e691cd7370"
            }
        }
        break
}
const outManifestPath = __dirname+'/src/manifest.json'
fs.writeFileSync(outManifestPath, JSON.stringify(Manifest), {
    "flag": "w"
})

// vue.config.js，如没有此文件则手动创建
module.exports = {
    transpileDependencies: ['uview-ui']
}
