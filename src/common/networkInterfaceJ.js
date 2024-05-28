import * as config from './config.js';
import * as utils from './utils.js';
import * as privateConfig from './_config';
import * as router from './router';

const generalRequest = (url, beforeRequestHook, afterRequestHook, method, conf, data) => new Promise((resolve,
	reject) => {
	const request = {
		url,
		method,
		conf,
		data
	}
	const next = (opt) => {
		let header = {}
		if (conf && conf.headers) {
			header = conf.headers
		}
		header['content-type'] = 'application/x-www-form-urlencoded'
		header['ST-Token'] = utils.getClitToken()
		let param = {
			url: opt.url,
			data: opt.data,
			method,
			header: header,
			success: (res) => {
				if (res.statusCode !== 200) {
					uni.showToast({
						icon: 'none',
						title: 'serverErr: ' + res.statusCode
					});
					reject('resCode:' + res.statusCode);
					return;
				}

				if (afterRequestHook) {
					afterRequestHook(res, resolve, reject, opt, request);
					return;
				}

				resolve(res.data);
			},
			fail: (res) => {
				if (afterRequestHook) {
					afterRequestHook(res, resolve, reject, opt, request);
					return;
				}
				reject(res);
			}
		};

		if (method === 'post') {
			param.header['content-type'] = 'application/json';
		}

		uni.request(param);
	};

	if (beforeRequestHook) {
		beforeRequestHook({
				url,
				data,
				conf
			},
			next
		);
	} else {
		next({
			url,
			data
		});
	}
}); //绘装请求前拦截器

const huihomeAjaxHookBefore = function(param, next) {
	param.url = config.host.addrJ + param.url;
	if (!param.data) {
		param.data = {};
	}

	//按照2018-12-3号关于form表单提交的约定 如果参数中某个节点的值是null或者因为从页面自定义属性读取的值为字符串"null"则删除该节点避免后端报错
	for (const key in param.data) {
		if (param.data.hasOwnProperty(key)) {
			const element = param.data[key];

			if (element === null || element === 'null' || element === undefined) {
				delete param.data[key];
			}
		}
	}

	// param.url += `?app=${config.APPNAME}&mpm=${utils.getMPM()}&cc=${utils.getCC()}`;

	if (uni.getStorageSync('sendUser')) {
		param.url += `&send=${uni.getStorageSync('sendUser')}`;
	}

	if (param.conf && param.conf.loading) {
		uni.showLoading({
			title: param.conf.loading,
			mask: true
		});
	}

	next(param);
};


//绘装请求后拦截器
const huihomeAjaxHookAfter = (res, resolve, reject, opt, request) => {
	uni.hideLoading();
	if (res.statusCode !== 200) {
		uni.showToast({
			icon: 'none',
			title: '服务器错误'
		});
		return;
	}
	if (!opt.conf) {
		opt.conf = {}
	}
	if (!opt.conf.tryCount) {
		opt.conf.tryCount = 1
	}
	if (res.data.code === 0) {
		resolve(res.data);
	} else {
		if (res.data.code === 21) {
			res.box = true;
			if (opt.conf) {
				utils.message.err(res.data.msg, opt.conf.errBox || '失败')
			}
			reject(res);
			return;
		}

		if (res.data.code === 20) {
			const msg = res.data.msg
			if (privateConfig.BREAK_ERR_ROUTER[msg]) {
				//to route
				const routerConfig = privateConfig.BREAK_ERR_ROUTER[msg]
				utils.message.routerBox(routerConfig, res.data.data, res.data.extra)
				reject(res);
				return;
			}
			uni.$emit(msg, res.data.data, res.data.extra)
			res.break = true;
			reject(res);
			return;
		}

		if (res.data.code === 22) {
			const msg = res.data.msg
			uni.showModal({
				content: msg,
				success: function(e) {
					if (e.confirm) {
						if (!opt.conf.headers) {
							opt.conf.headers = {}
						}
						opt.conf.headers[`confirm-${res.data.tryQues}`] = 'ok'
						const retry = huihomeInterFace(request.method, request.url, opt.conf)
						retry(request.data).then(e => {
							resolve(e.data);
						})
					} else {
						reject(res);
					}
				}
			})
			return;
		}

		if (res.data.code === 401) {
			if (opt.conf.retry && opt.conf.tryCount <= 5 && !utils.isLoggedIn()) {
				uni.showLoading({
					title: '正在加载',
					mask: true
				});
				//等待用户登录操作完成
				utils.timeoutDo(1000).then(() => {
					opt.conf.tryCount++
					const retry = huihomeInterFace(request.method, request.url, opt.conf)
					retry(request.data).then(e => {
						resolve(e.data);
					})
				})
				return;
			}
			// #if MP-WEIXIN
			if (!(opt.conf && opt.conf.nojump)) {
				router.push("/pages/resume/index")
			}
			// #endif
			// #if H5
			if (!(opt.conf && opt.conf.nojump)) {
				router.redirect("/pages/no-login/index")
			}
			// #endif
			reject(res);
			return;
		}

		uni.showToast({
			icon: 'none',
			title: res.data.msg
		});
		reject(res);
	}
};


//绘装接口生成器
export function huihomeInterFace(method, addr, conf) {
	return generalRequest.bind(null, addr, huihomeAjaxHookBefore, huihomeAjaxHookAfter, method, conf);
}

/***********************************接口*************************************/
/**
 * 配置相关
 */
export const noCCTip = huihomeInterFace('get', '/man/nocc');
export const getCorpChannel = huihomeInterFace('get', '/user/getCorpChannel');
export const getCorpManConfig = huihomeInterFace('get', '/man/get', {
	nojump: true,
	retry: true
});

export const getStaffName = huihomeInterFace('get', '/user/getStaffName');
export const getShortNameName = huihomeInterFace('get', '/user/getShortName');
export const getcoach = huihomeInterFace('get', '/front/superCoach/typeList?cc=1002');
/**
 * 个人相关
 */
export const getMyBodyTestData = huihomeInterFace('get', '/user/getMyBodyTestData', {
	loading: '正在获取体测数据'
});

export const loginByCode = huihomeInterFace('get', '/user/login');

export const checkNeedSignAgreement = huihomeInterFace('get', '/vipCard/needSignAgreement');

export const userVipCard = huihomeInterFace('get', '/user/qr', {
	loading: '正在获取'
});

export const setBalanceRechargeOrderWx = huihomeInterFace('post', '/balance/rechargeWx', {
	loading: '正在创建订单',
	errBox: '下单失败'
});

export const listSitePack = huihomeInterFace('get', '/sitePack/list');
export const listSitePackTime = huihomeInterFace('get', '/sitePack/timeList', {
	loading: '正在获取内容'
});
export const getSitePackOne = huihomeInterFace('get', '/sitePack/one');
export const getSitePackOneRule = huihomeInterFace('get', '/sitePack/oneRule');
export const appointSitePack = huihomeInterFace('post', '/sitePack/appoint', {
	loading: '正在执行预约'
});
export const cancelAppoint = huihomeInterFace('post', '/sitePack/cancelAppoint', {
	loading: '正在取消预约'
});
export const getCoachInfo = huihomeInterFace('get', '/coach/info', {
	loading: '正在获取信息'
});
export const getGoodAtInfo = huihomeInterFace('get', '/coach/goodAtInfo');
export const getCourseOne = huihomeInterFace('get', '/course/getOne');
export const getLiveOne = huihomeInterFace('get', '/course/getLive');
export const appointCourse = huihomeInterFace('post', '/appoint/appointCourse', {
	loading: '正在预约',
	errBox: '预约失败'
});
export const appointLive = huihomeInterFace('post', '/appoint/appointLive', {
	loading: '正在预约',
	errBox: '预约失败'
});
export const toLive = huihomeInterFace('get', '/course/getLiveRoom', {
	loading: '正在加载直播间信息',
	errBox: '加载失败'
});
export const getLiveInfo = huihomeInterFace('get', '/course/getLiveInfo', {
	loading: '正在加载直播间信息',
	errBox: '加载失败'
});
export const toLiveUrl = huihomeInterFace('get', '/course/toLiveUrl', {
	loading: '正在加载直播间信息',
	errBox: '加载失败'
});
export const cancelAppointCourse = huihomeInterFace('post', '/appoint/cancelAppointCourse', {
	loading: '正在取消',
	errBox: '取消失败'
});
export const cancelAppointLive = huihomeInterFace('post', '/appoint/cancelAppointLive', {
	loading: '正在取消',
	errBox: '取消失败'
});

export const coachList = huihomeInterFace('post', '/coach/list', {
	loading: '正在加载'
});
export const coachGoodAts = huihomeInterFace('get', '/coach/goodAts');
export const appointDutyTime = huihomeInterFace('post', '/coach/dutyTimeAppoint', {
	loading: '正在预约',
	errBox: '预约失败'
});
export const dutyTimeCancelAppoint = huihomeInterFace('post', '/coach/dutyTimeCancelAppoint', {
	loading: '正在执行',
	errBox: '取消失败'
});
export const buyPackWx = huihomeInterFace('post', '/userPack/buyPackWx', {
	loading: '正在下单'
});
export const assessAppoint = huihomeInterFace('post', '/appoint/assessAppoint');
export const lastUnAssessAppoint = huihomeInterFace('get', '/appoint/lastUnAssessAppoint');
/**
 * 小班课
 * 小班课
 */
export const getCoursePersonalOne = huihomeInterFace('get', '/course/getOnePersonal');
export const signCoursePersonal = huihomeInterFace('post', '/coursePersonal/sign', {
	loading: '正在进行签约'
});
/**
 * 门店相关
 */
export const getCanChangeToCorps = huihomeInterFace('get', '/user/getCanChangeToCorps', {
	loading: '正在获取列表'
});
export const changeCorpByCode = huihomeInterFace('get', '/user/changeCorpByCode', {
	loading: '正在前往门店'
});
/**
 * 消息相关
 */
export const WXMPMessageTempIds = huihomeInterFace('get', '/message/WXMPMessageTempIds', {
	loading: '正在获取信息'
});

/**
 * 宣传相关
 */
export const getPropagandaList = huihomeInterFace('get', '/propaganda/list');

/**
 * 服务页
 */
export const getShareWXMPQr = huihomeInterFace('get', '/share/getWxmpQr', {
	loading: '正在获取小程序码'
});
export const scanQR = huihomeInterFace('get', '/user/scanQR', {
	loading: '获取信息中'
});
export const openFileDownload = config.host.addrJ + '/tools/downloadOpenFile'
