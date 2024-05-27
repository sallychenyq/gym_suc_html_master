<template>
  <view>
    <recharge @success="autoAppoint"></recharge>
    <errbox :listen-err="false" ref="errbox"></errbox>
    <u-popup :show="appointBox.open" mode="bottom" round="10" :closeable="true" @close="closeActive">
      <view class="coach-appoint-box flex-col">
        <view class="coach-appoint-box1 flex-col">
          <view class="question-box flex-row justify-between">
            <text class="question">确认预约该教练({{ coachGoodAt.typeName }})&nbsp;？</text>
          </view>
          <text class="class-time">私教一对一&nbsp;|&nbsp;{{ appointInfo.timeStart }}-{{
              appointInfo.timeEnd
            }}&nbsp;{{ appointInfo.weekStr }}&nbsp;|&nbsp;{{ appointInfo.timeAgo }}
          </text>
          <coach-card-plus :item="coach" :have-appoint-button="false"></coach-card-plus>
          <view class="site-pack-tips flex-row justify-between">
            <text class="site-pack-tip">请选择您要使用的私教课包:</text>
          </view>
          <button class="select-user-pack-button" @click="selectUserPackClick">{{ selectUserPack.packName }}</button>
          <view class="site-pack-tips flex-row justify-between">
            <text class="site-pack-tip">请选择您要使用的场地:</text>
          </view>
          <view class="outer7 flex-row justify-between">
<!--            健身私教-->
            <scroll-view-box>
              <select-item
                  :disable="!item.appointEnable"
                  :selected="appointInfo.selectSitePack===item.id"
                  @select="sitePackChange(item)"
                  v-for="item in sitePacks"
                  :item="item"
                  :img="item.headerImage"
                  :selectedImg="item.headerImageClick"
                  :label="item.packName"
              ></select-item>
              <select-item
                  v-if="!sitePacks || sitePacks.length<=0"
                  :selected="appointInfo.selectSitePack===0"
                  label="无场地可用"
              ></select-item>
            </scroll-view-box>
          </view>
          <view v-if="appointInfo.selectSitePack" class="site-pack-tips flex-row justify-between">
            <text class="site-pack-tip">请选择您要使用的场地扣款方式:</text>
          </view>
          <button v-if="appointInfo.selectSitePack" class="select-user-pack-button" @click="selectSitePackProofClick">{{ selectSitePackAppointProof.proofName }}</button>
          <view class="block3 flex-row justify-between">
            <button class="Button131 flex-col" @click="closeActive">
              <text class="word6">取消</text>
            </button>
            <button class="Button132 flex-col" @click="doAppoint">
              <text class="checkin-qr-box-main-text">
                {{(appointInfo.selectSitePack>0 && sitePackItems[appointInfo.selectSitePack])?
                  `确定,场地:${sitePackItems[appointInfo.selectSitePack].packName}`:'确定,不使用场地'}}
              </text>
            </button>
          </view>
        </view>
      </view>
    </u-popup>
    <u-modal
        :show="cancelBox.open"
        title="取消预约"
        content="取消课程后，如果您消费了课包，您的课时余额将会返还到课包账户"
        :showCancelButton="true"
        :closeOnClickOverlay="true"
        @close="cancelBox.open=false"
        @confirm="cancelAppoint">
      <u-button
          slot="confirmButton"
          text="确认取消"
          type="primary"
          shape="circle"
          @click="cancelAppoint"
      ></u-button>
      <view class="slot-content cancel-box-text">
        <u-text lineHeight="50rpx" text="取消课程后，如果您消费了课包，您的课时余额将会返还到课包账户"></u-text>
      </view>
    </u-modal>
  </view>
</template>

<script>

import Recharge from "../recharge";
import UScrollList from "../../uview-ui/components/u-scroll-list/u-scroll-list";
import SelectItem from "../select-item/select-item";
import ScrollViewBox from "../scroll-view-box/scroll-view-box";
import Errbox from "../errbox/errbox";
import UPopup from "../../uview-ui/components/u-popup/u-popup.vue";
import UModal from "../../uview-ui/components/u-modal/u-modal.vue";
import UButton from "../../uview-ui/components/u-button/u-button.vue";
import UText from "../../uview-ui/components/u-text/u-text.vue";
export default {
  name: "coach1v1-appoint-box",
  components: {UText, UButton, UModal, UPopup, Errbox, ScrollViewBox, SelectItem, UScrollList, Recharge},
  data() {
    return {
      coach: {},
      appointInfo: {},
      appointBox: {
        open: false
      },
      selectPersonalType:0,
      selectGoodAt:0,
      selectCourseType:0,
      selectUserPack:{
        id: 0,
        packName: "由系统自动选择",
      },
      selectSitePackAppointProof:{
        proof: null,
        proofName: "由系统自动选择",
      },
      sitePacks:[],
      sitePackItems:{},
      coachGoodAts:[],
      userPacks:[],
      sitePackAppointProof:[],
      coachGoodAt:{},
      coachCourseTemps:[],
      cancelBox:{
        open:false
      },
      autoAppointEnable:false,
      rechargeList: []
    };
  },
  created() {
    const that = this
    uni.$on('cancelCoach1v1',function (opt) {
      that.appointInfo = {
        timeStart: opt.timeStart,
        timeEnd: opt.timeEnd,
        selectDate: opt.selectDate
      }
      that.coach.id = opt.coachId
      that.cancelBox.open = true
    })
  },
  watch:{
    'selectPersonalType'(){
      this.loadSitePack()
    }
  },
  methods: {
    selectUserPackClick(){
      if (this.userPacks.length<=0){
        this.$message.error('没有可用课包')
        return
      }
      const items = []
      for (let i = 0; i < this.userPacks.length; i++) {
        const name = this.userPacks[i].sellPackName+`(剩${this.userPacks[i].courseBalance}节)`
        items.push({
          name: name,
          action: () => {
            this.selectUserPack.packName=name
            this.selectUserPack.id=this.userPacks[i].id
          }
        })
      }
      this.$message.showActionSheet('选择课包', items)
    },
    selectSitePackProofClick(){
      if (!this.sitePackAppointProof || this.sitePackAppointProof.length<=0){
        this.$message.error('没有可用的支付方式')
        return
      }
      const items = []
      for (let i = 0; i < this.sitePackAppointProof.length; i++) {
        const name = this.sitePackAppointProof[i].nameView+`(${this.sitePackAppointProof[i].payView})`
        items.push({
          name: name,
          action: () => {
            this.selectSitePackAppointProof.proofName=name
            this.selectSitePackAppointProof.proof=this.sitePackAppointProof[i]
          }
        })
      }
      this.$message.showActionSheet('选择场地包的凭据', items)
    },
    loadSitePack(){
      this.$api.listSitePack({
        startDate:this.appointInfo.selectDate,
        startTime:this.appointInfo.timeStart,
        endTime:this.appointInfo.timeEnd,
        reserve:true,
        goodAt:this.selectGoodAt
      }).then(res=>{
        this.sitePacks=res.data
        if (this.sitePacks.length<=0){
          this.sitePackItems={}
          this.appointInfo.selectSitePack=0
          return
        }
        for (let i = 0; i < this.sitePacks.length; i++) {
          this.sitePackItems[this.sitePacks[i].id]=this.sitePacks[i]
        }
        for (let i = 0; i < this.sitePacks.length; i++) {
          if (this.sitePacks[i].appointEnable){
            this.sitePackChange(this.sitePacks[i])
            break
          }
        }
      })
    },
    openAppoint(opt){
      this.$api.getGoodAtInfo({
        goodAtId: opt.goodat
      }).then(res => {
        this.coachGoodAt = res.data
      })
      this.$api.getCoachInfo({
        id: opt.coachId
      }).then(res => {
        this.selectGoodAt = opt.goodat
        this.sitePackItems={}
        this.sitePacks=[]
        this.sitePackAppointProof = []
        this.appointInfo = {
          timeStart: opt.timeStart,
          timeEnd: opt.timeEnd,
          promotion: opt.promotion,
          selectDate: opt.selectDate,
          timeAgo: this.$utils.timeago(`${opt.selectDate} ${opt.timeStart}`),
          weekStr: this.$utils.weekStr(opt.selectDate),
          selectSitePack: 0,
          goodAt:opt.goodat
        }
        this.loadSitePack()
        this.coach = res.data.info
        this.refreshCanSelectUserPack()
        this.appointBox.open = true
      })
    },
    sitePackChange(item){
      this.sitePackAppointProof = []
      if (this.appointInfo.selectSitePack===item.id){
        this.appointInfo.selectSitePack=0
      }else if(!item.appointEnable){
        this.$utils.showToast(`该场地${item.cannotAppointMsg},请换其他场地吧`)
      }else {
        this.appointInfo.selectSitePack=item.id
        this.$api.getSitePackOne({
          packId:item.id
        }).then(res=>{
          this.sitePackAppointProof = res.data.appointProofSelect
        })
      }
    },
    openCancelAppoint(opt){
      this.appointInfo = {
        timeStart: opt.timeStart,
        timeEnd: opt.timeEnd,
        selectDate: opt.selectDate
      }
      this.coach.id = opt.coachId
      this.cancelBox.open = true
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
    autoAppoint(){
      if (this.autoAppointEnable){
        this.$utils.timeoutDo(1000).then(()=>{
          this.doAppoint()
        })
      }
    },
    refreshCanSelectUserPack(){
      this.selectUserPack={
        id: 0,
        packName: "由系统自动选择",
      }
      this.userPacks = []
      if (this.appointInfo.promotion){
        return
      }
      this.$api.appointDutyTime({
        onlyUserPacks:true,
        coachId: this.coach.id,
        startDate: this.appointInfo.selectDate,
        startTime: this.appointInfo.timeStart,
        endTime: this.appointInfo.timeEnd,
        goodAt: this.appointInfo.goodAt
      }).then((res) => {
        this.userPacks=res.data
      })
    },
    doAppoint() {
      getApp().globalData.ignoreReClick(() => {
        this.autoAppointEnable=true
        if (this.selectPersonalType && this.selectPersonalType>0 && this.appointInfo.selectSitePack<=0){

        }
        this.$api.appointDutyTime({
          coachId: this.coach.id,
          startDate: this.appointInfo.selectDate,
          selectUserPack: this.selectUserPack.id,
          startTime: this.appointInfo.timeStart,
          endTime: this.appointInfo.timeEnd,
          promotion: this.appointInfo.promotion,
          goodAt: this.appointInfo.goodAt,
          selectSitePack: this.appointInfo.selectSitePack,
          sitePackProof: this.selectSitePackAppointProof.proof,
          personType: this.selectPersonalType
        }).then((res) => {
          this.closeAppointBox();
          this.$emit("success")
          this.$utils.beforeAppoint()
        }).catch((reason) => {
          this.closeAppointBox();
        });
      });
    },
    cancelAppoint(){
      this.$api.dutyTimeCancelAppoint({
        coachId: this.coach.id,
        startDate: this.appointInfo.selectDate,
        startTime: this.appointInfo.timeStart,
        endTime: this.appointInfo.timeEnd,
      }).then(_=>{
        this.closeCancelBoxAppointBox()
        this.$emit("success")
      }).catch(_=>{
        this.closeCancelBoxAppointBox()
      })
    }
  }
}
</script>

<style lang="scss">
.outer7 {
  width: 670rpx;
  //height: 100rpx;
  margin-top: 20rpx;
  .selected{
    background-color: $winhouse-main-color;
    .word7{
      color: rgba(248, 249, 253, 1);
    }
    .word8{
      color: rgba(248, 249, 253, 1);
    }
  }
  .noselected{
    background-color: rgba(248, 249, 253, 1);
    .word7{
      color: $winhouse-main-color-1;
    }
    .word8{
      color: $winhouse-main-color-1;
    }
  }

  .Button362 {
    border-radius: 16px;
    height: 100rpx;
    width: 320rpx;
    padding: 37rpx 0 0 0;
    .word7 {
      overflow-wrap: break-word;
      font-size: 28rpx;
      text-align: center;
      white-space: nowrap;
      line-height: 28rpx;
      display: block;
    }
  }
  .bd1 {
    border-radius: 16px;
    height: 100rpx;
    width: 320rpx;
    .word8 {
      overflow-wrap: break-word;
      font-size: 28rpx;
      text-align: center;
      white-space: nowrap;
      line-height: 28rpx;
      display: block;
    }
  }
}
.coach-appoint-box {
  //height: 660rpx;
  //background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/psd9j6es6xx647vikkehmsc33w0cnmihlr245h1e0lwstt9f5c8d85e-fb6a-4786-b42f-7b59530ab18a) 0rpx 0rpx no-repeat;
  width: 750rpx;
  padding: 29rpx 0 40rpx 39rpx;

  .coach-appoint-box1 {
    width: 691rpx;
    //height: 560rpx;

    .site-pack-tips{
      margin: 20rpx 0 0 2rpx;
      width: 670rpx;
      //height: 70rpx;
      .site-pack-tip{
        overflow-wrap: break-word;
        color: rgba(51, 51, 51, 1);
        font-size: 27rpx;
        text-align: left;
        white-space: nowrap;
        line-height: 27rpx;
        margin-top: 21rpx;
        display: block;
      }
    }
    .question-box {
      width: 681rpx;
      height: 70rpx;

      .question {
        //width: 206rpx;
        height: 27rpx;
        overflow-wrap: break-word;
        color: rgba(51, 51, 51, 1);
        font-size: 27rpx;
        font-family: PingFangSC-Medium;
        text-align: left;
        white-space: nowrap;
        line-height: 27rpx;
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
      //height: 33rpx;
      overflow-wrap: break-word;
      color: rgba(0, 0, 0, 1);
      font-size: 31rpx;
      font-family: PingFangSC-Semibold;
      text-align: justifyLeft;
      white-space: nowrap;
      line-height: 33rpx;
      display: block;
      margin: 30rpx 0 0 2rpx;
    }

    .block2 {
      background-color: rgba(255, 255, 255, 1);
      border-radius: 12px;
      height: 212rpx;
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
      margin: 60rpx 0 0 1rpx;

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
        padding: 32rpx 0 0 0;

        .checkin-qr-box-main-text {
          //width: 49rpx;
          height: 25rpx;
          overflow-wrap: break-word;
          color: rgba(255, 255, 255, 1);
          font-size: 26rpx;
          text-align: center;
          white-space: nowrap;
          line-height: 26rpx;
          display: block;
        }
      }
    }
  }
}
.select-user-pack-button{
  width: 670rpx;
  height: 88rpx;
  margin: 20rpx 0 0 1rpx;
  background-color: white;
  border: 1px solid $winhouse-main-color;
  border-radius: 12px;
  color: $winhouse-main-color;
  font-size: 28rpx;
  text-align: center;
  line-height: 88rpx;
  display: block;
}
</style>
