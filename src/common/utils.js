import * as NIJ from './networkInterfaceJ';
import * as cfg from './_config'
import * as MIXINS from '../common/mixin.js';
import * as md5_js from './lib/md5/md5'
import * as mqtt from 'mqtt/dist/mqtt'

// 改变client
// #ifdef H5
let preStr = "wss://";
// #endif
// #ifdef MP-WEIXIN||APP-PLUS
let preStr = "wxs://";
// #endif
import {
	host,
	clit_token
} from './config.js';
import * as theme from '../config/style'

export const getColors = function() {
	return {
		main: theme.colorMain,
		main1: theme.colorMain1
	}
}

export const previewImage = function(img) {
	let imgs = []
	if (typeof(img) === 'string') {
		imgs.push(img)
	}
	uni.previewImage({
		urls: imgs
	});
}

export const getClitToken = function() {
	return uni.getStorageSync(clit_token) || null
}
export const setClitToken = function(token) {
	uni.setStorageSync(clit_token, token)
}
export const removeClitToken = function() {
	uni.removeStorageSync(clit_token)
}
export const timeoutDo = (time = 0) => {
	return new Promise((resolve) =>
		setTimeout(function() {
			resolve()
		}, time)
	)
}

export const md5 = md5_js

export const getCC = function(that, newCC) {
	if (cfg.ALONE) {
		return cfg.CC
	}
	return null
}
export const getMPM = function(that) {
	if (cfg.MPM) {
		return cfg.MPM
	}
	return null
}

export const getToday = function() {
	return dateFormat(new Date(), "yyyy-MM-dd")
}
export const getChineseCharacterLength = function(str) {
	var reg = /[\u4e00-\u9fa5]+/g;
	let lang = 0
	for (let i = 0; i < str.length; i++) {
		if (str[i].match(reg) === null) {
			lang += 0.5
		} else {
			lang++
		}
	}
	return lang
}

export const timeago = function(datetime) {
	let dateTimeStamp = new Date(datetime.replace(/ /, 'T')).getTime()
	let minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
	let hour = minute * 60;
	let day = hour * 24;
	let week = day * 7;
	let halfamonth = day * 15;
	let month = day * 30;
	let now = new Date().getTime(); //获取当前时间毫秒
	let diffValue = now - dateTimeStamp; //时间差

	if (diffValue < 0) {
		diffValue = -diffValue
		let minC = diffValue / minute; //计算时间差的分，时，天，周，月
		let hourC = diffValue / hour;
		let dayC = diffValue / day;
		let weekC = diffValue / week;
		let monthC = diffValue / month;
		let result = "2";
		if (monthC >= 1 && monthC <= 3) {
			result = " " + parseInt(monthC) + "月后"
		} else if (weekC >= 1 && weekC <= 3) {
			result = " " + parseInt(weekC) + "周后"
		} else if (dayC >= 1 && dayC <= 6) {
			result = " " + parseInt(dayC) + "天后"
		} else if (hourC >= 1 && hourC <= 23) {
			result = " " + parseInt(hourC) + "小时后"
		} else if (minC >= 1 && minC <= 59) {
			result = " " + parseInt(minC) + "分钟后"
		} else if (diffValue >= 0 && diffValue <= minute) {
			result = "刚刚"
		} else {
			let datetime = new Date();
			datetime.setTime(dateTimeStamp);
			let Nyear = datetime.getFullYear(); {}
			let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
			let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
			let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
			let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
			let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
			result = Nyear + "-" + Nmonth + "-" + Ndate
		}
		return result;
		// return '刚刚';
	}
	let minC = diffValue / minute; //计算时间差的分，时，天，周，月
	let hourC = diffValue / hour;
	let dayC = diffValue / day;
	let weekC = diffValue / week;
	let monthC = diffValue / month;
	let result = "2";
	if (monthC >= 1 && monthC <= 3) {
		result = " " + parseInt(monthC) + "月前"
	} else if (weekC >= 1 && weekC <= 3) {
		result = " " + parseInt(weekC) + "周前"
	} else if (dayC >= 1 && dayC <= 6) {
		result = " " + parseInt(dayC) + "天前"
	} else if (hourC >= 1 && hourC <= 23) {
		result = " " + parseInt(hourC) + "小时前"
	} else if (minC >= 1 && minC <= 59) {
		result = " " + parseInt(minC) + "分钟前"
	} else if (diffValue >= 0 && diffValue <= minute) {
		result = "刚刚"
	} else {
		let datetime = new Date();
		datetime.setTime(dateTimeStamp);
		let Nyear = datetime.getFullYear(); {}
		let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
		let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
		let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
		let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
		let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
		result = Nyear + "-" + Nmonth + "-" + Ndate
	}
	return result;
}
export const weekStr = function(date, str = "周") {
	try {
		let d = new Date(date.replace(/ /, 'T'));
		switch (d.getDay()) {
			case 0:
				return str + '日'
			case 1:
				return str + '一'
			case 2:
				return str + '二'
			case 3:
				return str + '三'
			case 4:
				return str + '四'
			case 5:
				return str + '五'
			case 6:
				return str + '六'
		}
	} catch (e) {
		return ''
	}
}
export const uploadFile = (path) =>
	new Promise((resolve, reject) => {
		uni.uploadFile({
			url: host.addrJ + `/tools/uploadImage`,
			filePath: path,
			header: {
				'ST-Token': getClitToken()
			},
			name: 'file',
			formData: {},
			// success: (res) => resolve(res),
			success: function(res) {
				if (res.statusCode !== 200) {
					reject(res)
					return
				}
				const data = JSON.parse(res.data)
				if (data.code !== 0) {
					reject(res)
					return
				}
				resolve(data)
			},
			fail: (err) => reject(err)
		});
	});
export const pageIsTabBar = function() {
	const thisPage = uni.$u.page();
	const tabBarPage = [
		'/pages/hall/index',
		'/pages/sites/index',
	]
	return tabBarPage.indexOf(thisPage) >= 0
}
export const downloadURL = function(fileName) {
	const url = `${NIJ.openFileDownload}?fileName=${fileName}`
	uni.showModal({
		title: '下载文件',
		content: '文件已经准备好了,点击确定复制链接到任意浏览器中即可下载',
		confirmText: '复制链接',
		success: function(res) {
			if (res.confirm) {
				uni.setClipboardData({
					data: url,
					success: function() {
						showToast('已复制', 'success')
					}
				});
			}
		}
	})
}
export const connectMqtt = function(uid) {
	let globalData = getApp().globalData;
	if (!globalData.loginStatus || globalData.mqttStatus) {
		return
	}
	// mqtt连接选项
	const MQTT_ClientId = `FrontUser_${uuid()}`;
	const MQTT_USERNAME = uuid();
	const MQTT_PASSWORD = md5.md5(md5.md5(MQTT_ClientId) + md5.md5(MQTT_USERNAME) + md5.md5(MQTT_ClientId))
		.toUpperCase()


	const options = {
		connectTimeout: 4000, // 超时时间
		keepalive: 30, // 超时时间
		// 认证信息 按自己需求填写
		clientId: MQTT_ClientId,
		clean: true,
		username: MQTT_USERNAME,
		password: MQTT_PASSWORD,
	}
	let client = null
	try {
		// #if H5
		preStr = `${host.wssType || 'ws'}://`
		// #endif
		client = mqtt.connect(preStr + host.wss, options)
	} catch (e) {
		console.log(e);
	}

	if (client == null) {
		return;
	}
	globalData.mqttCustomer = client
	client.on('reconnect', (error) => {
		console.log('正在重连:', error)
	})
	client.on('error', (error) => {
		console.log('连接失败:', error)
	})
	// 断开
	client.on('end', () => {
		console.log('end')
	});
	// 掉线
	client.on('offline', (msg) => {
		console.log('offline', msg)
	});
	client.on('connect', (e) => {
		console.log('成功连接mqtt服务器')
		globalData.mqttStatus = true
		//订阅一个主题
		client.subscribe(`front.user.${uid}`, {
			qos: 0
		}, function(err) {
			if (!err) {}
		})
	})
	client.on('message', function(topic, message, packet) {
		// message is Buffer
		const mess = JSON.parse(packet.payload.toString())
		console.log(mess);
		uni.$emit(`mqtt.${mess.type}`, mess)
	})
}
/**
 * 生成uuid
 */
export const uuid = function() {
	let s = [];
	let hexDigits = "0123456789abcdef";
	for (let i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";
	let uuid = s.join("").replace("-", "");
	return uuid
}

/**
 *errbox
 */
export const message = {
	err(err, title) {
		const msg = {
			title: '错误',
			message: err
		}
		if (title) {
			msg.title = title
		}
		uni.showModal({
			title: msg.title,
			content: msg.message,
			showCancel: false
		})
		// uni.$emit('errBox', msg)
	},
	routerBox(routerConfig, data, msg) {
		uni.$emit('routerBox', {
			config: routerConfig,
			data: data,
			msg: msg
		})
	}
}
/**
 * 预约前准备
 */
export const beforeAppoint = function() {
	return new Promise((resolve, reject) =>
		NIJ.WXMPMessageTempIds({
			type: 'beforeAppoint'
		}).then(res => {
			console.log(res);
			if (res.total <= 0) {
				//不需要订阅消息
				resolve()
			} else {
				//需要订阅消息
				// #ifdef MP-WEIXIN
				// uni.requestSubscribeMessage({
				//     tmplIds:res.data
				// })
				uni.requestSubscribeMessage({
					tmplIds: res.data,
					success: function(back) {
						//需要订阅全部消息
						console.log(back);
						reject()
					},
					fail: function(err) {
						reject()
					}
				})
				// #endif
				// #ifdef H5
				resolve()
				// #endif
			}
		})
	);
}

export const isIos = () => {
	try {
		if (getApp().globalData.sysInfo.system.toLowerCase().indexOf('ios') !== -1) {
			return true;
		}
	} catch (e) {
		return false;
	}

	return false;
};
export const checkMobiles = function(theForm) {
	return /^1[3-9][0-9]{9}$/.test(theForm);
};
export const dateFormat = function(time, format) {
	var t = new Date(time);
	var reg = /yyyy|MM|dd|HH|mm|ss/g;

	var tf = function(i) {
		return (i < 10 ? '0' : '') + i;
	};

	return format.replace(reg, function(a) {
		switch (a) {
			case 'yyyy':
				return tf(t.getFullYear());

			case 'MM':
				return tf(t.getMonth() + 1);

			case 'mm':
				return tf(t.getMinutes());

			case 'dd':
				return tf(t.getDate());

			case 'HH':
				return tf(t.getHours());

			case 'ss':
				return tf(t.getSeconds());
		}
	});
};
export const getPxRpxScale = function() {
	return getApp().globalData.pxRpxExchangeRate
}
export const getStatusBarHeight = () => {
	let glbData = getApp().globalData; //* glbData.sysInfo.pixelRatio
	if (isIos()) {
		return (glbData.sysInfo.statusBarHeight + 4) * glbData.pxRpxExchangeRate;
	}
	return (glbData.sysInfo.statusBarHeight + 10) * glbData.pxRpxExchangeRate;
};
export const showToast = (title, icon = 'none', duration = 1500) =>
	new Promise((resolve, reject) =>
		uni.showToast({
			title,
			icon,
			duration,
			success: (res) => resolve(res),
			fail: (err) => reject(err)
		})
	);



//wx.login Promise化
export const login = function() {
	//注册绘装流程
	// #ifdef MP-WEIXIN
	return new Promise((resolve, reject) =>
		uni.login({
			success: (e) => resolve(e),
			fail: (e) => reject(e)
		})
	);
	// #endif
	// #ifdef H5
	return new Promise((resolve, reject) => {
		resolve({
			code: 'code'
		})
	});
	// #endif
}

export const setLoggedIn = function(loggedIn) {
	getApp().globalData.loggedIn = loggedIn
}
export const isLoggedIn = function() {
	return getApp().globalData.loggedIn
}

export const loginSuccess = function(res) {
	return new Promise((resolve) => {
		let app = getApp();
		setClitToken(res.data.loginToken)
		app.globalData.loginStatus = true
		connectMqtt(res.data.uid)
		uni.$emit('loginSuccess')
		resolve()
	})
}

export const getLoginData = (option) => new Promise((resolve, reject) => {
	if (!option) {
		option = {}
	}
	login().then((res) => {
			//#ifdef MP-WEIXIN
			return NIJ.loginByCode({
				code: res.code
			});
			//#endif
		})
		.then((res) => {
			resolve(res);
		})
		.catch((err) => {
			reject(err.data);
		});
});
export const getCoachData = (option) => new Promise((resolve, reject) => {
	if (!option) {
		option = {}
	}
	login().then((res) => {
			//#ifdef MP-WEIXIN
			return NIJ.getcoach({
				code: res.code
			});
			//#endif
		})
		.then((res) => {
			resolve(res);
		})
		.catch((err) => {
			reject(err.data);
		});
});

export const pullPay = function(orderData) {
	return new Promise((resolve, reject) => {
		// Object object
		// 属性 类型 默认值 必填 说明
		// timeStamp string 是 时间戳， 从 1970 年 1 月 1 日 00: 00: 00 至今的秒数， 即当前的时间
		// nonceStr string 是 随机字符串， 长度为32个字符以下
		// package string 是 统一下单接口返回的 prepay_id 参数值， 提交格式如： prepay_id = ** *
		// signType string MD5 否 签名算法
		// paySign string 是 签名， 具体签名方案参见 小程序支付接口文档
		// success
		// function 否 接口调用成功的回调函数
		// fail
		// function 否 接口调用失败的回调函数
		// complete
		// function 否 接口调用结束的回调函数（ 调用成功、 失败都会执行）
		// object.signType 的合法值
		// 值 说明 最低版本
		// MD5 MD5
		// HMAC - SHA256 HMAC - SHA256
		uni.requestPayment({
			timeStamp: orderData.timeStamp,
			nonceStr: orderData.nonceStr,
			package: orderData.package,
			paySign: orderData.paySign,
			signType: orderData.signType,
			success: (res) => {
				showToast('支付成功');
				resolve()
			},
			fail: (err) => {
				if (err.errMsg === 'requestPayment:fail cancel') {
					showToast('取消支付');
					reject("取消支付")
					return
				}
				reject("支付失败")
			}
		});
	});
}
//设置rpx与px的比率

export const setPxRpxExchangeRate = function(app) {
	let res = uni.getSystemInfoSync();
	app.globalData.sysInfo = res;
	let pxRpxExchangeRate;
	if (app.globalData.sysInfo.model === "PC") {
		pxRpxExchangeRate = roundFun(750 / parseInt(res.windowWidth), 3);
	} else {
		pxRpxExchangeRate = roundFun(750 / parseInt(res.screenWidth), 3);
	}
	app.globalData.pxRpxExchangeRate = pxRpxExchangeRate

	app.globalData.bar.statusBar = res.statusBarHeight
	app.globalData.bar.windowHeight = (res.windowHeight - (res.safeArea.bottom - res.safeArea.height)) *
		pxRpxExchangeRate


	// #ifndef H5
	app.globalData.bar.statusBar = 0
	app.globalData.bar.customBar = 0
	// #endif
	// #ifdef H5
	app.globalData.bar.statusBar = 80
	app.globalData.bar.customBar = (res.safeArea.top * pxRpxExchangeRate) + 80
	// #endif


	// #ifdef MP-WEIXIN
	let custom = wx.getMenuButtonBoundingClientRect()
	// console.log(custom);
	app.globalData.bar.customBar = (custom.height + custom.top) + res.statusBarHeight * 2
	// that.globalData.customBar = (custom.top-e.statusBarHeight)*2+custom.height
	// that.globalData.bar.customBar = e.statusBarHeight + 30
	// #endif

	// #ifdef MP-ALIPAY
	app.globalData.bar.customBar = res.statusBarHeight + res.titleBarHeight
	// #endif


}; //保留n位小数

export const roundFun = (value, n) => Math.round(value * Math.pow(10, n)) / Math.pow(10,
n); // export const handleSceneString = function (scene) {

function mixinHandle(source) {
	if (!source || !source.mixins) {
		return source;
	}

	let target = Object.assign({}, source);
	source.mixins.forEach((i) => {
		let mixinModule;

		try {
			mixinModule = MIXINS[i];
		} catch (e) {
			throw new Error('minxin error');
		}

		for (const key in mixinModule) {
			if (mixinModule.hasOwnProperty(key)) {
				const element = mixinModule[key];

				if (key !== 'data') {
					if (target[key]) {
						throw new Error('minxin error');
					}

					target[key] = element;
				}
			}
		}

		target.data = Object.assign({}, target.data, mixinModule.data);
	});
	return target;
}

export const CustomPageInitialize = function(obj) {
	let statusBarHeight = getStatusBarHeight();
	obj.data.customUniversalData = {
		statusBarHeight,
		isIos: isIos(),
		univerSalHeadHeight: statusBarHeight + 80
	};
	return mixinHandle(obj);
};
export const getCalendar = function() {
	let day = 1000 * 60 * 60 * 24;
	let now = Date.now();
	let calendar = [];

	for (let i = 0; i < 7; i++) {
		let timeStamp = now + i * day;
		let tmp = new Date(timeStamp);
		calendar.push({
			timeStamp,
			startDate: dateFormat(timeStamp, 'yyyy-MM-dd'),
			date: tmp.getDate(),
			day: tmp.getDay()
		});
	}

	return calendar;
};