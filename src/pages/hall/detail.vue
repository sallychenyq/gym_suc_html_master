<template>
  <view
    >?{{ num }}?<canvas
      canvas-id="canvasLine"
      id="canvasLine"
      class="charts"
      style="border: 1px solid; width: 300px; height: 150px"
    /><button @click="pay">支付</button></view
  >
</template>

<script>
import uCharts from "../../components/u-charts/u-charts.js";

var _self;
var canvasLine = null;
export default {
  components: {},
  data() {
    return { num: 0, cWidth: "", cHeight: "", pixelRatio: 1, serverData: "" };
  },
  onLoad: function (option) {
    this.num = option.index;
    _self = this;
    //#ifdef MP-ALIPAY
    uni.getSystemInfo({
      success: function (res) {
        if (res.pixelRatio > 1) {
          _self.pixelRatio = 2;
        }
      },
    });
    //#endif
    this.cWidth = uni.upx2px(690);
    this.cHeight = uni.upx2px(400);
    this.getServerData();
  },

  name: "transaction",

  methods: {
    pay() {
      // 仅作为示例，非真实参数信息。
      uni.requestPayment({
        provider: "wxpay",
        timeStamp: String(Date.now()),
        nonceStr: "A1B2C3D4E5",
        package: "prepay_id=wx20180101abcdefg",
        signType: "MD5",
        paySign: "",
        success: function (res) {
          console.log("success:" + JSON.stringify(res));
        },
        fail: function (err) {
          console.log("fail:" + JSON.stringify(err));
        },
      });
    },
    getServerData() {
      let json = {
        success: true,
        data: {
          LineA: {
            categories: ["2012-10", "2013", "2014", "2015", "2016", "2017"],
            series: [
              {
                name: "",
                data: [35, 8, 25, 37, 4, 20],
                type: "line",
                style: "curve", //这里的类型改成曲线 curve  默认是 straight直线
                color: "#1890ff",
              },
            ],
          },
        },
      };
      let LineA = { categories: [], series: [] };
      LineA.categories = json.data.LineA.categories;
      LineA.series = json.data.LineA.series;
      _self.showLineA("canvasLine", LineA);
    },
    showLineA(canvasId, chartData) {
      canvasLine = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: "mix", // 这里的类型从 line 换成 mix
        fontSize: 11,
        legend: { show: true },
        dataLabel: false,
        dataPointShape: true,
        background: "#FFFFFF",
        pixelRatio: _self.pixelRatio,
        categories: chartData.categories,
        series: chartData.series,
        animation: true,
        xAxis: {
          type: "grid",
          gridColor: "#CCCCCC",
          gridType: "dash",
          dashLength: 8,
        },
        yAxis: {
          gridType: "dash",
          gridColor: "#CCCCCC",
          dashLength: 8,
          splitNumber: 5,
          format: (val) => {
            return val.toFixed(0) + "元";
          },
        },
        width: _self.cWidth * _self.pixelRatio,
        height: _self.cHeight * _self.pixelRatio,
        extra: {
          line: {
            type: "straight",
          },
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.transaction {
  /*样式的width和height一定要与定义的cWidth和cHeight相对应*/
  .canvas,
  .charts {
    width: 690upx;
    height: 400upx;
    margin: 30rpx auto;
  }
}
</style>
