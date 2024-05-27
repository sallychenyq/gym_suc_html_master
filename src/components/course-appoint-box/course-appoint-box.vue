<template>
	<view>
    <errbox :listen-err="false" ref="errbox"></errbox>
    <u-popup :show="appointBox.open" mode="bottom" round="10" :closeable="true" @close="closeActive">
      <view class="page flex-col">
        <view class="head-avatar flex-col">
          <view class="balance-box-title flex-col">
            <view class="appoint-box flex-col">
              <view class="appoint-box-info flex-col">
                <view class="appoint-tip-box flex-row justify-between">
                  <text class="appoint-tip">确认预约该课程？</text>
                </view>
                <view class="appoint-tip-box flex-row justify-between">
                  <text class="appoint-tip">{{ course.appointTip }}</text>
                </view>
                <text class="appoint-time-info">
                  {{ course.courseName }}&nbsp;|&nbsp;{{ course.startTimeView }}-{{ course.endTimeView }}&nbsp;&nbsp;{{ course.startDateWeekView }}
                </text>
                <view class="appoint-coach-box flex-col justify-center">
                  <view class="appoint-coach-info-box flex-row justify-between">
                    <view class="appoint-coach-avatar flex-col">
                      <view class="flex-col">
                        <u-image :showLoading="true"
                                  :src="course.coachAvatar"
                                  shape="circle"
                                  width="132rpx" height="132rpx" @click="click"></u-image>
                      </view>
                    </view>
                    <view class="appoint-coach-info-text flex-col">
                      <text class="appoint-coach-name">{{ course.coachRealName }}/{{ course.coachNickName }}</text>
                      <view class="appoint-site-box">
                        <text class="appoint-site-label">场地：</text>
                        <text class="appoint-site-view">{{ course.siteName }}</text>
                      </view>
                      <view class="appoint-paymode-box">
                        <text class="appoint-paymode-label">收费：</text>
                        <text class="appoint-paymode-view">{{ course.payModeView }}<text v-if="payModeIsPack(course.payMode)">({{ course.packPayCount }}课时)</text></text>
                      </view>
                    </view>
                  </view>
                </view>
                <view v-if="course.appointProofSelect">
<!--                  <text class="appoint-tip">选择预约方式？</text>-->
<!--                  按照每个选择框高度80，高于210后，最高210-->
                  <u-list :height="(course.appointProofSelect.length*80)>210?210:(course.appointProofSelect.length*80)" showScrollbar>
                    <u-list-item
                        v-for="(item, index) in course.appointProofSelect"
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
<!--                              <text class="sellpack-price">{{ item.packAmt }}</text>-->
<!--                              <text class="sellpack-jg">元</text>-->
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
                <view class="appoint-buttons flex-row justify-between">
                  <button class="appoint-button-close flex-col" @click="closeActive">
                    <text class="appoint-button-close-view">取消</text>
                  </button>
                  <button class="appoint-button-yes flex-col" @click="appointCourse">
                    <text class="appoint-button-yes-view">预约</text>
                  </button>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </u-popup>
    <u-popup :show="appointLiveBox" mode="bottom" round="10" :closeable="true" @close="closeActive">
      <view class="page flex-col">
        <view class="head-avatar flex-col">
          <view class="balance-box-title flex-col">
            <view class="appoint-box flex-col">
              <view class="appoint-box-info flex-col">
                <view class="appoint-tip-box flex-row justify-between">
                  <text class="appoint-tip">确认预约该直播？</text>
                </view>
                <view class="appoint-tip-box flex-row justify-between">
                  <text class="appoint-tip">{{ live.readme }}</text>
                </view>
                <text class="appoint-time-info">
                  {{ live.name }}&nbsp;|&nbsp;{{ live.startTimeView }}-{{ live.endTimeView }}&nbsp;&nbsp;{{ live.startDateWeekView }}
                </text>
                <view class="appoint-coach-box flex-col justify-center">
                  <view class="appoint-coach-info-box flex-row justify-between">
                    <view class="appoint-coach-avatar flex-col">
                      <view class="flex-col">
                        <u-image :showLoading="true"
                                  :src="live.coachAvatar"
                                  shape="circle"
                                  width="132rpx" height="132rpx"></u-image>
                      </view>
                    </view>
                    <view class="appoint-coach-info-text flex-col">
                      <text class="appoint-coach-name">{{ live.coachRealName }}/{{ live.liveAnchor }}</text>
                      <view class="appoint-site-box">
                        <text class="appoint-site-label">课程类型：</text>
                        <text class="appoint-site-view">{{ live.courseTempName }}</text>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="appoint-buttons flex-row justify-between">
                  <button class="appoint-button-close flex-col" @click="closeActive">
                    <text class="appoint-button-close-view">取消</text>
                  </button>
                  <button class="appoint-button-yes flex-col" @click="appointLive()">
                    <text class="appoint-button-yes-view">确定</text>
                  </button>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </u-popup>
    <u-popup :show="coursePersonalSignBox.open" mode="bottom" round="10" :closeable="true" @close="closeActive">
      <view class="page flex-col">
        <view class="head-avatar flex-col">
          <view class="balance-box-title flex-col">
            <view class="appoint-box flex-col">
              <view class="appoint-box-info flex-col">
                <view class="appoint-tip-box flex-row justify-between">
                  <text class="appoint-tip">您将要签约小班课课程</text>
                </view>
                <view class="appoint-tip-box flex-row justify-between">
                  <text class="appoint-tip">{{ coursePersonal.notice }}</text>
                </view>
                <text class="appoint-time-info">
                  {{ coursePersonal.courseName }}
                </text>
                <view class="appoint-coach-box flex-col justify-center">
                  <view class="appoint-coach-info-box flex-row justify-between">
                    <view class="appoint-coach-avatar flex-col">
                      <view class="flex-col">
                        <u-image :showLoading="true"
                                  :src="coursePersonal.coachAvatar"
                                  shape="circle"
                                  width="132rpx" height="132rpx"></u-image>
                      </view>
                    </view>
                    <view class="appoint-coach-info-text flex-col">
                      <text class="appoint-coach-name">{{ coursePersonal.coachRealName }}/{{ coursePersonal.coachNickName }}</text>
<!--                      <view class="appoint-site-box">-->
<!--                        <text class="appoint-site-label">您希望上几节课：</text>-->
<!--                        <view class="appoint-site-view"><u-number-box></u-number-box></view>-->
<!--                      </view>-->
                      <view class="appoint-paymode-box">
                        <text class="appoint-paymode-label">收费：</text>
                        <text class="appoint-paymode-view">需课包余额大于{{ coursePersonal.minJoinCount }}</text>
                      </view>
                    </view>
                  </view>
                </view>
                <u-gap height="2" :bgColor="$utils.getColors().main1"></u-gap>
                <view class="appoint-buttons flex-row justify-between">
                  <button class="appoint-button-close flex-col" @click="closeActive">
                    <text class="appoint-button-close-view">取消</text>
                  </button>
                  <button class="appoint-button-yes flex-col" @click="doSignCoursePersonal">
                    <text class="appoint-button-yes-view">签约{{coursePersonalSignBox.joinCount}}课时</text>
                  </button>
<!--                  <u-number-box :integer="true" v-model="coursePersonalSignBox.signCount">-->
<!--                    <button slot="minus"-->
<!--                            class="appoint-button-cut flex-col"-->
<!--                            @click="coursePersonalSignBox.joinCount-=1">-->
<!--                      <text class="appoint-button-cut-view">减少</text>-->
<!--                    </button>-->
<!--                    <view slot="input" class="appoint-input-count flex-col">-->
<!--                      <text class="appoint-input-count-view" @click="doSignCoursePersonal">签约{{coursePersonalSignBox.joinCount}}课时</text>-->
<!--                    </view>-->
<!--                    <button slot="plus"-->
<!--                            class="appoint-button-add flex-col"-->
<!--                            @click="coursePersonalSignBox.joinCount+=1">-->
<!--                      <text class="appoint-button-add-view">增加</text>-->
<!--                    </button>-->
<!--                  </u-number-box>-->
<!--                  -->
                </view>

              </view>
            </view>
          </view>
        </view>
      </view>
    </u-popup>
    <recharge @success="autoAppoint"></recharge>
	</view>
</template>

<script>
	import Recharge from "../recharge";
  import UNumberBox from "../../uview-ui/components/u-number-box/u-number-box";
  import UForm from "../../uview-ui/components/u-form/u-form";
  import UFormItem from "../../uview-ui/components/u-form-item/u-form-item";
  import UGap from "../../uview-ui/components/u-gap/u-gap";
  import Errbox from "../errbox/errbox";
  import UImage from "../../uview-ui/components/u--image/u--image.vue";
  import UPopup from "../../uview-ui/components/u-popup/u-popup.vue";
  export default {
		name:"course-appoint-box",
    components: {UPopup, UImage, Errbox, UGap, UFormItem, UForm, UNumberBox, Recharge},
    data() {
			return {
        autoAppointEnable:false,
        autoAppointPersonalEnable:false,
        live:{},
        appointLiveBox:false,
        course:{},
        appointCourseProof:null,
        coursePersonal:{},
        appointBox:{
          open:false
        },
        coursePersonalSignBox:{
          open:false,
          joinCount:0
        },
        cancelBox:{
          open:false,
          content:'取消课程后，如果您消费了课包，您的课时余额将会返还到课包账户'
        }
			};
		},
		created(){
			const that=this
      uni.$on('appointBox.close',function () {
        that.closeAppointBox()
      })
      uni.$on('cancelBox.close',function () {
        that.closeCancelBox()
      })
		},
    methods:{
      signCoursePersonal(id){
        this.$api.getCoursePersonalOne({
          courseId: id,
        }).then(res=>{
          this.coursePersonal=res.data
          this.coursePersonalSignBox.open=true
          this.coursePersonalSignBox.joinCount=res.data.minJoinCount
          this.autoAppointPersonalEnable=false
        })
      },
      openAppointLive(id){
        this.$api.getLiveOne({
          liveId: id,
        }).then(res=>{
          this.live=res.data
          this.appointLiveBox=true
        })
      },
      openAppointCourse(id){
        this.$api.getCourseOne({
          courseId: id,
        }).then(res=>{
          this.course=res.data
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
        })
      },
      openCancelCourse(id){
        this.$api.getCourseOne({
          courseId: id,
        }).then(res=>{
          this.course=res.data
          const that=this
          let message="";
          if (this.course.courseCate===0){
            message="取消课程后，如果您消费了课包，您的课时余额将会返还到课包账户，确认取消预约吗?"
          }else {
            message="您正在取消预约的课程，课程取消后，将不会再收到预约提醒，确认取消预约吗?"
          }
          this._confirm({
            title: '确认取消预约',
            okButton: '取消预约',
            content: message,
            success: function () {
              that.cancelAppoint(id)
            }
          })
        })
      },
      openCancelLive(id){
        this.$api.getLiveOne({
          liveId: id,
        }).then(res=>{
          this.live=res.data
          const that=this
          let message="您正在取消预约的课程，课程取消后，将不会再收到预约提醒，确认取消预约吗?"
          this._confirm({
            title: '确认取消预约',
            okButton: '取消预约',
            content: message,
            success: function () {
              that.cancelAppointLive(id)
            }
          })
        })
      },
      closeAppointBox(){
        this.appointBox.open=false
        this.coursePersonalSignBox.open=false
        this.appointLiveBox=false
      },
      closeActive(){
        this.closeAppointBox()
        this.autoAppointEnable=false
        this.autoAppointPersonalEnable=false
      },
      autoAppoint(){
        if (this.autoAppointEnable){
          this.$utils.timeoutDo(1000).then(()=>{
            this.appointCourse()
          })
        }
        if (this.autoAppointPersonalEnable){
          this.$utils.timeoutDo(1000).then(()=>{
            this.doSignCoursePersonal()
          })
        }

      },
      emitCloseAppointBox(){
        this.closeAppointBox()
        // uni.$emit('appointBox.close')
      },
      closeCancelBox(){
        this.cancelBox.open=false
      },
      emitCloseCancelBox(){
        this.closeCancelBox()
        uni.$emit('cancelBox.close')
      },
      payModeIsPack(mode){
        return mode===2
      },
      doSignCoursePersonal(){
        const data={
          coursePersonalId:this.coursePersonal.id,
          joinCount: this.coursePersonalSignBox.joinCount
        }
        this.$api.signCoursePersonal(data).then(res=>{
          this.$emit("success")
          this.emitCloseAppointBox()
        }).catch(err => {
          this.emitCloseAppointBox()
        })
      },
      appointCourse(){
        getApp().globalData.ignoreReClick(()=>{
          this.autoAppointEnable=true
          let proof = null
          try {
            if (this.appointCourseProof>=0 && this.course.appointProofSelect[this.appointCourseProof]){
              proof = this.course.appointProofSelect[this.appointCourseProof]
            }
          }catch (e) {

          }
          this.$api.appointCourse({
            courseId:this.course.id,
            proof:proof
          }).then(_=>{
            this.$emit("success")
            this.emitCloseAppointBox()
            this.$utils.beforeAppoint()
          }).catch(err=>{
            this.emitCloseAppointBox()
          })
        })
      },
      appointLive(){
        getApp().globalData.ignoreReClick(()=>{
          this.$api.appointLive({
            liveId:this.live.id
          }).then(_=>{
            this.$emit("success")
            this.emitCloseAppointBox()
            this.$utils.beforeAppoint()
          }).catch(err=>{
            this.emitCloseAppointBox()
          })
        })
      },
      cancelAppoint(course){
        this.autoAppointEnable=false
        this.$api.cancelAppointCourse({
          courseId:course
        }).then(_=>{
          this.emitCloseCancelBox()
          this.$emit("success")
        }).catch(err=>{
          this.emitCloseCancelBox()
        })
      },
      cancelAppointLive(liveId){
        this.$api.cancelAppointLive({
          liveId:liveId
        }).then(_=>{
          this.emitCloseCancelBox()
          this.$emit("success")
        }).catch(err=>{
          this.emitCloseCancelBox()
        })
      }
    }
	}
</script>

<style lang="scss">
.sellpack-one-box {
  border-radius: 12px;
  //height: 142rpx;
  border: 1px solid rgba(250, 250, 250, 1);
  &.selected{
    box-shadow: 0 0 5px $winhouse-main-color;
    //border: 3px solid $winhouse-main-color;
  }
  //margin-top: 30rpx;
  margin: 10rpx 10rpx 0 10rpx;
  //width: 559rpx;
  padding: 28rpx 0 40rpx 28rpx;
  background-color: rgba(0,0,0,0.03);
  .sellpack-one {
    //width: 490rpx;
    //height: 73rpx;
    .sellpack-one-info-box {
      width: 337rpx;
      //height: 73rpx;
      .sellpack-one-title {
        width: 274rpx;
        height: 27rpx;
        overflow-wrap: break-word;
        color: rgba(0, 0, 0, 1);
        font-size: 28rpx;
        font-family: PingFangSC-Medium;
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
        font-family: PingFangSC-Medium;
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
          font-family: PingFangSC-Medium;
          text-align: left;
          white-space: nowrap;
          line-height: 27rpx;
        }
        .sellpack-ks {
          width: 336rpx;
          overflow-wrap: break-word;
          color: rgba(102, 102, 102, 1);
          font-size: 28rpx;
          font-family: PingFangSC-Medium;
          text-align: left;
          white-space: nowrap;
          line-height: 28rpx;
        }
        .sellpack-price {
          width: 336rpx;
          overflow-wrap: break-word;
          color: $winhouse-main-color;
          font-size: 28rpx;
          font-family: PingFangSC-Medium;
          text-align: left;
          white-space: nowrap;
          line-height: 28rpx;
        }
        .sellpack-price-discount {
          width: 336rpx;
          overflow-wrap: break-word;
          color: $winhouse-main-color;
          font-size: 48rpx;
          font-family: PingFangSC-Medium;
          text-align: left;
          white-space: nowrap;
          line-height: 28rpx;
        }
        .sellpack-jg {
          width: 336rpx;
          overflow-wrap: break-word;
          color: rgba(102, 102, 102, 1);
          font-size: 28rpx;
          font-family: PingFangSC-Medium;
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
.cancel-box-text{
  height: 500rpx;
}
.appoint-box {
  //height: 660rpx;
  width: 750rpx;
  padding: 29rpx 0 0 39rpx;
  .appoint-box-info {
    width: 691rpx;
    //height: 560rpx;
    .appoint-tip-box {
      width: 681rpx;
      //height: 70rpx;
      .appoint-tip {
        width: 681rpx;
        //height: 27rpx;
        overflow-wrap: break-word;
        color: rgba(51, 51, 51, 1);
        font-size: 27rpx;
        font-family: PingFangSC-Medium;
        text-align: left;
        line-height: 44rpx;
        margin-top: 21rpx;
        display: block;
      }
    }
    .appoint-time-info {
      width: 389rpx;
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
    .appoint-coach-box {
      background-color: rgba(255, 255, 255, 1);
      border-radius: 12px;
      height: 212rpx;
      border: 1px solid rgba(247, 247, 247, 1);
      padding-left: 29rpx;
      width: 690rpx;
      margin: 39rpx 0 0 1rpx;
      .appoint-coach-info-box {
        width: 397rpx;
        height: 132rpx;
        .appoint-coach-avatar {
          height: 132rpx;
          width: 132rpx;
        }
        .appoint-coach-info-text {
          width: 245rpx;
          height: 106rpx;
          margin-top: 10rpx;
          .appoint-coach-name {
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
          .appoint-site-box {
            width: 244rpx;
            height: 23rpx;
            overflow-wrap: break-word;
            font-size: 0;
            text-align: justifyLeft;
            white-space: nowrap;
            line-height: 23rpx;
            margin: 18rpx 0 0 1rpx;
            .appoint-site-label {
              width: 244rpx;
              height: 23rpx;
              overflow-wrap: break-word;
              color: rgba(153, 153, 153, 1);
              font-size: 23rpx;
              text-align: left;
              white-space: nowrap;
              line-height: 23rpx;
            }
            .appoint-site-view {
              width: 244rpx;
              height: 23rpx;
              overflow-wrap: break-word;
              color: rgba(17, 17, 17, 1);
              font-size: 23rpx;
              text-align: left;
              white-space: nowrap;
              line-height: 23rpx;
            }
          }
          .appoint-paymode-box {
            width: 116rpx;
            height: 23rpx;
            overflow-wrap: break-word;
            font-size: 0;
            text-align: justifyLeft;
            white-space: nowrap;
            line-height: 23rpx;
            margin-top: 14rpx;
            .appoint-paymode-label {
              width: 116rpx;
              height: 23rpx;
              overflow-wrap: break-word;
              color: rgba(153, 153, 153, 1);
              font-size: 23rpx;
              text-align: left;
              white-space: nowrap;
              line-height: 23rpx;
            }
            .appoint-paymode-view {
              width: 116rpx;
              height: 23rpx;
              overflow-wrap: break-word;
              color: rgba(17, 17, 17, 1);
              font-size: 23rpx;
              text-align: left;
              white-space: nowrap;
              line-height: 23rpx;
            }
          }
        }
      }
    }
    .appoint-buttons {
      width: 670rpx;
      height: 88rpx;
      margin: 60rpx 0 60rpx 1rpx;
      .appoint-button-cut {
        background-color: $winhouse-main-color-1;
        border-radius: 44px 0 0 44px;
        height: 88rpx;
        width: 99rpx;
        padding: 32rpx 0 0 0;
        .appoint-button-cut-view {
          //width: 48rpx;
          height: 25rpx;
          //overflow-wrap: break-word;
          color: $winhouse-main-color;
          font-size: 26rpx;
          text-align: center;
          //white-space: nowrap;
          line-height: 26rpx;
          display: block;
        }
      }
      .appoint-input-count {
        background-color: $winhouse-main-color;
        //border-radius: 44px;
        height: 88rpx;
        width: 242rpx;
        padding: 32rpx 0 0 0;
        border-left:2rpx solid $winhouse-main-color;;
        border-right:2rpx solid $winhouse-main-color;;
        .appoint-input-count-view {
          //width: 48rpx;
          height: 25rpx;
          //overflow-wrap: break-word;
          color:  rgba(255, 255, 255, 1);
          font-size: 26rpx;
          text-align: center;
          //white-space: nowrap;
          line-height: 26rpx;
          display: block;
        }
      }
      .appoint-button-add {
        background-color: $winhouse-main-color-1;
        border-radius: 0 44px 44px 0;
        height: 88rpx;
        width: 99rpx;
        padding: 32rpx 0 0 0;
        .appoint-button-add-view {
          //width: 49rpx;
          height: 25rpx;
          //overflow-wrap: break-word;
          color: $winhouse-main-color;
          font-size: 26rpx;
          text-align: center;
          //white-space: nowrap;
          line-height: 26rpx;
          display: block;
        }
      }
      .appoint-button-close {
        background-color: $winhouse-main-color-1;
        border-radius: 44px;
        height: 88rpx;
        width: 320rpx;
        padding: 32rpx 0 0 0;
        .appoint-button-close-view {
          //width: 48rpx;
          height: 25rpx;
          overflow-wrap: break-word;
          color: $winhouse-main-color;
          font-size: 26rpx;
          text-align: center;
          white-space: nowrap;
          line-height: 26rpx;
          display: block;
        }
      }
      .appoint-button-yes {
        background-color: $winhouse-main-color;
        border-radius: 44px;
        height: 88rpx;
        width: 320rpx;
        padding: 32rpx 0 0 0;
        .appoint-button-yes-view {
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

</style>
