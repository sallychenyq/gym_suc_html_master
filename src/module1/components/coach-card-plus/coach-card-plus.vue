<template>
  <view class="coach-main flex-col">
    <view class="coach-info-main flex-row">
      <text class="coach-name">{{ item.realName }}</text>
      <!--      <text class="coach-name">{{ item.realName }}|{{ item.nickName }}</text>-->
      <view class="coach-price-box">
        <view class="coach-price" v-if="haveAppointButton && tip">
          <u-icon
            v-if="promotion"
            :color="$utils.getColors().main"
            name="volume"
            :label="tip"
            :labelColor="$utils.getColors().main"
          ></u-icon>
          <text v-else>{{ tip }}</text>
        </view>
        <text class="coach-price" v-else-if="haveAppointButton"
          >{{ item.sellPackPriceStart > 0 ? `${item.sellPackPriceStart}元` : ""
          }}{{
            item.sellPackPriceStart > 0 && item.sellPackPriceEnd > 0 ? "-" : ""
          }}{{
            item.sellPackPriceEnd > 0 ? `${item.sellPackPriceEnd}元` : ""
          }}</text
        >
      </view>
      <view v-if="haveAppointButton" class="avatar-box flex-col">
        <view class="flex-col">
          <u-image
            :showLoading="true"
            :src="item.avatar"
            shape="circle"
            width="88rpx"
            height="88rpx"
            @click="$v_router.push(`/pages/coach-home/index?id=${item.id}`)"
          ></u-image>
        </view>
      </view>
      <view v-if="!haveAppointButton" class="avatar-box-max flex-col">
        <view class="flex-col">
          <u-image
            :showLoading="true"
            :src="item.avatar"
            shape="circle"
            width="132rpx"
            height="132rpx"
          ></u-image>
        </view>
      </view>
    </view>
    <view class="coach-info-main2 flex-row">
      <view class="coach-info2 flex-col justify-between">
        <view class="coach-sell-count">
          <!--          <text class="at">{{ mineSiteName?`${mineSiteName}场地`:'本场' }}</text>-->
          <!--          <text class="at-count"><text style="color: black">{{ item.serviceCountCorp }}</text>节</text>-->
          <!--          <text class="all">|累计</text>-->
          <!--          <text class="all-count"><text style="color: black">{{ item.courseCount }}</text>节</text>-->
        </view>
        <view
          class="coach-likes-box flex-row justify-between"
          v-if="haveAppointButton"
        >
          <view
            class="coach-likes-box-main flex-row"
            :class="moreMode ? ['box-box-shadow'] : []"
          >
            <view
              class="coach-likes-item flex-col justify-center"
              v-for="(packName, index) in getSellPackNames()"
              :key="index"
            >
              <text class="coach-likes-item-text">{{ packName }}</text>
            </view>
            <view
              class="coach-likes-item flex-col justify-center"
              v-if="moreMode"
              v-for="(packName, index) in getSellPackNamesMore()"
              :key="index"
            >
              <text class="coach-likes-item-text">{{ packName }}</text>
            </view>
          </view>
          <image
            v-if="moreButton"
            class="more-button-2"
            referrerpolicy="no-referrer"
            :src="
              moreMode
                ? '/static/imgs/more-course-button-close.png'
                : '/static/imgs/more-course-button.png'
            "
            @click="showMore()"
          />
          <image v-else class="more-button-2" referrerpolicy="no-referrer" />
        </view>
      </view>
      <button
        v-if="haveAppointButton"
        class="more-button-img flex-col"
        @click="
          $v_router.push(
            `/pages/coach-1v1/index?id=${item.id}&goodat=${coachGoodAt}${
              promotion ? `&promotion=${promotion}` : ''
            }`
          )
        "
      >
        <text class="more-button-img-text">{{
          promotion ? "试课" : "预约"
        }}</text>
      </button>
    </view>
  </view>
</template>

<script>
import UIcon from "../../uview-ui/components/u-icon/u-icon";
import UNoticeBar from "../../uview-ui/components/u-notice-bar/u-notice-bar";
import UImage from "../../../uview-ui/components/u--image/u--image.vue";
export default {
  name: "coach-card-plus",
  components: { UImage, UNoticeBar, UIcon },
  props: {
    item: {},
    haveAppointButton: {
      type: Boolean,
      default: true,
    },
    mineSiteName: String,
    promotion: String,
    coachGoodAt: {
      type: Number,
      default: 0,
    },
    tip: String,
  },
  data() {
    return {
      moreButton: false,
      moreMode: false,
      maxCourseF: 15,
    };
  },
  created() {
    let all = 0;
    let packNames = this.item.sellPackNames;
    if (!packNames) {
      return;
    }
    for (let i = 0; i < packNames.length; i++) {
      all += this.$utils.getChineseCharacterLength(packNames[i]);
      if (all > this.maxCourseF) {
        this.moreButton = true;
      }
    }
    if (packNames.length > 3) {
      this.moreButton = true;
    }
  },
  methods: {
    getSellPackNames() {
      let packNames = this.item.sellPackNames;
      let all = 0;
      for (let i = 0; i < packNames.length; i++) {
        all += this.$utils.getChineseCharacterLength(packNames[i]);
        if (all > this.maxCourseF) {
          return packNames.slice(0, i);
        }
      }
      if (packNames.length <= 3) {
        return packNames;
      }
      return packNames.slice(0, 3);
    },
    getSellPackNamesMore() {
      let packNames = this.item.sellPackNames;
      let all = 0;
      for (let i = 0; i < packNames.length; i++) {
        all += this.$utils.getChineseCharacterLength(packNames[i]);
        if (all > this.maxCourseF) {
          return packNames.slice(i);
        }
      }
      if (packNames.length <= 3) {
        return [];
      }
      return packNames.slice(3);
    },
    showMore() {
      this.moreMode = !this.moreMode;
    },
  },
};
</script>

<style lang="scss">
.coach-main {
  box-shadow: 0px 3px 16px 0px rgba(210, 210, 210, 0.13);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  height: 228rpx;
  width: 690rpx;
  justify-content: flex-center;
  margin: auto;
  margin-top: 29rpx;
  margin-bottom: 31rpx;
  .coach-info-main {
    width: 598rpx;
    height: 88rpx;
    margin: 30rpx 0 0 31rpx;
    .coach-name {
      width: 165rpx;
      height: 31rpx;
      overflow-wrap: break-word;
      color: rgba(0, 0, 0, 1);
      font-size: 30rpx;
      font-family: PingFangSC-Semibold;
      text-align: justifyLeft;
      white-space: nowrap;
      line-height: 30rpx;
      margin-top: 10rpx;
      display: block;
    }
    .coach-price-box {
      width: 166rpx;
      height: 25rpx;
      overflow-wrap: break-word;
      font-size: 0;
      font-family: PingFangSC-Medium;
      text-align: justifyLeft;
      white-space: nowrap;
      line-height: 28rpx;
      margin: 12rpx 0 0 25rpx;
      .coach-price {
        width: 166rpx;
        overflow-wrap: break-word;
        color: $winhouse-main-color;
        font-size: 27rpx;
        font-family: PingFangSC-Medium;
        text-align: left;
        white-space: nowrap;
        line-height: 27rpx;
      }
    }
    .avatar-box {
      background-color: rgba(237, 242, 255, 1);
      border-radius: 50%;
      height: 88rpx;
      margin-left: 154rpx;
      width: 88rpx;
      //.section2 {
      //  height: 88rpx;
      //  width: 88rpx;
      //  padding: 61rpx 0 0 61rpx;
      //  .label1 {
      //    width: 26rpx;
      //    height: 26rpx;
      //  }
      //}
    }
    .avatar-box-max {
      background-color: rgba(237, 242, 255, 1);
      border-radius: 50%;
      height: 132rpx;
      margin-left: 154rpx;
      width: 132rpx;
      //.section2 {
      //  height: 88rpx;
      //  width: 88rpx;
      //  padding: 61rpx 0 0 61rpx;
      //  .label1 {
      //    width: 26rpx;
      //    height: 26rpx;
      //  }
      //}
    }
  }
  .coach-info-main2 {
    width: 630rpx;
    height: 74rpx;
    margin: 6rpx 0 30rpx 30rpx;
    .coach-info2 {
      width: 300rpx;
      height: 74rpx;
      .coach-sell-count {
        width: 263rpx;
        height: 25rpx;
        overflow-wrap: break-word;
        font-size: 0;
        text-align: justifyLeft;
        white-space: nowrap;
        line-height: 23rpx;
        .at {
          width: 263rpx;
          height: 25rpx;
          overflow-wrap: break-word;
          color: rgba(153, 153, 153, 1);
          font-size: 23rpx;
          text-align: left;
          white-space: nowrap;
          line-height: 23rpx;
        }
        .at-count {
          width: 263rpx;
          height: 25rpx;
          overflow-wrap: break-word;
          color: rgba(153, 153, 153, 1);
          font-size: 23rpx;
          text-align: left;
          white-space: nowrap;
          line-height: 23rpx;
        }
        .all {
          width: 263rpx;
          height: 25rpx;
          overflow-wrap: break-word;
          color: rgba(153, 153, 153, 1);
          font-size: 23rpx;
          text-align: left;
          white-space: nowrap;
          line-height: 23rpx;
        }
        .all-count {
          width: 263rpx;
          height: 25rpx;
          overflow-wrap: break-word;
          color: rgba(153, 153, 153, 1);
          font-size: 23rpx;
          text-align: left;
          white-space: nowrap;
          line-height: 23rpx;
        }
      }

      .coach-likes-box {
        transition: all 100ms;
        width: 375rpx;
        margin-top: 19rpx;
        background-color: white;
        border-radius: 12px;
        padding: 12rpx 12rpx 0 0;
        .box-box-shadow {
        }
        .coach-likes-box-main {
          flex-wrap: wrap;
          .coach-likes-item {
            background-color: rgba(243, 243, 243, 1);
            border-radius: 8px;
            height: 30rpx;
            padding: 0 11rpx 0 11rpx;
            margin: 0 10rpx 10rpx 0;
            .coach-likes-item-text {
              height: 20rpx;
              overflow-wrap: break-word;
              color: rgba(153, 153, 153, 1);
              font-size: 19rpx;
              text-align: justifyLeft;
              white-space: nowrap;
              line-height: 19rpx;
              display: block;
            }
          }
        }
        .more-button-2 {
          width: 41rpx;
          height: 30rpx;
        }
      }
    }
    .more-button {
      width: 42rpx;
      height: 31rpx;
      margin: 43rpx 0 0 9rpx;
    }
    .more-button-img {
      background-color: $winhouse-main-color;
      border-radius: 30px;
      height: 60rpx;
      width: 150rpx;
      margin: 14rpx 0 0 175rpx;
      padding: 19rpx 0 0 53rpx;
      .more-button-img-text {
        width: 45rpx;
        height: 23rpx;
        overflow-wrap: break-word;
        color: rgba(255, 255, 255, 1);
        font-size: 24rpx;
        text-align: justifyLeft;
        white-space: nowrap;
        line-height: 24rpx;
        display: block;
      }
    }
  }
}
</style>
