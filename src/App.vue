<script>
import * as utils from "common/utils";

export default {
  globalData: {
    showPopupInfo: null,
    loginStatus: false,
    loggedIn: false,
    mqttStatus: false,
    mqttCustomer: null,
    sysInfo: null,
    pxRpxExchangeRate: null,
    userInfo: null,
    unClicked: true,
    customBar: 0,
    statusBar: 0,
    bar: {
      customBar: 0,
      statusBar: 0,
      windowHeight: 0,
    },
    ignoreReClick(fn) {
      const self = this;
      if (self.unClicked) {
        self.unClicked = false;

        if (fn) {
          fn();
        }

        setTimeout(() => {
          self.unClicked = true;
        }, 300);
      } else {
        console.log("短时间内重复点击");
      }
    },
  },
  onLaunch: function (options) {
    console.log(options);
    uni.hideTabBar();
    utils.setPxRpxExchangeRate.call(null, this);
    setTimeout(() => {
      //#ifdef MP-WEIXIN
      // utils.getCoachData().then(res => {
      // 	utils.loginSuccess(res).then(res => {
      // 		this.$v_router.goHome()
      // 	})
      // }).catch(_ => {
      // 	const routerConfig = this.$config.BREAK_ERR_ROUTER.needRegister
      // 	this.$utils.message.routerBox(routerConfig)
      // 	utils.setLoggedIn(true)
      // })
      //#endif
    }, 0);
  },
  onShow: function () {
    // console.log('App Show')
  },
  onHide: function () {
    // console.log('App Hide')
  },
};
</script>

<style lang="scss">
@import "./app.scss";
@import "./uview-ui/index.scss";
@import "@/style/common.scss";

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
@font-face {
  font-family: D-DIN;
  src: url("~@/static/static/DIN-Regular-2.otf");
}
</style>
