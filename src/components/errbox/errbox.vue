<template>
  <view>
    <u-modal :show="errMessageBox.open" :title="errMessageBox.title" :content="errMessageBox.content"
             confirmButtonShape="circle" @confirm="closeBox('errBox')" :safeAreaInsetBottom="false">
      <u-button
          slot="confirmButton"
          text="我知道了"
          type="primary"
          shape="circle"
          @click="errBoxConfirm()"
      ></u-button>
    </u-modal>
    <u-popup mode="center" :round="10" :closeable="true" :show="okBox.open" @close="closeOkBox" :safeAreaInsetBottom="false">
      <view class="error-msg-box flex-col">
        <view class="error-msg-box-main flex-col">
          <text class="error-msg-box-text">{{ okBox.content }}</text>
          <view class="error-msg-box-buttons flex-row justify-between">
            <button class="error-msg-box-button-close flex-col" @click="closeOkBox">
              <text class="error-msg-box-button-close-text">不了</text>
            </button>
            <button class="error-msg-box-button-ok flex-col" @click="okBoxConfirm">
              <text class="error-msg-box-button-ok-text">{{ okBox.okButton }}</text>
            </button>
          </view>
        </view>
      </view>
    </u-popup>
    <u-popup mode="center" :round="10" :closeable="true" :show="inputBox.open" @close="inputClose" :safeAreaInsetBottom="false">
      <view class="error-msg-box flex-col">
        <view class="error-msg-box-main flex-col">
          <text class="error-msg-box-text">{{ inputBox.content }}</text>
          <u-input
              border="surround"
              type="number"
              v-model="inputBox.value"
          ></u-input>
          <view class="error-msg-box-buttons flex-row justify-between">
            <button class="error-msg-box-button-close flex-col" @click="inputClose">
              <text class="error-msg-box-button-close-text">取消</text>
            </button>
            <button class="error-msg-box-button-ok flex-col" @click="inputSuccess">
              <text class="error-msg-box-button-ok-text">{{ inputBox.okButton }}</text>
            </button>
          </view>
        </view>
      </view>
    </u-popup>
    <u-popup mode="center" :round="10" :closeable="true" :show="routeMessageBox.open" @close="closeBox('routerBox')" :safeAreaInsetBottom="false">
      <view class="error-msg-box flex-col">
        <view class="error-msg-box-main flex-col">
          <text class="error-msg-box-text">{{ routeMessageBox.content }}</text>
          <view class="error-msg-box-buttons flex-row justify-between">
            <button class="error-msg-box-button-close flex-col" @click="closeBox('routerBox')">
              <text class="error-msg-box-button-close-text">{{ routeMessageBox.closeButton }}</text>
            </button>
            <button class="error-msg-box-button-ok flex-col" @click="goRouter">
              <text class="error-msg-box-button-ok-text">{{ routeMessageBox.button }}</text>
            </button>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import UCodeInput from "../../uview-ui/components/u-code-input/u-code-input";
import UButton from "../../uview-ui/components/u-button/u-button";
import UModal from "../../uview-ui/components/u-modal/u-modal";
import UText from "../../uview-ui/components/u-text/u-text";
import UPopup from "../../uview-ui/components/u-popup/u-popup";
import UInput from "../../uview-ui/components/u--input/u--input";
export default {
  name: "errbox",
  components: {UInput, UPopup, UText, UModal, UButton, UCodeInput},
  props:{
    listenErr:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      okBox:{
        open: false,
        title: null,
        okButton: null,
        content: null,
        success:null
      },
      inputBox:{
        open: false,
        title: null,
        okButton: null,
        content: null,
        value: null,
        success:null
      },
      errMessageBox: {
        open: false,
        title: null,
        content: null
      },
      routeMessageBox: {
        open: false,
        title: null,
        content: null,
        button: null,
        closeButton: null,
        route: ''
      },
      confirmBox: {}
    };
  },
  created() {
    const that = this
    if (this.listenErr){
      uni.$on('routerBox', function (res) {
        // this.$utils.showTab(false)
        const routerConfig = res.config
        let data = res.data
        let route = routerConfig.route
        const msg = res.msg
        if (!data) {
          data = {};
        }
        let params = "?"
        for (const key in data) {
          params += `${key}=${data[key]}`
        }
        route += params
        that.routeMessageBox = {
          open: true,
          content: msg ? msg : routerConfig.msg,
          button: routerConfig.button,
          closeButton: routerConfig.closeButton || '取消',
          route: route
        }
      })
    }


    uni.$on('routerBox.close', function () {
      // this.$utils.showTab(true)
      that.routeMessageBox.open = false
    })

  },
  methods: {
    prompt(obj){
      if (!obj){
        throw 'open Error:Not enough parameters'
      }
      this.inputBox={
        open: true,
        title: obj.title || '提示',
        okButton:obj.okButton || '确认',
        content: obj.content || '请输入以下内容',
        success: obj.success || function (value) {
          console.log(value);
        }
      }
    },
    inputSuccess(){
      this.inputBox.open=false
      this.inputBox.success(this.inputBox.value)
    },
    inputClose(){
      this.inputBox.open=false
    },
    confirm(obj){
      if (!obj){
        this.okBox={
          open: true,
          title: '提示',
          okButton: '确认',
          content: '确认执行此操作吗?',
          success: this.closeOkBox
        }
        return
      }
      this.okBox={
        open: true,
        title: obj.title || '提示',
        okButton:obj.okButton || '确认',
        content: obj.content || '确认执行此操作吗?',
        success: obj.success || this.closeOkBox
      }
    },
    closeOkBox(){
      this.okBox.open=false
    },
    okBoxConfirm(){
      this.closeOkBox()
      this.okBox.success()
    },
    errBoxConfirm(){
      this.closeBox('errBox')
      this.$emit('errBoxConfirm')
    },
    closeBox(boxName) {
      uni.$emit(`${boxName}.close`)
    },
    goRouter() {
      this.closeBox('routerBox')
      this.$v_router.push(this.routeMessageBox.route)
    }
  }
}
</script>

<style lang="scss">

.error-msg-box {
  //background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  //height: 440rpx;
  width: 640rpx;
  padding: 30rpx 0 0 46rpx;

  .error-msg-box-main {
    width: 564rpx;
    //height: 350rpx;

    .error-msg-box-text {
      width: 491rpx;
      //height: 350rpx;
      overflow-wrap: break-word;
      color: rgba(51, 51, 51, 1);
      font-size: 31rpx;
      text-align: justifyLeft;
      line-height: 44rpx;
      overflow: hidden;
      //text-overflow: ellipsis;
      display: block;
      margin: 21rpx 0 21rpx 33rpx;
    }

    .error-msg-box-buttons {
      width: 550rpx;
      height: 88rpx;
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      //padding-top: 40rpx;

      .error-msg-box-button-close {
        background-color: $winhouse-main-color-1;
        border-radius: 44px;
        height: 88rpx;
        width: 260rpx;
        padding-top: 32rpx;
        //padding: 32rpx 0 0 106rpx;
        .error-msg-box-button-close-text {
          width: 260rpx;
          height: 25rpx;
          overflow-wrap: break-word;
          color: $winhouse-main-color;
          font-size: 26rpx;
          text-align: center;
          white-space: nowrap;
          line-height: 26rpx;
          display: block;
        }
      }

      .error-msg-box-button-ok {
        background-color: $winhouse-main-color;
        border-radius: 44px;
        height: 88rpx;
        width: 260rpx;
        padding-top: 32rpx;
        //padding: 32rpx 0 0 106rpx;
        .error-msg-box-button-ok-text {
          width: 260rpx;
          height: 25rpx;
          overflow-wrap: break-word;
          color: rgba(255, 255, 255, 1);
          font-size: 26rpx;
          text-align: center;
          white-space: nowrap;
          line-height: 26rpx;
          display: block;
        }
      }
      .error-msg-box-button-ok-max {
        background-color: $winhouse-main-color;
        border-radius: 44px;
        height: 88rpx;
        width: 540rpx;
        padding-top: 32rpx;
        //padding: 32rpx 0 0 106rpx;
        .error-msg-box-button-ok-max-text {
          //width: 260rpx;
          height: 25rpx;
          overflow-wrap: break-word;
          color: rgba(255, 255, 255, 1);
          font-size: 26rpx;
          text-align: center;
          white-space: nowrap;
          line-height: 26rpx;
          display: block;
        }
      }
    }
  }
}
</style>
