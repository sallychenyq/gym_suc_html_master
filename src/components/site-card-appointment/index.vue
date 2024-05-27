<template>
    <!-- components/site-card-appointment/index.wxml -->

    <view :class="'lesson ' + (item.over && item.evaluated ? 'disable' : '')">
        <image mode="aspectFill" class="bac-img" :src="item.siteImg || '/static/static/imgs/site-bac.jpg'" />
        <image class="icon" src="@/static/static/imgs/clock-green.png" />
        <view class="title">
            <text class="time pfb">{{ item.startTimeView }}-{{ item.endTimeView }}</text>
            <view class="point" src="@/static/static/imgs/point.png" />
            <text class="count">{{ item.meanwhileAppointCount }}</text>
            <text class="total">/{{ item.meanwhileAppointMax }}</text>
        </view>
        <view class="date">{{ item.startDateView }} {{ $utils.weekStr(item.startTime) }}</view>
        <block v-if="item.started">
            <view class="btn pfb disable">已预约</view>
        </block>
        <block v-else>
            <view @click.stop.prevent="cancelAppointment" class="btn pfb">取消预约</view>
        </block>
        <view class="type-label">场地：{{ item.courseTypeName }}</view>
    </view>
</template>

<script>

export default {
    data() {
        return {

        };
    },
    props: {
        item: Object
    },
    /**
     * 组件的方法列表
     */
    methods: {
        cancelAppointment() {
          this.$emit('cancel',this.item.id)
        }
    }
};
</script>
<style lang="scss">
@import './index.scss';
</style>
