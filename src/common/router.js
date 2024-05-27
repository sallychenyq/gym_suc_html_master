import * as api from './networkInterfaceJ'
export const push=function (route) {
    uni.navigateTo({
        url:route
    })
}
export const toLive=function (liveId,redirect=false) {
    // #ifdef MP-WEIXIN
    api.getLiveInfo({
        liveId:liveId
    }).then(res=>{
        console.log(res);
        const customParams = {
            path: '/pages/coach-home/index',
            id: res.data.coachId
        }
        const url=`plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${res.data.liveRoomid}&custom_params=${encodeURIComponent(JSON.stringify(customParams))}`
        if (redirect){
            uni.redirectTo({
                url: url
            });
        }else {
            push(url)
        }

    })
    // #endif
    // #ifdef H5
    api.toLiveUrl({
        liveId: liveId
    }).then(res => {
        window.location.href=res.data
    })
    // #endif
}

export const redirect=function (route,query) {
    if (query){
        let params="?"
        for (let queryKey in query) {
            params+=`${queryKey}=${query[queryKey]}&`
        }
        route+=params
    }
    uni.redirectTo({
        url: route
    });
}

export const relaunch=function (route,query) {
    if (query){
        let params="?"
        for (let queryKey in query) {
            if (queryKey){
                params+=`${queryKey}=${query[queryKey]}&`
            }
        }
        if (params.charAt(params.length-1)==="&"){
            params=params.substring(0,params.length-1)
        }
        route+=params
    }
    uni.reLaunch({
        url: route
    });
}

export const pushUrl=function (url) {
    // #ifdef H5
    window.location.href=url
    // #endif
    // #ifndef H5
    uni.navigateTo({
        url:`/pages/web-browser/index`,
        success: function(res) {
            res.eventChannel.emit('sendParams', {
                url: url,
            })
        }
    })
    // #endif
}

export const pushTab=function (route) {
    uni.switchTab({
        url:route
    })
}
export const goHome=function () {
    uni.switchTab({
        url:'/pages/hall/index'
    })
}

