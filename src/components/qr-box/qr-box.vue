<template>
	<view>
    <u-popup :show="qrBox.open" mode="center" round="10" :closeable="true" @close="closeBox">
      <view class="qr-box flex-col">
        <view class="qr flex-row">
          <view class="qr-1 flex-col">
            <image
                class="qr-img"
                referrerpolicy="no-referrer"
                :src="qrData.img"
            />
          </view>
        </view>
        <view class="reload-button-box flex-row">
          <button class="reload-button flex-col" @click="loadCheckQr">
            <text class="reload-button-text">刷新</text>
          </button>
          <button class="scan-button flex-col" @click="scanQr">
            <text class="reload-button-text">扫描</text>
          </button>
        </view>
        <view class="qr-tips flex-row">
          <text class="qr-tip-text">请靠近刷码器</text>
        </view>
        <view class="qr-message-box flex-row">
          <view class="qr-message">
            <text class="qr-message-span">30</text>
            <text class="qr-message-span2">秒内有效</text>
          </view>
        </view>
      </view>
    </u-popup>
    <u-modal
        :show="messageBox.open"
        :title="messageBox.title"
        :showCancelButton="true"
        :closeOnClickOverlay="true"
        @close="messageBox.open=false">
      <u-button
          slot="confirmButton"
          text="确认"
          type="primary"
          shape="circle"
          @click="messageBox.open=false"
      ></u-button>
      <view class="slot-content">
        <u-text lineHeight="50rpx" :text="messageBox.message"></u-text>
      </view>
    </u-modal>
	</view>
</template>

<script>

  import UPopup from "../../uview-ui/components/u-popup/u-popup.vue";
  import UModal from "../../uview-ui/components/u-modal/u-modal.vue";
  import UText from "../../uview-ui/components/u-text/u-text.vue";
  import UButton from "../../uview-ui/components/u-button/u-button.vue";

  export default {
		name:"qr-box",
    components: {UButton, UText, UModal, UPopup},
		data() {
			return {
        qrBox:{
          open:false
        },
        qrData:{
          img:''
        },
        messageBox:{
          open:false,
          title:'',
          message:''
        },
        loading:false,
        timeout:'',
        autoReload:null
			};
		},
    created() {
      const that=this
      uni.$on(`mqtt.checkResult`,function (res) {
        that.closeBox()
        uni.vibrateLong()
        if (res.data.code===that.$cfg.interfaceSuccessCode){
            uni.showModal({
                title:'验证通过',
                content:'门已为您打开,请通过',
                showCancel:false
            })
        }else {
            uni.showModal({
                title:'刷码失败',
                content:res.data.msg,
                showCancel:false
            })
        }
      })
    },
    methods:{
      scanQr(){
          const that = this
        uni.scanCode({
          onlyFromCamera:true,
          scanType:'qrCode',
          hideAlbum:true,
          success:function (res) {
              uni.vibrateShort()
              console.log(res);
              console.log(res.result);
              if (res.errMsg!=='scanCode:ok'){
                  return
              }
              try {
                  const QR = JSON.parse(JSON.parse("\""+res.result+"\""))
                  // const QR = JSON.parse("\""+res.result+"\"")
                  console.log(QR);
                  that.$api.scanQR({
                      data:QR.data,
                      type:QR.type
                  }).then(res => {
                      uni.vibrateShort()
                      uni.showModal({
                          title:'扫码成功',
                          content:res.data,
                          showCancel:false
                      })
                  }).catch(e=>{
                      uni.vibrateLong()
                      uni.showModal({
                          title:'扫码失败',
                          content:e.data.msg,
                          showCancel:false
                      })
                  })
              }catch (e) {
                  console.log(e);
              }
          }
        })
      },
      closeBox(){
        this.qrBox.open=false
        this.closeAutoReload()
      },
      closeAutoReload(){
        if (this.autoReload){
          clearInterval(this.autoReload)
          this.autoReload=null
        }
      },
      startAutoReload(){
        if (!this.autoReload){
          this.autoReload=setInterval(()=>{
            this.loadCheckQr()
          },8*1000)
        }
      },
      loadCheckQr(){
        if (this.loading){
          return
        }
        this.loading=true
        this.$api.userVipCard().then(res=>{
          this.qrData.img='data:image/jpg;base64,' + res.data.code
          this.qrBox.open=true
          this.loading=false
          this.timeout=this.$utils.dateFormat(res.data.timeOut,"mm分ss秒")
          this.startAutoReload()
        }).catch(reason => {
          this.loading=false
          this.closeAutoReload()
        })
      }
    }
	}
</script>

<style lang="scss">
.qr-box {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  height: 827rpx;
  width: 640rpx;
  .qr {
    width: 360rpx;
    height: 360rpx;
    margin: 191rpx 0 0 140rpx;
    .qr-1 {
      height: 360rpx;
      padding-left: 1rpx;
      width: 360rpx;
      .qr-img {
        width: 359rpx;
        height: 360rpx;
      }
    }
  }
  .reload-button-box {
    width: 320rpx;
    height: 88rpx;
    margin: 108rpx 0 0 160rpx;
    .reload-button {
      background-color: $winhouse-main-color;
      //border-radius: 44px;
      border-radius: 44px 0 0 44px;
      height: 88rpx;
      width: 320rpx;
      //padding: 32rpx 0 0 136rpx;
      .reload-button-text {
        //width: 49rpx;
        //height: 25rpx;
        overflow-wrap: break-word;
        color: rgba(255, 255, 255, 1);
        font-size: 26rpx;
        text-align: center;
        white-space: nowrap;
        line-height: 88rpx;
        display: block;
      }
    }
    .scan-button {
      background-color: $winhouse-main-color-1;
      border-radius: 0 44px 44px 0;
      height: 88rpx;
      width: 320rpx;
      //padding: 32rpx 0 0 136rpx;
      .reload-button-text {
        //width: 49rpx;
        //height: 25rpx;
        overflow-wrap: break-word;
        color: $winhouse-main-color;
        font-size: 26rpx;
        text-align: center;
        white-space: nowrap;
        line-height: 88rpx;
        display: block;
      }
    }

  }
  .qr-tips {
    width: 250rpx;
    height: 40rpx;
    margin: -636rpx 0 0 195rpx;
    .qr-tip-text {
      width: 250rpx;
      height: 40rpx;
      overflow-wrap: break-word;
      color: rgba(51, 51, 51, 1);
      font-size: 42rpx;
      font-family: PingFangSC-Medium;
      text-align: justifyLeft;
      white-space: nowrap;
      line-height: 42rpx;
      display: block;
    }
  }
  .qr-message-box {
    width: 143rpx;
    height: 26rpx;
    margin: 432rpx 0 0 248rpx;
    .qr-message {
      width: 143rpx;
      height: 26rpx;
      overflow-wrap: break-word;
      font-size: 0;
      text-align: justifyLeft;
      white-space: nowrap;
      line-height: 28rpx;
      .qr-message-span {
        width: 143rpx;
        height: 26rpx;
        overflow-wrap: break-word;
        color: rgba(102, 102, 102, 1);
        font-size: 28rpx;
        text-align: left;
        white-space: nowrap;
        line-height: 28rpx;
      }
      .qr-message-span2 {
        width: 143rpx;
        height: 26rpx;
        overflow-wrap: break-word;
        color: rgba(153, 153, 153, 1);
        font-size: 28rpx;
        text-align: left;
        white-space: nowrap;
        line-height: 28rpx;
      }
    }
  }
  .mod5 {
    width: 70rpx;
    height: 70rpx;
    margin: -579rpx 0 727rpx 540rpx;
    .img2 {
      width: 70rpx;
      height: 70rpx;
    }
  }
}
</style>
