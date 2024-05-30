<template>
  <page-main
    ref="page"
    show-qr-button
    is-tab-bar-page
    @qr="$refs.qrBox.loadCheckQr()"
  >
    <u-sticky :offset-top="offsetTop" :enable="enable"
      ><u-tabs
        :list="tabsList"
        :current="tabsCurrent"
        @change="tabsChange"
      ></u-tabs
    ></u-sticky>

    <view class="page flex-col" v-if="tabsCurrent === 0">
      <!--view class="group_1 flex-col"-->
      <!--scroll-view :indicator="false" scroll-y width="1200rpx"-->
      <swiper
        circular
        :autoplay="false"
        :vertical="true"
        :indicator="false"
        class="section_5"
        ><swiper-item v-for="(item, index) in coachlist" :key="index">
          <view>
            <div class="group_2">
              <image class="group_2" :src="item.avatar" mode="aspectFill">
                <!--view
              class="group_2"
              style="background-image: 'url(' + item.avatar + ')'"
            -->

                <view class="box_8 flex-row">
                  <view class="group_3 flex-col">
                    <view class="text-wrapper_2 flex-row">
                      <text class="text_6">¥</text>
                      <text class="text_7">1688</text>
                    </view>
                    <text class="text_8">{课时均价}</text>
                  </view>
                  <!-- <u-line class="group_4 flex-col"></u-line> -->
                  <view class="group_5 flex-col">
                    <view class="box_9 flex-row">
                      <text class="text_9"
                        >{{ item.coachNickName }} {网球教练}</text
                      >
                      <image
                        class="label_2"
                        referrerpolicy="no-referrer"
                        :src="
                          item.gender == 1
                            ? '../../static/static/男-icon.png'
                            : '../../static/static/女-icon.png'
                        "
                      />
                    </view>
                    <view class="text-wrapper_3">
                      <text class="text_10" v-if="item.resume.birthday"
                        >{{ item.resume.birthday.slice(2, 4) }}年</text
                      >
                      <text class="text_10">・</text>
                      <text class="text_10">{{ item.resume.height }}cm</text>
                      <text class="text_10">・</text>
                      <text class="text_10">{{ item.resume.education }}</text>
                      <text class="text_10">・</text>
                      <text class="text_10">{{
                        item.resume.constellation
                      }}</text>
                    </view>
                  </view>
                </view>
                <view class="image-text_1 flex-col">
                  <view class="block_1 flex-row">
                    <text class="text-group_1">推荐理由</text>
                    <image
                      class="thumbnail_1"
                      referrerpolicy="no-referrer"
                      src="../../static/static/推荐.png"
                    />
                  </view>
                  <view class="text-group_2 flex-row">
                    <u-read-more class="text-group_2 flex-row"
                      ><text class="text_17">
                        这里写一些推荐甄选教练的理由，但是文字不能这么少，还要再写一点才能让页面看着比例协调nsjvdiufnvdifnvijdnvndfvvvvvvvvvvvvvvvvffvakjndfjvndkfjnckjdfvkjfdvkjmd
                      </text>
                      <text class="text_18">查看更多</text></u-read-more
                    >
                  </view>
                </view>
                <view class="box_10 flex-row">
                  <view class="image-wrapper_2 flex-row">
                    <scroll-view
                      :indicator="false"
                      width="100%"
                      scroll-x
                      style="white-space: nowrap"
                    >
                      <image
                        class="image_3"
                        mode="aspectFill"
                        referrerpolicy="no-referrer"
                        style="display: inline-block"
                        :src="item1"
                        v-for="(item1, index1) in loopData0"
                        :key="index1"
                    /></scroll-view>
                  </view> </view
              ></image>
            </div> </view></swiper-item
      ></swiper>
      <view class="section_6 flex-col">
        <view class="group_6 flex-row justify-between">
          <button class="text-wrapper_4 flex-col" click="changeAdd">
            <text class="text_19">添加候选</text>
          </button>
          <button class="text-wrapper_5 flex-col">
            <text class="text_20">试课购课</text>
          </button>
        </view>
      </view>
    </view>
    <view v-else-if="tabsCurrent === 1"> <hall ref="all"></hall> </view
  ></page-main>
</template>

<script>
// import PageMain from "../../components/page-main/page-main.vue";
import hall from "./all.vue";
import UImage from "@/uview-ui/components/u--image/u--image.vue";

import USubsection from "@/uview-ui/components/u-subsection/u-subsection.vue";
import UReadMore from "@/uview-ui/components/u-read-more/u-read-more.vue";
import UScrollList from "@/uview-ui/components/u-scroll-list/u-scroll-list.vue";
import ScrollViewBox from "@/components/scroll-view-box/scroll-view-box.vue";
import USwiper from "@/uview-ui/components/u-swiper/u-swiper.vue";
import USwipeActionItem from "@/uview-ui/components/u-swipe-action-item/u-swipe-action-item.vue";
import direction from "@dcloudio/uni-h5/src/core/view/components/editor/formats/direction";
export default {
  components: {
    USwipeActionItem,
    USwiper,
    ScrollViewBox,
    UScrollList,
    UReadMore,
    USubsection,
    UImage,
    // PageMain,
    hall,
  },

  data() {
    return {
      tabBarPage: true,
      coachlist: [],
      tabsList: [
        {
          name: "推荐",
        },
        {
          name: "大厅",
        },
      ],
      tabsCurrent: 0,
      loopData0: [
        "../../static/static/alterl.png",
        "../../static/static/lightup.png",
        "../../static/static/教练.jpg",
        "../../static/static/alterr.png",
        "../../static/static/half.png",
        "../../static/static/alterl.png",
      ],
    };
  },
  onShow: function () {
    this.$nextTick(() => {
      this.$refs.page.switchRouter("hall");
    });
  },
  onLoad(e) {
    // 使用页面内uniapp的生命周期，不适用vue的生命周期
    this.getCoach();
  },
  mounted() {},
  methods: {
    direction,
    getCoach() {
      this.$api.getCoach().then((res) => {
        console.log(res.data);
        this.coachlist = res.data;
      });
    },
    age(birth) {},
    tabsClick(item) {
      console.log("item", item);
    },

    /**
     * @Event 方法
     * @description: u-tabs 菜单change
     * */
    tabsChange(index) {
      this.tabsCurrent = index.index;
    },
  },
  watch: {},
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
