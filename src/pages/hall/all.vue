<template>
  <view class="page flex-col">
    <view class="group_8 flex-col">
      <u-scroll-list
        ><view class="block_3 flex-row">
          <button class="group_9 flex-col">
            <image
              class="image_3"
              referrerpolicy="no-referrer"
              src="../../static/static/健身-icon.png"
            /><text class="text_8">健身</text>
          </button>
          <button class="group_12 flex-col">
            <image
              class="image_4"
              referrerpolicy="no-referrer"
              :src="type[0].largeImgActive"
            /><text class="text_9">{{ type[0].superCoachTypeName }}</text>
          </button>
          <button class="block_5 flex-col">
            <image
              class="image_7"
              referrerpolicy="no-referrer"
              src="../../static/static/高尔夫-icon.png"
            /><text class="text_10">高尔夫</text>
          </button>
          <button class="group_14 flex-col">
            <image
              class="image_5"
              referrerpolicy="no-referrer"
              src="../../static/static/国术-icon.png"
            /><text class="text_11">国术</text>
          </button>
        </view>
      </u-scroll-list>
      <!-- <view class="image-wrapper_2 flex-row">
		</view> -->
    </view>
    <scroll-view
      :indicator="false"
      scroll-y
      style="position: relative; top: 355rpx"
      ><view
        class="group_15 flex-col"
        v-for="(item, index) in coachlist"
        :key="index"
      >
        <view class="block_6 flex-col">
          <view class="image-wrapper_3 flex-col">
            <image
              class="image_8"
              referrerpolicy="no-referrer"
              src="../../static/static/教练.jpg"
            />
          </view>
        </view>
        <view class="block_7 flex-row justify-between">
          <view class="text-group_1 flex-col justify-between">
            <text class="text_14">{{ item.coachNickName }}{网球教练}</text>
            <view class="text-wrapper_3">
              <UniTag
                v-if="item.resume.birthday"
                size="mini"
                :text="item.resume.birthday.slice(2, 4) + '年'"
              ></UniTag>
              <text class="text_16">・</text>
              <text class="text_15">{{ item.resume.height }}cm</text>
              <text class="text_16">・</text>
              <text class="text_15">{{ item.resume.education }}</text>
              <text class="text_16">・</text>
              <text class="text_15">{{ item.resume.constellation }}</text>
            </view>
          </view>
          <view class="image-wrapper_4 flex-col">
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
        </view>
        <view class="text-wrapper_4">
          <text class="text_22">周均授课</text>
          <text class="text_23">32</text>
          <text class="text_22">{节} 教练课量排名前</text>
          <text class="text_23">82%</text>
        </view>
        <u-line-progress
          :percentage="82"
          :showText="false"
          height="4"
          activeColor="#6bd0ff"
        ></u-line-progress>
        <view class="block_10 flex-row">
          <view class="block_11 flex-col justify-between">
            <view class="text-wrapper_5 flex-row justify-between">
              <text class="text_26">¥</text>
              <text class="text_27">1688</text>
            </view>
            <view class="image-text_1 flex-row justify-between">
              <text class="text-group_2">课时均价</text>
              <image
                class="thumbnail_1"
                referrerpolicy="no-referrer"
                src="../../static/static/问好.png"
              />
            </view>
          </view>
          <button class="text-wrapper_6 flex-col">
            <text class="text_28">添加候选</text>
          </button>
          <button class="text-wrapper_7 flex-col">
            <text class="text_29">试课购课</text>
          </button>
        </view>
        <image
          class="label_3"
          referrerpolicy="no-referrer"
          src="../../static/static/头像.png"
        /> </view
    ></scroll-view>
  </view>
</template>

<script>
// import PageMain from "../../components/page-main/page-main.vue";

// import uni-tag from "@/components/uni-tag/uni-tag.vue";

import UniTag from "@/components/uni-tag/uni-tag.vue";
import UButton from "@/uview-ui/components/u-button/u-button.vue";

export default {
  components: {
    UButton,
    UniTag,

    // PageMain,
  },
  // onLoad(e) {
  mounted() {
    this.getCoach();
    this.getType();
  },
  data() {
    return {
      coachlist: [],
      type: [],
    };
  },
  // onShow: function () {
  //   this.$nextTick(() => {
  //     this.$refs.page.switchRouter("hall");
  //   });
  // },
  methods: {
    getCoach() {
      this.$api.getCoach().then((res) => {
        console.log(res.data);
        this.coachlist = res.data;
      });
    },
    getType() {
      this.$api.coachType().then((res) => {
        console.log(res.data);
        this.type = res.data;
      });
    },
  },
};
</script>

<style lang="scss">
@import "./all.scss";
</style>
