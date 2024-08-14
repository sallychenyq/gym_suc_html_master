<template>
  <view>
    <errbox :listen-err="false" ref="errbox"></errbox>
    <u-popup :show="appointBox.open" mode="bottom" round="10" :closeable="true" @close="closeActive">
      <view class="coach-appoint-box flex-col">
        <view class="coach-appoint-box1 flex-col">
          <view class="question-box flex-row justify-between">
            <text class="question">确认预约该场地？</text>
          </view>
          <view v-if="sitePack.displayRemarks" class="question-box flex-row justify-between">
            <text class="question">{{ sitePack.remarks }}</text>
          </view>
          <site-pack-head :item="sitePack" withoutBtn></site-pack-head>
          <view v-if="sitePack.appointProofSelect">
            <!--                  <text class="appoint-tip">选择预约方式？</text>-->
            <!--                  按照每个选择框高度80，高于210后，最高210-->
            <u-list :height="(sitePack.appointProofSelect.length*90)>210?210:(sitePack.appointProofSelect.length*90)" showScrollbar>
              <u-list-item
                  v-for="(item, index) in sitePack.appointProofSelect"
                  :key="index"
              >
                <view :class="['sellpack-one-box','flex-col',appointCourseProof===index?'selected':'']" @click="()=>{
                        appointCourseProof=index
                        if(item.cannotUseView){
                          $utils.showToast(item.cannotUseView)
                        }
                      }">
                  <view class="sellpack-one flex-row justify-between">
                    <view class="sellpack-one-info-box flex-col justify-between">
                      <view class="sellpack-one-title">{{ item.nameView }}</view>
                      <view class="sellpack-one-info">
                        <text class="sellpack-course-count">{{ item.payView }}</text>
                        <text v-if="!item.canUse" class="sellpack-ks">:{{ item.cannotUseView }}</text>
                        <text v-if="item.remark" class="sellpack-ont-price-info">({{ item.remark }})</text>
                      </view>
                    </view>
                    <view v-if="appointCourseProof!==index" class="sellpack-check flex-col"></view>
                    <image
                        v-else
                        class="sellpack-checked"
                        referrerpolicy="no-referrer"
                        src="@/static/imgs/rechage-check.png"
                    />
                  </view>
                </view>
              </u-list-item>
            </u-list>
          </view>
          <view class="block3 flex-row justify-between">
            <button class="Button131 flex-col" @click="closeActive">
              <text class="word6">取消</text>
            </button>
            <button class="Button132 flex-col" @click="doAppoint">
              <text class="checkin-qr-box-main-text">确定</text>
            </button>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>

import SitePackHead from "../site-pack-head";
import Errbox from "../errbox/errbox";
import UPopup from "../../uview-ui/components/u-popup/u-popup.vue";
export default {
  name: "site-pack-appoint-box",
  components: {UPopup, Errbox, SitePackHead},
  data() {
    return {
      coach: {},
      appointInfo: {},
      appointCourseProof: null,
      appointBox: {
        open: false,
        info:{}
      },
      cancelBox:{
        open:false,
        info:{}
      },
      autoAppointEnable:false,
      rechargeList: [],
      sitePackRuleItem:{},
      sitePack:{}
    };
  },
  created() {
  },
  methods: {
    openAppoint(opt){
      this.$api.getSitePackOneRule({ruleId:opt.ruleId}).then(res=>{
        this.sitePackRuleItem=res.data
        this.$api.getSitePackOne({packId:this.sitePackRuleItem.packId}).then(res=>{
          this.sitePack=res.data
          this.appointCourseProof = null
          if (res.data.appointProofSelect && res.data.appointProofSelect.length>0){
            for (let i = 0; i < res.data.appointProofSelect.length; i++) {
              if (res.data.appointProofSelect[i].canUse){
                this.appointCourseProof = i
                break
              }
            }
            if (this.appointCourseProof === null){
              if (res.data.appointProofSelect.length===1){
                this.appointCourseProof = 0
              }else {
                this.$utils.showToast('未选择最佳支付方式')
              }
            }else {
              this.$utils.showToast('已选择最佳支付方式')
            }
          }
          this.appointBox.open=true
          this.appointBox.info=opt
        })
      })
    },
    openCancelAppoint(opt){
      // this.cancelBox.open=true
      this.cancelBox.info=opt
      const that=this
      this._confirm({
        title: '确认取消预约',
        okButton: '取消预约',
        content: '是否取消该场地预约',
        success: function () {
          that.cancelAppoint()
        }
      })
    },
    closeAppointBox() {
      this.appointBox.open = false
    },
    closeCancelBoxAppointBox() {
      this.cancelBox.open = false
    },
    closeActive(){
      this.closeAppointBox()
      this.autoAppointEnable=false
    },
    doAppoint() {
      getApp().globalData.ignoreReClick(() => {
        let proof = null
        try {
          if (this.appointCourseProof>=0 && this.sitePack.appointProofSelect[this.appointCourseProof]){
            proof = this.sitePack.appointProofSelect[this.appointCourseProof]
          }
        }catch (e) {

        }
        this.$api.appointSitePack({
          ruleId:this.appointBox.info.ruleId,
          startDate:this.appointBox.info.selectDate,
          proof:proof
        }).then(_=>{
          this.closeAppointBox();
          this.$emit("success")
          this.$utils.beforeAppoint()
        }).catch((reason) => {
          this.closeAppointBox();
        });
      });
    },
    cancelAppoint(){
      getApp().globalData.ignoreReClick(() => {
        this.$api.cancelAppoint({
          ruleId:this.cancelBox.info.ruleId,
          startDate:this.cancelBox.info.selectDate,
        }).then(_=>{
          this.closeCancelBoxAppointBox();
          this.$emit("success")
        }).catch((reason) => {
          this.closeCancelBoxAppointBox();
        });
      });
    }
  }
}
</script>

<style lang="scss">

.coach-appoint-box {
  width: 750rpx;
  padding: 29rpx 0 0 39rpx;

  .coach-appoint-box1 {
    width: 691rpx;
    //height: 560rpx;

    .question-box {
      width: 681rpx;
      //height: 70rpx;

      .question {
        width: 681rpx;
        //width: 206rpx;
        //height: 27rpx;
        overflow-wrap: break-word;
        color: rgba(51, 51, 51, 1);
        font-size: 27rpx;
        font-family: PingFangSC-Medium;
        text-align: left;
        //white-space: nowrap;
        line-height: 36rpx;
        margin-top: 21rpx;
        display: block;
      }

      .setting {
        width: 70rpx;
        height: 70rpx;
      }
    }

    .class-time {
      width: 358rpx;
      height: 33rpx;
      overflow-wrap: break-word;
      color: rgba(0, 0, 0, 1);
      font-size: 31rpx;
      font-family: PingFangSC-Semibold;
      text-align: justifyLeft;
      white-space: nowrap;
      line-height: 33rpx;
      display: block;
      margin: 58rpx 0 0 2rpx;
    }

    .block2 {
      background-color: rgba(255, 255, 255, 1);
      border-radius: 12px;
      //height: 212rpx;
      border: 1px solid rgba(247, 247, 247, 1);
      padding-left: 29rpx;
      width: 690rpx;
      margin: 39rpx 0 0 1rpx;

      .group1 {
        width: 618rpx;
        height: 132rpx;

        .head-box {
          height: 132rpx;
          width: 132rpx;

          .SingleAvatar39 {
            width: 132rpx;
            height: 132rpx;
          }
        }

        .head-box-main {
          width: 300rpx;
          height: 119rpx;
          margin: 10rpx 0 0 20rpx;

          .word1 {
            width: 84rpx;
            overflow-wrap: break-word;
            color: rgba(0, 0, 0, 1);
            font-size: 30rpx;
            font-family: PingFangSC-Semibold;
            text-align: justifyLeft;
            white-space: nowrap;
            line-height: 30rpx;
            display: block;
          }

          .leger-info {
            width: 263rpx;
            height: 25rpx;
            overflow-wrap: break-word;
            font-size: 0;
            text-align: justifyLeft;
            white-space: nowrap;
            line-height: 23rpx;
            margin-top: 17rpx;

            .leger-info-time {
              width: 263rpx;
              height: 25rpx;
              overflow-wrap: break-word;
              color: rgba(153, 153, 153, 1);
              font-size: 23rpx;
              text-align: left;
              white-space: nowrap;
              line-height: 23rpx;
            }

            .have-balance-sell {
              width: 263rpx;
              height: 25rpx;
              overflow-wrap: break-word;
              color: rgba(153, 153, 153, 1);
              font-size: 23rpx;
              text-align: left;
              white-space: nowrap;
              line-height: 23rpx;
            }

            .fast-pay-box-button-text {
              width: 263rpx;
              height: 25rpx;
              overflow-wrap: break-word;
              color: rgba(153, 153, 153, 1);
              font-size: 23rpx;
              text-align: left;
              white-space: nowrap;
              line-height: 23rpx;
            }

            .balance-box-explain-text {
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

          .divider {
            width: 300rpx;
            height: 30rpx;
            margin-top: 19rpx;

            .Tag106 {
              background-color: rgba(243, 243, 243, 1);
              border-radius: 8px;
              height: 30rpx;
              padding-left: 11rpx;
              width: 100rpx;

              .balance-box-title-text {
                width: 78rpx;
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

            .Tag107 {
              background-color: rgba(243, 243, 243, 1);
              border-radius: 8px;
              height: 30rpx;
              padding-left: 11rpx;
              width: 80rpx;

              .user-name {
                width: 59rpx;
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

            .Tag108 {
              background-color: rgba(243, 243, 243, 1);
              border-radius: 8px;
              height: 30rpx;
              width: 100rpx;

              .leger-info-say {
                width: 80rpx;
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
        }

        .outer5 {
          width: 166rpx;
          height: 117rpx;
          margin-top: 12rpx;

          .fast-pay-box-button {
            width: 166rpx;
            height: 25rpx;
            overflow-wrap: break-word;
            font-size: 0;
            font-family: PingFangSC-Medium;
            text-align: justifyLeft;
            white-space: nowrap;
            line-height: 28rpx;

            .word5 {
              width: 166rpx;
              overflow-wrap: break-word;
              color: $winhouse-main-color;
              font-size: 27rpx;
              font-family: PingFangSC-Medium;
              text-align: left;
              white-space: nowrap;
              line-height: 27rpx;
            }

            .info6 {
              width: 166rpx;
              overflow-wrap: break-word;
              color: $winhouse-main-color;
              font-size: 28rpx;
              text-align: left;
              white-space: nowrap;
              line-height: 28rpx;
            }
          }

          .icon1 {
            width: 42rpx;
            height: 31rpx;
            margin: 61rpx 0 0 9rpx;
          }
        }
      }
    }

    .block3 {
      width: 670rpx;
      height: 88rpx;
      margin: 0 0 60rpx 1rpx;
      .Button131 {
        background-color: rgba(218, 0, 0, 0.05);
        border-radius: 44px;
        height: 88rpx;
        width: 320rpx;
        padding: 32rpx 0 0 136rpx;
        .word6 {
          width: 48rpx;
          height: 25rpx;
          overflow-wrap: break-word;
          color: $winhouse-main-color;
          font-size: 26rpx;
          text-align: left;
          white-space: nowrap;
          line-height: 26rpx;
          display: block;
        }
      }

      .Button132 {
        background-color: $winhouse-main-color;
        border-radius: 44px;
        height: 88rpx;
        width: 320rpx;
        padding: 32rpx 0 0 136rpx;
        .checkin-qr-box-main-text {
          width: 49rpx;
          height: 25rpx;
          overflow-wrap: break-word;
          color: rgba(255, 255, 255, 1);
          font-size: 26rpx;
          text-align: left;
          white-space: nowrap;
          line-height: 26rpx;
          display: block;
        }
      }
    }
  }
}
.sellpack-one-box {
  border-radius: 12px;
  border: 1px solid rgba(250, 250, 250, 1);
  &.selected{
    box-shadow: 0 0 5px $winhouse-main-color;
  }
  margin: 10rpx 10rpx 5px 10rpx;
  padding: 28rpx 0 40rpx 28rpx;
  background-color: rgba(0,0,0,0.03);
  .sellpack-one {
    .sellpack-one-info-box {
      width: 337rpx;
      .sellpack-one-title {
        width: 274rpx;
        height: 27rpx;
        overflow-wrap: break-word;
        color: rgba(0, 0, 0, 1);
        font-size: 28rpx;
        text-align: justifyLeft;
        white-space: nowrap;
        line-height: 28rpx;
        display: block;
      }
      .sellpack-one-info {
        width: 336rpx;
        height: 26rpx;
        overflow-wrap: break-word;
        font-size: 0;
        text-align: justifyLeft;
        white-space: nowrap;
        line-height: 28rpx;
        margin: 20rpx 0 0 1rpx;
        .sellpack-course-count {
          width: 336rpx;
          height: 26rpx;
          overflow-wrap: break-word;
          color: $winhouse-main-color;
          font-size: 27rpx;
          text-align: left;
          white-space: nowrap;
          line-height: 27rpx;
        }
        .sellpack-ks {
          width: 336rpx;
          overflow-wrap: break-word;
          color: rgba(102, 102, 102, 1);
          font-size: 28rpx;
          text-align: left;
          white-space: nowrap;
          line-height: 28rpx;
        }
        .sellpack-price {
          width: 336rpx;
          overflow-wrap: break-word;
          color: $winhouse-main-color;
          font-size: 28rpx;
          text-align: left;
          white-space: nowrap;
          line-height: 28rpx;
        }
        .sellpack-price-discount {
          width: 336rpx;
          overflow-wrap: break-word;
          color: $winhouse-main-color;
          font-size: 48rpx;
          text-align: left;
          white-space: nowrap;
          line-height: 28rpx;
        }
        .sellpack-jg {
          width: 336rpx;
          overflow-wrap: break-word;
          color: rgba(102, 102, 102, 1);
          font-size: 28rpx;
          text-align: left;
          white-space: nowrap;
          line-height: 28rpx;
        }
        .sellpack-ont-price-info {
          width: 336rpx;
          height: 26rpx;
          overflow-wrap: break-word;
          color: rgba(153, 153, 153, 1);
          font-size: 20rpx;
          text-align: left;
          white-space: nowrap;
          line-height: 20rpx;
        }
      }
    }
    .sellpack-check {
      border-radius: 50%;
      width: 40rpx;
      height: 40rpx;
      border: 2px solid rgba(248, 248, 248, 1);
      background-color: rgb(255,255,255);
      margin: 22rpx 20rpx 0 0;
    }
    .sellpack-checked {
      width: 40rpx;
      height: 40rpx;
      margin: 22rpx 20rpx 0 0;
      background-color: $winhouse-main-color;
      border-radius: 50%;
    }
  }
}
</style>
