<script>
import UImage from "@/uview-ui/components/u--image/u--image.vue";
import UPopup from "@/uview-ui/components/u-popup/u-popup.vue";
import CheckSwitch from "@/components/check-switch/index.vue";

export default {
  name: "appoint-assess-box",
  components: {CheckSwitch, UPopup, UImage},
  data(){
    return{
      assessVisible: false,
      assessTemp: {
        appointId: null,
        level: null,
        anonymous: false,
      },
      appoint: {},
    }
  },
  methods:{
    loadLastAppoint(){
      const lastAppointId = uni.getStorageSync('lastAppointAndCoach') || 0
      setTimeout(()=>{
        this.$api.lastUnAssessAppoint().then(res => {
          if (res.data.id === lastAppointId) {
            return
          }
          console.log(res);
          this.appoint = res.data
          this.assessTemp={
            appointId: res.data.id,
            level: null,
            anonymous: false,
          }
          this.assessVisible = true
          uni.setStorageSync('lastAppointAndCoach', res.data.id)
        })
      }, 1)
    },
    selectLevel(level) {
      this.assessTemp.level = level
    },
    send() {
      this.$api.assessAppoint(this.assessTemp).then((_) => {
        this.$message.success('感谢您的反馈')
        this.assessVisible = false
      })
    }
  }
}
</script>

<template>
  <view>
    <u-popup :show="assessVisible" mode="bottom" round="10" :closeable="true" @close="assessVisible = false">
      <view class="last-assess-box">
        <view class="title">课程服务评价</view>
        <view class="content">上次授课已完成，请对该服务进行评价！</view>
        <view class="lesson">
          <image :src="appoint.coachAvatar" class="avatar"/>
          <view class="name pfb">{{ appoint.channelNameView }}</view>
          <text class="row text-overflow-hidden-l1">
            <text class="label">教练:</text>
            <text>{{ appoint.coachRealName }}</text>
          </text>
          <text class="row text-overflow-hidden-l1">
            <text class="label">时间:</text>
            <text>{{ appoint.startDateView }} {{ appoint.startTimeView }} {{ $utils.weekStr(appoint.startDateView) }}</text>
          </text>
        </view>
        <view class="level-container">
          <view class="image-box">
            <image @click="selectLevel(4)" src="/static/icons/unsatisfied.png" class="satisfied-image" :class="[assessTemp.level>0 && assessTemp.level<5?'active':'']"/>
            <text class="label" :class="[assessTemp.level>0 && assessTemp.level<5?'label-active':'label-noactive']">“不满意”</text>
          </view>
          <view class="image-box">
            <image @click="assessVisible = false" src="/static/icons/nosatisfied.png" class="satisfied-image"/>
            <text class="label">“暂不评价”</text>
          </view>
          <view class="image-box">
            <image @click="selectLevel(5);send()" src="/static/icons/satisfied.png" class="satisfied-image" :class="[assessTemp.level===5?'active':'']"/>
            <text class="label" :class="[assessTemp.level===5?'label-active':'label-noactive']">“满意”</text>
          </view>
        </view>
        <view v-if="assessTemp.level>0 && assessTemp.level<5" class="level-star">
          <image
              :src="'/static/static/imgs/score/score' + (item) + (assessTemp.level === (item) ? '-active' : '') + '.png'"
              @click="selectLevel(item)"
              :data-etc="`${item}分`"
              class="level"
              v-for="(item) in 5"
              :key="item"
          ></image>
        </view>
        <view class="anonymous">
          <check-switch v-model="assessTemp.anonymous" label="匿名评价"/>
        </view>
        <view v-if="assessTemp.level" class="btn-box">
<!--          <view class="btn cancel" @click="assessVisible = false">暂不评价</view>-->
          <view class="btn confirm" @click="send()">提交</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<style scoped lang="scss">
.last-assess-box{
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
  .level-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px auto 0;
    width: 610rpx;
    .image-box{
      //width: 610rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .active{
        background-color: $winhouse-main-color-1;
        border-radius: 50%;
      }
      .label-active{
        color: $winhouse-main-color;
      }
      .label-noactive{
        color: #666;
      }
      .satisfied-image{
        width: 60px;
        height: 60px;
      }
      .label{
        font-size: 14px;
        margin-top: 10px;
      }
    }
  }
  .level-star{
    width: 610rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px auto 0;
    .level{
      width: 40px;
      height: 40px;
    }
  }
  .anonymous{
    margin: 20px auto 0;
    width: 610rpx;
  }
  .btn-box{
    width: 610rpx;
    margin: 20px auto 0;
    display: flex;
    justify-content: space-between;
    .btn{
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 20px;
      color: #fff;
      font-size: 14px;
      &.cancel{
        background-color: #999;
      }
      &.confirm{
        background-color: $winhouse-main-color;
      }
    }
  }
}

.lesson {
  width: 610rpx;
  height: 192rpx;
  margin: 50rpx auto 0;
  background-color: #edf2ff;
  position: relative;
  border-radius: 36rpx;
}

.lesson .avatar {
  width: 132rpx;
  height: 132rpx;
  display: block;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  left: 30rpx;
  top: 50%;
  transform: translateY(-50%);
}

.lesson .name {
  font-size: 30rpx;
  padding-left: 186rpx;
  padding-top: 31rpx;
}

.lesson .row:nth-child(3) {
  padding-top: 20rpx;
}

.lesson .row .label {
  color: #999999;
}

.lesson .row {
  display: block;
  font-size: 24rpx;
  padding-top: 15rpx;
  color: #222;
  padding-left: 186rpx;
}

</style>
