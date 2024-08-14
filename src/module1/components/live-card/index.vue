<template>
  <view class="lesson" @click="tap">
    <view class="time pfb">
      {{ item.startTimeView }}-{{ item.endTimeView }}
    </view>
<!--    #ifdef MP-WEIXIN-->
<!--    微信直播分享-->
    <button open-type="share" class="share-btn" v-show="shareButton"
            :data-media="{
      title:`邀请你一起参与${item.coachRealName}的${item.courseTempName}直播课！`,
      path: getSharePath(),
      params: getShareParams(),
      imageUrl: item.liveShareimg,
            }">
      <image src="@/static/static/imgs/share.png" class="share"/>
    </button>
<!--    #endif-->
    <view :class="'live-info ' + (!item.started ? 'live' : '')">
      <view v-if="item.started" class="live-icon"/>
      <block v-if="item.started">直播中</block>
      <block v-else></block>
    </view>
<!--    <image src="@/static/static/imgs/home-lesson-bac.png" class="lesson-bac"/>-->
    <image :src="item.coachAvatar" class="avatar fake-img"
           mode="aspectFill"
           @click="$v_router.push(`/pages/coach-home/index?id=${item.coachId}`)"/>
    <view class="title">
      <view class="name pfb">{{ item.name }}</view>
    </view>
    <!--        <text class="row text-overflow-hidden-l1">-->
    <!--            <text class="label">{{ item.LiveRank }}：</text>-->
    <!--            <text>{{ item.LiveAnchor }}</text>-->
    <!--        </text>-->
    <text class="row text-overflow-hidden-l1">
      <text class="label">课程类型：</text>
      <text>{{ item.courseTempName }}</text>
    </text>
    <text class="row text-overflow-hidden-l1">
      <text class="label">教练：</text>
      <text>{{ item.coachRealName }}</text>
    </text>
<!--    <text class="row text-overflow-hidden-l1">-->
<!--      <text class="label">收费：</text>-->
<!--      <text>{{ item.payModeView }}</text>-->
<!--    </text>-->
    <block v-if="item.waiting">
      <block v-if="isSubscribe">
        <view @click="toLive" class="btn-sign-in pfb">进入直播间</view>
      </block>
      <block v-else>
        <view @click="toLive" class="btn-sign-in pfb">预约直播</view>
      </block>
    </block>
    <block v-else-if="item.started">
      <view @click.stop="toLive" class="btn-sign-in pfb">
        <image class="live-icon" src="@/static/static/imgs/live-icon.png"/>
      </view>
    </block>
    <block v-else>
      <view @click.stop="toLive" class="btn-sign-in pfb">回看</view>
    </block>
  </view>
</template>
<script>

export default {
  props: {
    item: Object
  },
  data(){
    return{
      shareButton:false,
      isSubscribe: false
    }
  },
  created() {
    uni.$on('closeShareButton',()=>{
      this.shareButton=false
    })
  },
  mounted() {
    let livePlayer = requirePlugin('live-player-plugin')
    // 获取直播间单次订阅状态
    const roomId = this.item.liveRoomid // 房间 id
    livePlayer.getSubscribeStatus({ room_id: roomId })
        .then(res => {
          console.log('房间号：', res.room_id)
          console.log('订阅用户openid', res.openid)
          console.log('是否订阅', res.is_subscribe)
          this.isSubscribe = res.is_subscribe
        }).catch(err => {
          console.log('get subscribe status', err)
    })
  },
  methods: {
    tap(){
      uni.$emit('closeShareButton')
      this.shareButton=true
    },
    getSharePath(){
      return `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin`
    },
    getShareParams(){
      const customParams = {
        path: '/pages/coach-home/index',
        id: this.item.coachId
      }
      return {
        room_id:this.item.liveRoomid,
        custom_params:encodeURIComponent(JSON.stringify(customParams))
      }
    },
    toLive() {
      // #ifdef MP-WEIXIN
      const customParams = {
        path: '/pages/coach-home/index',
        id: this.item.coachId
      }
      this.$v_router.push(`plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${this.item.liveRoomid}&custom_params=${encodeURIComponent(JSON.stringify(customParams))}`)
      // #endif
      // #ifdef H5
      this.$api.toLiveUrl({
        liveId: this.item.id
      }).then(res => {
        window.location.href=res.data
      })
      // #endif
    },
    appoint(){
      this.$emit('appoint')
    },
    cancelAppoint(){
      this.$emit('cancel')
    },
    onSubscribe(e){
      console.log(e);
    }
  }
};
</script>
<style lang="scss">
@import './index.scss';
</style>
