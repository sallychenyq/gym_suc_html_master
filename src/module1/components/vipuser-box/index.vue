<script>
import UPopup from "@/uview-ui/components/u-popup/u-popup.vue";

export default {
  name: "vipuser-box",
  components: {UPopup},
  data(){
    return{
      needSignBox:false,
      inited:false
    }
  },
  methods:{
    checkNeedSignAgreement(){
      if (this.inited){
        return
      }
      this.inited = true
      setTimeout(()=>{
        this.$api.checkNeedSignAgreement().then(res => {
          if (!res.data){
            return
          }
          this.needSignBox = true
          setTimeout(()=>{
            // 强制将首页切换到home
            this.$v_router.pushTab('/pages/home/index')
          },1000)
        })
      },1)
    }
  }
}
</script>

<template>
  <view>
<!--    提示会员卡用户签署协议-->
    <u-popup :show="needSignBox" mode="bottom" round="10">
      <view class="sign-box">
        <view class="title">提示/Tip For User</view>
        <view class="content">您是会员卡用户，请先签署协议，否则无法使用相关功能</view>
        <view class="content">You are a member card user, please sign the agreement first, otherwise you won't be able to use the related functions.</view>
        <view class="btn-box">
          <button class="button" @click="$v_router.push('/pages/hotel/sign-vip-agreement')">去签署/Go Sign</button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<style scoped lang="scss">
.sign-box{
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  .title{
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
  .content{
    font-size: 14px;
    color: #666;
    line-height: 20px;
  }
  .btn-box{
    padding-top: 20px;
  }
  .button{
    width: 100%;
    height: 80rpx;
    background-color: $winhouse-main-color;
    color: #fff;
    font-size: 16px;
    line-height: 80rpx;
    border-radius: 10px;
  }
}
</style>
