<template>
    <view :class="'lesson ' + (item.over && item.evaluated ? 'disable' : '')">
        <view class="time">
            {{ item.startTimeView }}-{{ item.endTimeView }} {{ item.startDateView }} - {{ $utils.weekStr(item.startTime,'星期') }}
        </view>
        <image :src="item.coachAvatar" class="avatar fake-img" @click="$v_router.push(`/pages/coach-home/index?id=${item.coachId}`)"/>
        <view class="title">
            <view class="name pfb">{{ item.courseName }}</view>
            <view class="point" v-if="item.meanwhileAppointMax"/>
            <view class="current" v-if="item.meanwhileAppointMax">{{ item.meanwhileAppointCount }}</view>
            <view class="total" v-if="item.meanwhileAppointMax">/{{ item.meanwhileAppointMax }}</view>
        </view>
        <text class="row text-overflow-hidden-l1">
            <text class="label">教练：</text>
            <text>{{ item.coachRealName }}</text>
        </text>
        <text class="row text-overflow-hidden-l1" v-if="item.siteName">
            <text class="label">场地：</text>
            <text>{{ item.siteName }}</text>
        </text>
        <block v-if="item.started">
            <block v-if="item.over">
                <view v-if="!item.evaluated" @click.stop.prevent="$v_router.push(`/pages/evaluate/index?id=${item.id}`)" class="btn-sign-in pfb">去评价</view>
                <view v-else class="btn-sign-in pfb inactive">已结束</view>
            </block>
            <block v-else>
                <view class="btn-sign-in pfb inactive">进行中</view>
            </block>
        </block>
        <block v-else>
            <view @click.stop.prevent="cancelAppointment" :data-id="item.id" class="btn-sign-in pfb">取消预约</view>
        </block>
        <view class="type-label">{{ item.channelName }}</view>
    </view>
</template>

<script>
import { appointmentCardBehavior } from '../../common/behavior';

export default {
    data() {
        return {
        };
    },
    /**
     * 组件的属性列表
     */
    mixins: [appointmentCardBehavior],
    props: {
        item: Object
    }
};
</script>
<style lang="scss">
@import './index.scss';
</style>
