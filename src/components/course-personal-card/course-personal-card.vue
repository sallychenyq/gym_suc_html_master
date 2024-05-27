<template>
	<!--	<view class="card">-->
	<view class="card flex-col">
		<view class="time-bg flex-row">
			<view :class="[item.open?'':'disable']" class="time-bg-tag flex-col">
				<text class="time">{{ item.openStatusView }}</text>
			</view>
		</view>
		<view class="course-main-box flex-row" @click="$v_router.push(`/pages/course-personal-detail/index?id=${item.id}`)">
			<view class="avatar-box flex-col">
				<view class="flex-col">
					<u-image :showLoading="true"
						:src="item.coachAvatar"
                    shape="circle"
						width="132rpx" height="132rpx" @click.stop="$v_router.push(`/pages/coach-home/index?id=${item.coachId}`)"></u-image>
          <text class="course-coach-name">{{ item.coachRealName }}{{ item.coachNickName?`/${item.coachNickName}`:'' }}</text>
				</view>
			</view>
			<view class="course-box flex-col">
				<view class="course-info1 flex-row justify-between">
					<text class="course-name">{{ item.courseName }}</text>
<!--					<text class="course-count" v-if="item.signed"><text class="appoint-count">已签:{{ item.contract.joinCount }}节</text>·剩余:{{ item.contract.joinCountBalance }}节</text>-->
<!--          <text class="course-count" v-else><text class="appoint-count">等待签约</text></text>-->
<!--					<text class="course-count" v-else-if="item.signUserNumber"><text class="appoint-count">已签:{{item.signUserNumber}}人</text></text>-->
<!--					<text class="course-count" v-else><text class="appoint-count">已签:{{item.signUserNumber}}人</text></text>-->
<!--					<text class="course-count" v-else><text class="appoint-count"></text></text>-->
				</view>
				<view class="sign-number" v-if="item.signUserNumber">
					<text class="sign-number-label">已参与：</text>
					<text class="sign-number-count">{{item.signUserNumber}}人</text>
				</view>

<!--        <view class="course-coach">-->
<!--					<text class="coach-name-label">老师：</text>-->
<!--					<text class="coach-name">{{ item.coachRealName }}/{{ item.coachNickName }}</text>-->
<!--				</view>-->
				<view class="course-site">
					<text class="course-site-label">下一节：</text>
					<text class="course-site-name" v-if="item.haveNextCourse">{{ $utils.timeago(item.nextCourseTime) }} {{ $utils.weekStr(item.nextCourseTime) }}</text>
					<text class="course-site-name" v-else>暂无</text>
				</view>
				<view class="course-pay-mode">
					<text class="course-pay-mode-label">总课时：</text>
          <text class="course-pay-mode-view">{{ item.minJoinCount }}节
            <text v-if="item.signed">(已签:{{ item.contract.joinCount }}节)</text>
          </text>
				</view>
        <block v-if="item.dutyTimesView && item.dutyTimesView.length>0">
          <view class="course-pay-mode">
            <text class="course-pay-mode-label">上课时间：</text>
            <text class="course-pay-mode-view"></text>
          </view>
          <view class="course-pay-mode" v-for="(classes,index) in item.dutyTimesView" :key="index">
            <text class="course-pay-mode-label"></text>
            <text class="course-pay-mode-view">{{ classes }}</text>
          </view>
        </block>
			</view>
<!--      <view v-if="item.appointed">-->
<!--        <button v-if="item.canCancelAppoint" class="appoint-button flex-col appointed" @click="cancelAppoint">-->
<!--          <text class="appoint-button-view">取消预约</text>-->
<!--        </button>-->
<!--        <button v-else class="appoint-button flex-col appointed">-->
<!--          <text class="appoint-button-view">{{ item.cannotCancelAppointReason }}</text>-->
<!--        </button>-->
<!--      </view>-->
      <view>
        <button v-if="item.canSign" class="appoint-button flex-col" @click.stop="appoint">
          <text class="appoint-button-view">签约</text>
        </button>
        <button v-else class="appoint-button flex-col disable">
          <text class="appoint-button-view">{{ item.canNotSignReason }}</text>
        </button>
      </view>
		</view>
	</view>
</template>

<script>
  import UImage from "../../uview-ui/components/u--image/u--image.vue";

  export default {
		name: "course-personal-card",
    components: {UImage},
    props:{
      item:{
        type:Object
      }
    },
    created() {
    },
    data() {
			return {

			};
		},
    methods:{
      appoint(){
        this.$emit('sign')
      },
      cancelAppoint(){
        this.$emit('cancel')
      }
    }
	}
</script>

<style lang="scss">
	.card {
		box-shadow: 0px 3px 16px 0px rgba(210, 210, 210, 0.13);
		background-color: rgba(255, 255, 255, 1);
		border-radius: 12px;
		//height: 288rpx;
		width: 690rpx;
    margin: 30rpx auto 0 auto;

		.time-bg {
			width: 236rpx;
			height: 56rpx;

			.time-bg-tag {
				background-color: $winhouse-main-color-1;

				//border-radius: 0px 20px 0px 12px;
				border-radius: 12px 0 12px 0;
				height: 56rpx;
				//width: 236rpx;
				padding: 15rpx 30rpx 0 30rpx;

				.time {
					//width: 176rpx;
					overflow-wrap: break-word;
					color: $winhouse-main-color;
					font-size: 32rpx;
					font-family: PingFangSC-Semibold;
					text-align: center;
					white-space: nowrap;
					line-height: 32rpx;
					display: block;
				}
			}

			.disable {
				background-color: rgba(200, 200, 200, 1);

				.time {
					color: rgba(255, 255, 255, 1);
				}
			}
		}

		.course-main-box {
			width: 630rpx;
			//height: 152rpx;
			margin: 40rpx 0 40rpx 30rpx;

			.avatar-box {
				background-color: rgba(237, 242, 255, 1);
				border-radius: 50%;
				height: 132rpx;
				width: 132rpx;

				//.outer1 {
				//	height: 132rpx;
				//	background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps8x0d8ofp72yphkt9ghewayy80dnxko6rchpf183to61dcxr04e930e0-2f03-4b6c-bb95-b44eb445afd4) -12rpx 0rpx no-repeat;
				//	width: 132rpx;

				.avatar {
					width: 132rpx;
					height: 132rpx;
					//background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps6xqifivaijgiudiggbacii9ip44pldikt7xuoka66iggb93203af77-0135-4d35-a1a4-f0e3273aebde) -9rpx -6rpx no-repeat;
				}
        .course-coach-name{
          text-align: center;
          margin: 13rpx 0 18rpx 0;
          font-size: 20rpx;
          display: block;
          white-space: nowrap;
          overflow-wrap: break-word;
        }
				//}
			}

			.course-box {
				width: 239rpx;
				//height: 150rpx;
				margin-left: 25rpx;

				.course-info1 {
					//width: 141rpx;
					height: 29rpx;

					.course-name {
						//width: 84rpx;
						height: 29rpx;
						overflow-wrap: break-word;
						color: rgba(0, 0, 0, 1);
						font-size: 29rpx;
						text-align: left;
						white-space: nowrap;
						line-height: 29rpx;
						display: block;
					}

					.course-count {
						//width: 32rpx;
						height: 23rpx;
						overflow-wrap: break-word;
						color: rgba(153, 153, 153, 1);
						font-size: 23rpx;
						//text-align: justifyLeft;
						white-space: nowrap;
						line-height: 29rpx;
            margin: 1rpx 0 0 10rpx;
						//margin-top: 1rpx;
						display: block;

						.appoint-count {
							color: $winhouse-main-color;
						}

						.disable {
							color: rgba(153, 153, 153, 1);
							background-color: rgba(255, 255, 255, 1);
						}
					}
				}

				.sign-number {
					width: 112rpx;
					height: 23rpx;
					overflow-wrap: break-word;
					font-size: 0;
					text-align: justifyLeft;
					white-space: nowrap;
					line-height: 23rpx;
					margin: 20rpx 0 0 1rpx;

					.sign-number-label {
						width: 112rpx;
						height: 23rpx;
						overflow-wrap: break-word;
						color: rgba(153, 153, 153, 1);
						font-size: 23rpx;
						text-align: left;
						white-space: nowrap;
						line-height: 23rpx;
					}

					.sign-number-count {
						width: 112rpx;
						height: 23rpx;
						overflow-wrap: break-word;
            color: $winhouse-main-color;
						//color: rgba(153, 153, 153, 1);
						font-size: 23rpx;
						text-align: left;
						white-space: nowrap;
						line-height: 23rpx;
					}
				}
				.course-coach {
					width: 112rpx;
					height: 23rpx;
					overflow-wrap: break-word;
					font-size: 0;
					text-align: justifyLeft;
					white-space: nowrap;
					line-height: 23rpx;
					margin: 20rpx 0 0 1rpx;

					.coach-name-label {
						width: 112rpx;
						height: 23rpx;
						overflow-wrap: break-word;
						color: rgba(153, 153, 153, 1);
						font-size: 23rpx;
						text-align: left;
						white-space: nowrap;
						line-height: 23rpx;
					}

					.coach-name {
						width: 112rpx;
						height: 23rpx;
						overflow-wrap: break-word;
						//color: rgba(153, 153, 153, 1);
						font-size: 23rpx;
						text-align: left;
						white-space: nowrap;
						line-height: 23rpx;
					}
				}

				.course-site {
					width: 239rpx;
					height: 23rpx;
					overflow-wrap: break-word;
					font-size: 0;
					text-align: justifyLeft;
					white-space: nowrap;
					line-height: 23rpx;
					margin-top: 17rpx;

					.course-site-label {
						width: 239rpx;
						height: 23rpx;
						overflow-wrap: break-word;
						color: rgba(153, 153, 153, 1);
						font-size: 23rpx;
						text-align: left;
						white-space: nowrap;
						line-height: 23rpx;
					}

					.course-site-name {
						width: 239rpx;
						height: 23rpx;
						overflow-wrap: break-word;
						//color: rgba(153, 153, 153, 1);
						font-size: 23rpx;
						text-align: left;
						white-space: nowrap;
						line-height: 23rpx;
					}
				}

				.course-pay-mode {
					width: 116rpx;
					height: 23rpx;
					overflow-wrap: break-word;
					font-size: 0;
					text-align: justifyLeft;
					white-space: nowrap;
					line-height: 23rpx;
					margin-top: 15rpx;

					.course-pay-mode-label {
						width: 116rpx;
						height: 23rpx;
						overflow-wrap: break-word;
						color: rgba(153, 153, 153, 1);
						font-size: 23rpx;
						text-align: left;
						white-space: nowrap;
						line-height: 23rpx;
					}

					.course-pay-mode-view {
						width: 116rpx;
						height: 23rpx;
						overflow-wrap: break-word;
						//color: rgba(153, 153, 153, 1);
						font-size: 23rpx;
						text-align: left;
						white-space: nowrap;
						line-height: 23rpx;
					}
				}
			}

			.appoint-button {
				background-color: $winhouse-main-color;
				border-radius: 30px;
				height: 60rpx;
				width: 150rpx;
				margin: 0 0 0 84rpx;
        padding-top: 19rpx;
				//padding: 19rpx 0 0 41rpx;

				.appoint-button-view {
					width: 150rpx;
					height: 23rpx;
					overflow-wrap: break-word;
					color: rgba(255, 255, 255, 1);
					font-size: 24rpx;
					//text-align: justifyLeft;
					white-space: nowrap;
					line-height: 24rpx;
					display: block;
				}
			}

			.disable {
				background-color: rgba(232, 232, 232, 1);
			}

			.appointed {
				border: 1px solid $winhouse-main-color;
				background-color: rgba(255, 255, 255, 1);
				.appoint-button-view {
					color: $winhouse-main-color;
				}
			}
		}
	}
</style>
