<template>
  <view class="coach1v1-head">
    <image class="avatar" mode="aspectFill" :src="item.avatar" @click="toCoachHome"/>
    <view class="title pfb">{{ item.realName }}/{{ item.nickName }}</view>
    <view class="row">
      <text class="label">课包：</text>
      <view class="value">
        <view class="item" v-for="(i, index) in item.sellPackNames" :key="index">{{ i }}</view>
      </view>
    </view>
    <view v-if="!withoutBtn" class="btn pfb" @click="toDetail">预约</view>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  /**
   * 组件的属性列表
   */
  props: {
    item: Object,
    withoutBtn: {
      type: Boolean,
      default: false
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toCoachHome() {
      uni.navigateTo({
        url: `/pages/coach-home/index?id=${this.item.id}`
      });
    },
    toDetail() {
      uni.navigateTo({
        url: `/pages/coach-1v1/index?id=${this.item.id}`
      });
    }
  }
};
</script>
<style>
@import './index.css';
</style>
