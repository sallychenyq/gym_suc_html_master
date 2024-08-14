<script>
export default {
  name: "app-radio-mark",
  props:{
    selected:Boolean,
    size:{
      type:String,
      default:'40rpx'
    },
  },
  created() {

  }
}
</script>

<template>
  <view class="app-radio-box">
    <view v-if="selected" class="selected-status">
      <u-icon size="20rpx" name="checkmark" color="#FFC98A"></u-icon>
    </view>
    <view v-else class="no-selected-status">
      <u-icon size="20rpx" name="checkmark" color="#FFFFFF"></u-icon>
    </view>
  </view>
</template>

<style scoped lang="scss">
.app-radio-box{
  //position: relative;
  //height: 0;
  //width: 0;
  .selected-status{
    width: 40rpx;
    height: 40rpx;
    //margin: -1px;
    padding: 10rpx 10rpx;
    text-align: center;
    background-color: #181818;
    border-radius: 0 10px 0 10px;

    position: absolute;
    top:-2px;
    right: -2px;
  }
  .no-selected-status{
    width: 40rpx;
    height: 40rpx;
    //margin: -1px;
    padding: 10rpx 10rpx;
    text-align: center;
    background-color: #D8D8D8;
    border-radius: 0 10px 0 10px;

    position: absolute;
    top:-2px;
    right: -2px;
  }
}
</style>
