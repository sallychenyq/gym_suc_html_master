<template>
  <view class="benefit card" @click="">
    <view class="label">
      <image src="@/static/static/imgs/type-online-bac.png" class="bac"/>
      会籍
    </view>
    <view class="info">
      <view class="name">{{ item.cardName }}</view>
      <view v-if="item.numberCount" class="teacher">次卡</view>
      <view v-else class="teacher">期卡</view>
      <view v-if="item.frozenStatus" class="teacher">冻结</view>
      <view class="balance" v-if="item.cardStatus">{{ item.lastDate }} 到期</view>
      <view class="balance" v-else>
        <text class="time-out">过期</text>
      </view>
    </view>
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
    item: Object
  },
  methods: {
  }
};
</script>
<style lang="scss">
@import './index.scss';
</style>
