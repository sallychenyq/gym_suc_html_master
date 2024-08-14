<template>
  <page-main
    ref="page"
    show-qr-button
    is-tab-bar-page
    @qr="$refs.qrBox.loadCheckQr()"
    class="flex-col">
	  <u-gap height="105rpx"></u-gap>
    <view class="tab flex-row">
	    <view @click="tabChange(0)" class="text">
		    <text>推荐</text>
      </view>
	    <view @click="tabChange(1)" class="text">
		    <text>大厅</text>
	    </view>
    </view>
    <view v-show="tabsCurrent === 0">
      <swiper
        circular
        :autoplay="false"
        :vertical="true"
        :indicator="false"
        class="section_5">
	      <swiper-item v-for="(item, index) in coachlist" :key="index">
          <view>
            <div class="group_2">
              <image class="group_2" :src="item.avatar" mode="aspectFill">
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
                      <text class="text_9">{{ item.coachNickName }} {网球教练}</text>
                      <image
                        class="label_2"
                        referrerpolicy="no-referrer"
                        :src="item.gender == 1
                            ? '/static/static/男-icon.png'
                            : '/static/static/女-icon.png'"/>
                    </view>
                    <view class="text-wrapper_3">
                      <text class="text_10" v-if="item.resume.birthday">
	                      {{ _Birthday() }}年</text>
                      <text class="text_10">・</text>
                      <text class="text_10">{{ item.resume.height }}cm</text>
                      <text class="text_10">・</text>
                      <text class="text_10">{{ item.resume.education }}</text>
                      <text class="text_10">・</text>
                      <text class="text_10">{{item.resume.constellation }}</text>
                    </view>
                  </view>
                </view>
                <view class="image-text_1 flex-col">
                  <view class="block_1 flex-row">
                    <text class="text-group_1">推荐理由</text>
                    <image
                      class="thumbnail_1"
                      referrerpolicy="no-referrer"
                      src="/static/static/推荐.png"/>
                  </view>
                  <view class="text-group_2 flex-row">
                    <u-read-more class="text-group_2 flex-row"><text class="text_17">
                        这里写一些推荐甄选教练的理由，但是文字不能这么少，还要再写一点才能让页面看着比例协调nsjvdiufnvdifnvijdnvndfvvvvvvvvvvvvvvvvffvakjndfjvndkfjnckjdfvkjfdvkjmd
                      </text></u-read-more>
                    <button class="text_18" @click="detail(index)">
                      查看更多
                    </button>
                  </view>
                </view>
                <view class="box_10 flex-row">
                  <view class="image-wrapper_2 flex-row">
                    <scroll-view
                      :indicator="false"
                      width="100%"
                      scroll-x>
                      <image
                        class="image_3"
                        mode="aspectFill"
                        referrerpolicy="no-referrer"
                        :src="item1"
                        v-for="(item1, index1) in loopData0"
                        :key="index1"/>
                    </scroll-view>
                  </view>
                </view>
              </image>
            </div>
          </view>
	      </swiper-item>
      </swiper>
      <view class="section_6 justify-between">
	      <view class="price flex-col"></view>
	      <view class="bottomSection">
        <view class="group_6 flex-row justify-between">
          <button class="text-wrapper_4 flex-col" click="changeAdd">
            <text class="text_19">候选</text>
          </button>
          <button class="text-wrapper_5 flex-col">
            <text class="text_20">购课</text>
          </button>
        </view></view>
      </view>
    </view>
    <view v-show="tabsCurrent === 1"> <hall ref="all"></hall> </view>
  </page-main>
</template>

<script>
import PageMain from "../../components/page-main/page-main.vue";
import hall from "./all.vue";

export default {
  components: {
	  PageMain,
    hall,
  },

  data() {
    return {
      tabBarPage: true,
      coachlist: [],
      tabsCurrent: 0,
      loopData0: [],
    };
  },
  onShow: function () {
    this.$nextTick(() => {
      this.$refs.page.switchRouter("hall");
    });
  },
  onReady() {//onLoad(e) {
    // 使用页面内uniapp的生命周期，不适用vue的生命周期
	  let appModeLocal = uni.getStorageSync('app.corp.tabsCurrent') || 0
	  this.tabChange(appModeLocal)

  },
  methods: {
	  tabChange(mode) {
		  uni.setStorageSync('app.corp.tabsCurrent', mode)
		  this.tabsCurrent = mode
		  this.$nextTick(() => {
			  switch (mode) {
				  case 0:
					  // this.$api.getCoach().then((res) => {
						//   console.log(res.data);
						//   // this.coachlist = res.data;
					  // });
					  this.$api.getCoachInfo().then((res) => {
						  this.loopData0 = res.data.personalAlbum;
						  this.coachlist[0] = res.data;
							console.log(this.coachlist)
					  });
					  break;
				  case 1:
					  this.$refs.all.init()
					  break;
			  }
		  })
	  },
    detail(index) {
      uni.navigateTo({ url: "/pages/hall/detail?index=" + index });
    },
	  _Birthday() {
		  if (!this.infoList.resume) {
			  return null;
		  }
		  if (!this.infoList.resume.birthday) {
			  return null;
		  }
		  // 1999-01-01,拆分99年
		  let year = this.infoList.resume.birthday.split("-")[0].slice(2);
		  return year + "年";
	  },
  },
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
