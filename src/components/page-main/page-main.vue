<template>
  <view :style="bgColor ? `background-color: ${bgColor}` : ''">
    <errbox ref="errbox" @errBoxConfirm="$emit('errBoxConfirm')"></errbox>
    <share-box ref="shareBox"></share-box>
    <page-head
      ref="pageTitle"
      v-if="isTabBarPage && title"
      :show-qr-button="showQrButton"
      :show-back-btn="!isTabBarPage"
      @qr="$emit('qr')"
    >
      {{ title }} </page-head
    ><!--u-sticky :offset-top="offsetTop" :enable="enable"
      --><view v-else style="width: 100%"
      ><u-tabs
        :list="tabsList"
        :current="tabsCurrent"
        @change="tabsChange"
      ></u-tabs
    ></view>
    <view>
      <slot />
    </view>
    <!--    <u-gap />-->
    <tab-bar id="tabBar" v-if="isTabBarPage" ref="tabBar" />
    <u-popup
      closeable
      bgColor="transparent"
      :show="showPopup"
      @close="onClosePopupBox"
      @open="showPopup = true"
      mode="center"
      :round="10"
      :safeAreaInsetBottom="false"
    >
      <view>
        <swiper autoplay :indicator-dots="true" class="swiper">
          <swiper-item
            v-for="(popup, index) in popupList"
            :key="index"
            class="popup-imgbox"
          >
            <u-image
              @click="clickPopup(index)"
              class="popup-img"
              :radius="10"
              mode="widthFix"
              height="auto"
              :src="popup.popupImg"
              :fade="true"
              duration="450"
              :width="`${3.75 * popup.popupSize}`"
            >
              <template v-slot:loading>
                <u-loading-icon color="red"></u-loading-icon>
              </template>
            </u-image>
          </swiper-item>
        </swiper>
      </view>
      <view style="margin: 10px auto">
        <w-checkbox v-model="savePopupInfo" label="下次不再弹出" color="#FFF" />
      </view>
    </u-popup>
  </view>
</template>

<script>
import Errbox from "../errbox/errbox.vue";
import PageHead from "../universal-page-head/universal-page-head.vue";
import TabBar from "../tab-bar/tab-bar.vue";
import ShareBox from "../share-box/index.vue";
import WCheckbox from "@/components/selector/w-checkbox.vue";

export default {
  name: "page-main",
  components: {
    WCheckbox,
    ShareBox,
    TabBar,
    PageHead,
    Errbox,
  },
  props: {
    title: String,
    isTabBarPage: Boolean,
    showQrButton: Boolean,
    bgColor: String,
  },
  data() {
    return {
      savePopupInfo: false,
      popupInfoMd5: null,
      popupList: [],
      corps: [],
      showPopup: false,
    };
  },
  mounted() {
    this.getPopupImg();
  },
  methods: {
    clickPopup(index) {
      const propaganda = this.popupList[index];
      this.$v_router.push(`/pages/propaganda-view/index?id=${propaganda.id}`);
    },
    onClosePopupBox() {
      if (this.savePopupInfo) {
        uni.setStorageSync("pagePopupMd5", this.popupInfoMd5);
      }
      this.showPopup = false;
    },
    showPopupBox(list) {
      this.popupList = list;
      if (list.length <= 0) {
        return;
      }
      let showPopupInfoThisApp = getApp().globalData.showPopupInfo;
      let pagePopupMd5 = uni.getStorageSync("pagePopupMd5");
      // 计算弹窗的md5信息
      let infos = "popupMd5";
      for (let i = 0; i < list.length; i++) {
        infos += `${list[i].popupImg}${list[i].popupSize}`;
      }
      infos = this.$utils.md5.md5(infos);
      this.popupInfoMd5 = infos;
      if (pagePopupMd5 === infos) {
        return;
      }
      if (showPopupInfoThisApp === infos) {
        return;
      }
      this.showPopup = true;
      getApp().globalData.showPopupInfo = infos;
    },
    getPopupImg() {
      setTimeout(() => {
        if (!this.$utils.pageIsTabBar()) {
          return;
        }
        // this.$api.getPropagandaList().then(res => {
        //     console.log(res.data);
        //     const list=[]
        //     for (let i = 0; i < res.data.length; i++) {
        //         if (res.data[i].popupImg){
        //             list.push(res.data[i])
        //         }
        //     }
        //     this.showPopupBox(list)
        // })
      }, 0);
    },
    switchRouter(routerName) {
      this.$nextTick(() => {
        this.$refs.tabBar.switchRouter(routerName);
      });
    },
    getErrbox() {
      return this.$refs.errbox;
    },
    getShareBox() {
      return this.$refs.shareBox;
    },
    getTabBarRect() {
      if (!this.isTabBarPage) {
        return new Promise((resolve) => {
          const data = uni.$u.sys().safeArea;
          data.top = data.bottom;
          resolve(data);
        });
      }
      return this.$refs.tabBar.getRect();
    },
    pageBack() {
      this.$nextTick(() => {
        this.$refs.pageTitle.back();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.popup-imgbox {
  //width: 750rpx;
  //width: 0rpx;
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .u-image {
    //display: flex;
    //justify-content: center; /* 水平居中 */
    //margin: auto;
  }
}

.swiper {
  height: 1000rpx;
  width: 750rpx;
  //width: 0;
}
</style>
