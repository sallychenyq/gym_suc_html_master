<template>
    <view :class="'lesson ' + (item.over && item.evaluated ? 'disable' : '')">
        <view class="time">
            {{ item.startTimeView }}-{{ item.endTimeView }} 星期{{ $utils.weekStr(item.startTime) }}
        </view>
        <image :src="item.coachAvatar" class="avatar fake-img" />
        <view class="title">
            <view class="name pfb">{{ item.courseName }}</view>
            <view class="point" />
            <view class="current">{{ item.appointCount }}</view>
        </view>
<!--        <text class="row text-overflow-hidden-l1">-->
<!--            <text class="label">{{ item.LiveRank }}：</text>-->
<!--            <text>{{ item.CoachRealname }}</text>-->
<!--        </text>-->
<!--        <text class="row text-overflow-hidden-l1">-->
<!--            <text class="label">类型：</text>-->
<!--            <text>{{ item.LiveCate }}</text>-->
<!--        </text>-->
        <view v-if="item.started && !item.over" @click.stop.prevent="toLive" class="btn-sign-in pfb">
            进入直播
        </view>
        <view v-else @click.stop.prevent="toLive" class="btn-sign-in pfb">直播回看</view>
        <view class="type-label">{{ item.channelName }}</view>
    </view>
</template>
<script>
import { appointmentCardBehavior } from '../../common/behavior'; // components/live-card-appointment/index.js

export default {
    data() {
    },
    /**
     * 组件的属性列表
     */
    mixins: [appointmentCardBehavior],
    props: {
        item: Object
    },
    /**
     * 组件的方法列表
     */
    methods: {
      toLive(){
        // #ifdef MP-WEIXIN
        this.$api.toLive({
          liveId:this.item.liveStorageId
        }).then(res=>{
          const customParams = {
            path: '/pages/coach-home/index',
            id: this.item.coachId
          }
          this.$v_router.push(`plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${res.data.liveRoomid}&custom_params=${encodeURIComponent(JSON.stringify(customParams))}`)
        })
        // #endif
        // #ifdef H5
        this.$api.toLiveUrl({
          liveId: this.item.id
        }).then(res => {
          window.location.href=res.data
        })
        // #endif
      }
    }
};
</script>
<style>
@import './index.css';
</style>
