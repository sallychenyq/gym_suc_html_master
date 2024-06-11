<template>
  <page-main
    ref="page"
    title="我的"
    show-qr-button
    is-tab-bar-page
    @qr="$refs.qrBox.loadCheckQr()"
  >
    <view> <button @click="scan">扫码</button> </view>
  </page-main>
</template>

<script>
import PageMain from "../../components/page-main/page-main.vue";

export default {
  components: {
    PageMain,
  },
  data() {
    return {
      tabBarPage: true,
    };
  },
  onShow: function () {
    this.$nextTick(() => {
      this.$refs.page.switchRouter("my");
    });
  },
  onLoad(e) {},
  methods: {
    scan() {
      uni.scanCode({
        success: function (res) {
          console.log("条码类型：" + res.scanType);
          console.log("条码内容：" + res.result);
        },
      });
    },
  },
  watch: {},
};
</script>

<style></style>
