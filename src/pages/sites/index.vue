<template>
  <page-main
      ref="page"
      title="训练场地"
      show-qr-button
      is-tab-bar-page
      @qr="$refs.qrBox.loadCheckQr()"
  >
    <view>
      训练场地页面
    </view>
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
      tabBarPage:true
    };
  },
  onShow: function () {
    this.$nextTick(()=>{
      this.$refs.page.switchRouter('sites')
    })
  },
  onLoad(e) {

  },
  methods: {
  },
  watch:{}
};
</script>
<style lang="scss">
@import './index.scss';
</style>
