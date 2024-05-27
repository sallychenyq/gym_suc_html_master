export const APPNAME = 'st';
const BOOLEAN_KEY={
    'true':true,
    'false':false,
    'null':false,
    'undefined':false,
    '':false,
}
export const APPFULLNAME = process.env.VUE_APP_APP_APPFULLNAME
export const MPM = process.env.VUE_APP_APP_MPM
export const ALONE = BOOLEAN_KEY[process.env.VUE_APP_APP_ALONE] || false
export const CC = process.env.VUE_APP_APP_CC



export const BREAK_ERR_ROUTER={
    needClique:{
        msg:'您需要通过认证才可进行预约操作',
        button:'去认证',
        // route:'/pages/mine/index'
        route:'/pages/welfare-search/welfare-search'
    },
    needRegister:{
        msg:'您需要登录才可以使用全部功能,是否立即注册?',
        button:'去注册',
        closeButton:'先看看',
        // route:'/pages/mine/index'
        route:'/pages/resume/index'
    },
    needUserInfo:{
        msg:'为了为您提供更好的服务支持,是否前往完善个人信息?',
        button:'去完善',
        closeButton:'下次吧',
        // route:'/pages/mine/index'
        route:'/pages/edit-user-info/index'
    },
    // payPrice:{
    //     msg:'您的账户余额不足,请充值后操作',
    //     button:'去充值',
    //     route:'/pages/recharge-balance/recharge-balance'
    // },
    toCheckQr:{
        msg:'操作成功,是否现在打开入场码',
        button:'去刷码',
        route:`/pages/mine/index?qrBox=${true}`
    },
    noMobile:{
        msg:'您还没有绑定手机号,根据门店协议,您需要绑定手机号后才可进行下一步操作',
        button:'去绑定',
        route:'/pages/resume/index?bindMobile=true'
    },
    noVisitorForm:{
        msg:'您还没有填写今日的访客记录表,根据门店协议,您需要填写访客记录表后才可进行下一步操作',
        button:'去填写',
        route:'/pages/visitor-form/index'
    }
}
