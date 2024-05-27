<template>
    <view class="site-pack-head">
        <image class="avatar" mode="aspectFill" :src="item.headerImage" />
        <view class="title pfb">{{ item.packName }}</view>
        <view class="row">
            <text class="label">最大容纳人数：</text>
            <text class="value">{{ item.holdNum }}</text>
        </view>
<!--        <view class="row">-->
<!--            <text class="label">今日时段：</text>-->
<!--            <text class="value">{{ item.canAppointCount }}个</text>-->
<!--        </view>-->
        <view class="row">
            <text class="label">收费：</text>
            <text class="value">{{ item.feeModeView }}</text>
        </view>
    </view>
</template>

<script>
export default {
  name:'site-pack-head',
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
    }
};
</script>
<style lang="scss">
@import './index.scss';
</style>
