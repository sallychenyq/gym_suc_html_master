<template>
  <view :class="'lesson ' + (item.over && item.evaluated ? 'disable' : '')">
    <view class="time">
      {{ item.startTimeView }}-{{ item.endTimeView }} {{ item.startDateView }} - {{
        $utils.weekStr(item.startTime, '星期')
      }}
    </view>
    <image :src="item.coachAvatar" class="avatar fake-img"/>
    <view class="title">
      <view class="name pfb">{{ item.coachRealName }}</view>
    </view>
    <text class="row text-overflow-hidden-l1">
      <text class="label">类别：</text>
      <text>{{ item.courseTypeName }}</text>
    </text>
    <text class="row text-overflow-hidden-l1">
      <text class="label">课包：</text>
      <text>{{ item.appointSellPackName }}</text>
    </text>
    <text class="row text-overflow-hidden-l1" v-if="item.siteNameView">
      <text class="label">场地：</text>
      <text>{{ item.siteNameView }}</text>
    </text>
    <u-row>
      <u-col span="6">
        <view>
          <view class="type-label">{{ item.channelName }}</view>
        </view>
      </u-col>
      <u-col span="6">
        <view>
          <block v-if="item.started">
            <block v-if="item.over">
              <view v-if="!item.evaluated" @click.stop.prevent="$v_router.push(`/pages/evaluate/index?id=${item.id}`)"
                    class="btn-sign-in pfb">去评价
              </view>
              <view v-else class="btn-sign-in pfb inactive">已结束</view>
            </block>
            <block v-else>
              <view class="btn-sign-in pfb inactive">进行中</view>
            </block>
          </block>
          <block v-else>
            <view @click.stop.prevent="cancelAppointment" class="btn-sign-in pfb">取消预约</view>
          </block>
        </view>
      </u-col>
    </u-row>


  </view>
</template>
<script>
import {appointmentCardBehavior} from '../../common/behavior';
import URow from "../../uview-ui/components/u-row/u-row";
import UCol from "../../uview-ui/components/u-col/u-col";
import UTag from "../../uview-ui/components/u-tag/u-tag";

export default {
  components: {UTag, UCol, URow},
  data() {
    return {};
  },
  /**
   * 组件的属性列表
   */
  mixins: [appointmentCardBehavior],
  props: {
    item: Object
  },
  created() {
  }
};
</script>
<style lang="scss" scoped>
.lesson {
  width: 690rpx;
  //height: 314rpx;
  background-color: #fff;
  margin: 20rpx auto 0;
  position: relative;
  border-radius: 12rpx;
  box-shadow: 0 3rpx 16rpx 0 rgba(210, 210, 210, 0.13);
  padding-left: 40rpx;
}

.lesson.disable {
  filter: grayscale(1);
  opacity: 0.3;
  pointer-events: none;
}

.lesson .name {
  font-size: 30rpx;
}

.lesson .time {
  //width: 377rpx;
  height: 44rpx;
  line-height: 44rpx;
  text-align: left;
  font-size: 24rpx;
  background-color: #fafafa;
  color: $winhouse-main-color;
  display: block;
  position: absolute;
  padding-left: 20rpx;
  padding-right: 20rpx;
  left: 0;
  top: 30rpx;
  z-index: 2;
  border-top-right-radius: 22rpx;
  border-bottom-right-radius: 22rpx;
}

.lesson:active {
  background-color: #f0f0f0;
}

.lesson .title {
  font-size: 30rpx;
  padding-top: 96rpx;
  display: flex;
  align-items: center;
  padding-bottom: 20rpx;
}

.lesson .point {
  width: 7rpx;
  height: 7rpx;
  display: block;
  border-radius: 50%;
  margin: 0 10rpx;
  background-color: $winhouse-main-color;
}

.lesson .current,
.lesson .total {
  font-size: 24rpx;
}

.lesson .current {
  color: $winhouse-main-color;
}

.lesson .row {
  font-size: 24rpx;
  width: 600rpx;
  line-height: 1.2;
  color: #222;
  display: flex;
  align-items: center;
  padding-bottom: 15rpx;
}

.lesson .avatar {
  position: absolute;
  right: 40rpx;
  top: 40rpx;
  z-index: 1;
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
}

.lesson .label {
  color: #999;
}

.lesson .btn-sign-in {
  //position: absolute;
  right: 30rpx;
  //bottom: 30rpx;
  //z-index: 1;
  background-color: $winhouse-main-color;
  border-radius: 30rpx;
  width: 150rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  float: right;
  margin-right: 30rpx;
  margin-bottom: 20rpx;
  color: #fff;
  font-size: 24rpx;
}

.btn-sign-in.evaluate {
  border: 1rpx solid #b4b4b4;
  color: #b4b4b4;
  background-color: #fff;
}

.btn-sign-in.cancel {
  background-color: #fff;
  border: 2rpx solid $winhouse-main-color;
  color: $winhouse-main-color;
}

.btn-sign-in.inactive {
  background-color: #e8e8e8;
}

.empty-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-appoint {
  background-color: $winhouse-main-color;
  width: 180rpx;
  height: 60rpx;
  color: #fff;
  line-height: 60rpx;
  text-align: center;
  font-size: 24rpx;
  border-radius: 30rpx;
  margin-top: 80rpx;
}

.empty-page .tips {
  font-size: 24rpx;
  color: #666666;
  margin-top: 50rpx;
}

.empty {
  width: 242rpx;
  height: 179rpx;
  display: block;
  margin-top: 500rpx;
}

.lesson .type-label {
  margin-bottom: 20rpx;
  padding: 15rpx 15rpx;
  height: 60rpx;
  border-radius: 8rpx;
  border: 1rpx solid rgba(102, 112, 134, 0.6);
  background-color: rgba(237, 242, 255, 0.6);
  color: #667086;
  text-align: center;
  font-size: 22rpx;
  position: absolute;
  bottom: 0rpx;
  left: 40rpx;
  //z-index: 2;
}

</style>
