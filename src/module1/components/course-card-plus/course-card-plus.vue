<template>
  <!--	<view class="card">-->
  <view class="card flex-col">
    <view v-if="item.mustCliqueShortName || item.miniTips" class="clique-must">
      <!--				<text class="text">{{ item.mustCliqueShortName }}定制</text>-->
      <text class="text" v-if="item.miniTips">{{ item.miniTips }}</text>
      <text class="text" v-else>{{ item.mustCliqueShortName }}定制</text>
    </view>
    <view class="time-bg flex-row">
      <view
        :class="[item.canAppoint ? '' : 'disable']"
        class="time-bg-tag flex-col"
      >
        <text class="time"
          >{{ item.startTimeView }}-{{ item.endTimeView }}</text
        >
      </view>
    </view>
    <view class="course-main-box flex-row">
      <view class="avatar-box flex-col">
        <view class="flex-col">
          <u-image
            :showLoading="true"
            :src="item.coachAvatar"
            shape="circle"
            width="132rpx"
            height="132rpx"
            @click="
              $v_router.push(`/pages/coach-home/index?id=${item.coachId}`)
            "
          ></u-image>
        </view>
      </view>
      <view
        class="course-box flex-col"
        @click="$v_router.push(`/pages/course-detail/index?id=${item.id}`)"
      >
        <view class="course-info1 flex-row">
          <text class="course-name">{{ item.courseName }}</text>
          <view class="record-box-title flex-col"></view>
          <text v-if="!(item.maxLimit < 0)" class="course-count"
            ><text class="appoint-count">{{ item.appointCount }}</text
            >/{{ item.maxLimit || "无限制" }}</text
          >
        </view>
        <view class="course-coach">
          <text class="coach-name-label">老师：</text>
          <text class="coach-name"
            >{{ item.coachRealName }}/{{ item.coachNickName }}</text
          >
        </view>
        <view class="course-site">
          <text class="course-site-label">场地：</text>
          <text class="course-site-name">{{ item.siteName }}</text>
        </view>
        <view v-if="!(item.maxLimit < 0)" class="course-pay-mode">
          <text class="course-pay-mode-label">收费：</text>
          <text class="course-pay-mode-view"
            >{{ item.payModeFrontView
            }}<text v-if="item.refundTip && !item.appointed"
              >预计可返现{{ item.refundTip }}元</text
            ></text
          >
        </view>
      </view>
      <view v-if="!(item.maxLimit < 0)">
        <view v-if="item.appointed">
          <view
            v-if="item.canCancelAppoint"
            class="appoint-button flex-col appointed"
            @click="cancelAppoint"
          >
            <text class="appoint-button-view">取消预约</text>
          </view>
          <button v-else class="appoint-button flex-col appointed">
            <text class="appoint-button-view">{{
              item.cannotCancelAppointReason
            }}</text>
          </button>
        </view>
        <view v-else>
          <button
            v-if="item.canAppoint"
            class="appoint-button flex-col"
            @click="appoint"
          >
            <text class="appoint-button-view">预约</text>
          </button>
          <button v-else class="appoint-button flex-col disable">
            <text class="appoint-button-view">{{
              item.cannotAppointReason
            }}</text>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import UImage from "../../../uview-ui/components/u--image/u--image.vue";

export default {
  name: "course-card-plus",
  components: { UImage },
  props: {
    item: {
      type: Object,
    },
  },
  created() {},
  data() {
    return {};
  },
  methods: {
    appoint() {
      this.$emit("appoint");
    },
    cancelAppoint() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss">
@import "index";
</style>
