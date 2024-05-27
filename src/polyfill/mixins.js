/*
 * @Author: zhang peng
 * @Date: 2021-08-03 10:57:51
 * @LastEditTime: 2021-10-15 20:27:53
 * @LastEditors: zhang peng
 * @Description:
 * @FilePath: \miniprogram-to-uniapp2\src\project\template\polyfill\mixins.js
 *
 * 如果你想删除本文件，请先确认它使用的范围，感谢合作~
 * 如有疑问，请直接联系: 375890534@qq.com
 */
export default {
    async onShareAppMessage(res) {
        // console.log('触发分享按钮',res);
        // let shareFromBox=false
        // let shareMedia = {}
        // if (res && res.target && res.target.dataset && res.target.dataset.media && res.target.dataset.media.shareFromBox){
        //     shareFromBox=true
        // }
        // if (res && res.target && res.target.dataset && res.target.dataset.media){
        //     shareMedia=res.target.dataset.media
        // }
        // if (shareMedia.path && shareMedia.params){
        //     let params=''
        //     for (let key in shareMedia.params) {
        //         params+=`${key}=${shareMedia.params[key]}&`
        //     }
        //     shareMedia.path+=`?${params}`
        //     shareMedia.path+=`cc=${this.$utils.getCC()}`
        // }
        // const that=this
        // const defaultRes={
        //     title:shareMedia.title || this.$config.APPNAME_STRING || '健身中心',
        //     path: shareMedia.path || `/pages/home/index?cc=${this.$utils.getCC()}`,
        //     imageUrl: shareMedia.imageUrl || null,
        //     success(res){
        //         that.closeShare()
        //         uni.showToast({
        //             title:'分享成功'
        //         })
        //     },
        //     fail(res){
        //         uni.showToast({
        //             title:'分享失败',
        //             icon:'none'
        //         })
        //     }
        // }
        // var pages = getCurrentPages();
        // if (pages.length<=0){
        //     return defaultRes
        // }
        // const page = pages[pages.length-1];
        // const options = page.options;
        // let shareRes={}
        // let shareBody={}
        // switch (page.route) {
        //     case 'pages/course-detail/index':
        //         //分享课程
        //         shareBody={type:'course',courseId:options.id}
        //         break
        //     case 'pages/course-personal-detail/index':
        //         //分享课程
        //         shareBody={type:'coursePersonal',coursePersonalId:options.id}
        //         break
        //     case 'pages/coach-home/index':
        //         //分享课程
        //         shareBody={type:'coachHome',coachId:options.id}
        //         break
        //     case 'pages/coach-1v1/index':
        //         //分享课程
        //         shareBody={type:'coachTime',coachId:options.id}
        //         break
        //
        //     default:
        //         return defaultRes;
        // }
        // shareRes = await this.$api.shareApp(shareBody)
        // if (shareFromBox){
        //     defaultRes.path=`pages/go/index?cc=${this.$utils.getCC()}&share=${shareRes.data.id}`
        //     return defaultRes
        // }
        // this.$nextTick(()=>{
        //     if (typeof (this.$refs.page) === 'undefined'){
        //         this.$parent._confirm(obj)
        //         return
        //     }
        //     this.$refs.page.getShareBox().openShare(shareRes.data.id,defaultRes)
        // })
    },
    data(){
        return{
            // 这个页面是tabbar页面，需要在onShow的时候刷新
            tabBarPage:false,
        }
    },
    methods: {
        closeShare(){
            this.$nextTick(()=>{
                if (typeof (this.$refs.page) === 'undefined'){
                    return
                }
                this.$refs.page.getShareBox().close()
            })
        },
        getErrBox(){
            return new Promise(resolve => {
                this.$nextTick(()=>{
                    resolve(this.$refs.page.getErrbox())
                })
            })
        },
        _confirm(obj){
            this.$nextTick(()=>{
                if (typeof (this.$refs.page) === 'undefined'){
                    this.$parent._confirm(obj)
                    return
                }
                this.$refs.page.getErrbox().confirm(obj)
            })
        },
        _prompt(obj){
            this.$nextTick(()=>{
                if (typeof (this.$refs.page) === 'undefined'){
                    this.$parent._prompt(obj)
                    return
                }
                this.$refs.page.getErrbox().prompt(obj)
            })
        },
        _getLastListHeight(selector){
            return new Promise((resolve, reject) => {
                this.$store.dispatch('initSysConfig').then(deviceInfo=>{
                    this.$nextTick(()=>{
                        this.$u.getRect(selector).then(list => {
                            // 获取整个页面高度
                            let windowHeight = deviceInfo.windowHeight
                            if (this.tabBarPage){
                                windowHeight-=50
                            }
                            let listHeight=windowHeight-list.top
                            if (listHeight<=0){
                                setTimeout(()=>{
                                    console.log('RE-refreshCourseListHeight',listHeight);
                                    this._getLastListHeight(selector).then(height=>{
                                        resolve(height)
                                    })
                                },1000)
                            }else {
                                resolve(listHeight)
                            }
                        })
                    })
                })
            })
        },
        /**
         * 解析事件里的动态函数名，这种没有()的函数名，在uniapp不被执行
         * 比如：<view bindtap="{{openId==undefined?'denglu':'hy_to'}}">立即</view>
         * @param {*} exp
         */
        parseEventDynamicCode (exp) {
            if (typeof (eval("this." + exp)) === 'function') {
                eval("this." + exp + '()')
            }
        },
        /**
         * 用于处理对props进行赋值的情况
         * //简单处理一下就行了
         *
         * @param {*} target
         * @returns
         */
        deepClone (target) {
            return JSON.parse(JSON.stringify(obj))
        }
    }
}
