<template>
	<view>
		<view class="float">
			<view class="float-box align-center">
				<view class="price-info flex-col justify-center">
					<view class="price-info-box">
						<text class="price">￥</text>
						<text class="price num">
							{{ infoList.priceOriginal }}
						</text>
					</view>
					<view class="box">
						<text class="text">{课时均价}</text>
						<image
								class="thumbnail"
								src="/static/static/问好.png"/></view>
				</view>
				<button @click="popupAppoint" class="appoint-button">购课</button>
				<button class="button_1" click="changeAdd">
					<text class="text_1">候选</text>
				</button>
			</view>
		</view>
		<u-swiper height="450rpx" :list="infoList.personalAlbum" imgMode="aspectFill"></u-swiper>
		<view @click="back" class="back">
			<view class="arrow">←</view>
		</view>
		<scroll-view scroll-y class="page">

			<u-gap height="240rpx"/>
			<view class="topleft">
				<image :src="infoList.avatar" class="topAvatar"/>
				<image
						v-if="infoList.gender === 1"
						src="/static/static/男-icon.png"
						class="gender"></image>
				<image
						v-if="infoList.gender === 2"
						src="/static/static/女-icon.png"
						class="gender"></image>
				<view class="name">
					<view class="text1">
						<text>{{ infoList.coachNickName }}</text>
					</view>
					<view class="text2">
						<text>【健身教练】</text>
					</view>
				</view>
			</view>
			<view class="page-bg">
				<view class="white">
					<u-gap height="30rpx"/>
					<view class="introduce">
						<text>{{ infoList.introduce }}</text>
					</view>
					<view class="tags flex-row justify-between">
						<view class="tag-item flex-col align-center">
							<image class="item-image" src="/module1/static/年龄.png"/>
							<text class="item-text">{{ _Birthday() }}</text>
						</view>
						<view class="tag-item flex-col align-center">
							<image class="item-image" src="/module1/static/身高.png"/>
							<text class="item-text">{{ infoList.resume.height }}cm</text>
						</view>
						<view class="tag-item flex-col align-center">
							<image class="item-image" src="/module1/static/学历.png"/>
							<text class="item-text">{{ infoList.resume.education }}</text>
						</view>
						<view class="tag-item flex-col align-center">
							<image class="item-image" src="/module1/static/星座.png"/>
							<text class="item-text">{{ infoList.resume.constellation }}</text>
						</view>
					</view>
					<scroll-view
							:indicator="false"
							scroll-x
							class="scroll-social">
						<view class="social">
							<view class="head">
								<image class="social-head-image" src="/module1/static/抖音.png"/>
								<text>抖音</text>
							</view>
							<text class="value">yfz668888</text>
						</view>
						<view class="social">
							<view class="head">
								<image class="social-head-image" src="/module1/static/小红书.png"/>
								<text>小红书</text>
							</view>
							<text class="value">yfz668888</text>
						</view>
						<view class="social">
							<view class="head">
								<image class="social-head-image" src="/module1/static/快手.png"/>
								<text>快手</text>
							</view>
							<text class="value">yfz668888</text>
						</view>
						<view class="social">
							<view class="head">
								<image class="social-head-image" src="/module1/static/视频号.png"/>
								<text>视频号</text>
							</view>
							<text class="value">yfz668888</text>
						</view>
					</scroll-view>
					<u-gap height="40rpx"/>
				</view>
				<!--        教练分析器-->
				<!--      <view class="analyse">-->
				<!--        <view class="top justify-between align-center">-->
				<!--          <view class="top-left align-center">-->
				<!--            <image class="icon" src="/static/detail-icon/教练分析器-icon.png"/>-->
				<!--            <text class="coachText">教练分析器</text>-->
				<!--          </view>-->
				<!--          <button class="all-data-button justify-center align-center">查看全部分析数据 ></button>-->
				<!--        </view>-->
				<!--        <view style="flex-direction: row; margin: 30rpx 0 40rpx 20rpx">-->
				<!--          <text style="font-size: 30rpx;">周均授课</text>-->
				<!--          <text>{{}}</text>-->
				<!--          <text style="font-size: 30rpx;">{节} 教练课量排名前</text>-->
				<!--          <text class="numbertop">{{}}%</text>-->
				<!--        </view>-->
				<!--        <view style="margin: 0 20rpx 0 20rpx">-->
				<!--          <u-line-progress :percentage="82" :showText="false" height="10rpx" active-color="#eba04a">-->
				<!--            <u-avatar-->
				<!--                :src="infoList.avatar"-->
				<!--                shape="circle"-->
				<!--                size="15"-->
				<!--            ></u-avatar>-->
				<!--          </u-line-progress>-->
				<!--        </view>-->
				<!--        <view class="info-3">-->
				<!--          <text>平台累计授课（节）</text>-->
				<!--          <text style="margin-left: 10%">会员总量（人）</text>-->
				<!--          <text style="margin-left: 7%">执教经验（年）</text>-->
				<!--        </view>-->
				<!--        <view class="number">-->
				<!--          <image src="/static/detail-icon/历史成交价.png" style="width: 26rpx; height: 22rpx"></image>-->
				<!--          <text style="margin-left: 8rpx">3296</text>-->
				<!--          <image src="/static/detail-icon/会员总量.png" style="width: 26rpx; height: 22rpx; margin-left: 25%"></image>-->
				<!--          <text style="margin-left: 8rpx">288</text>-->
				<!--          <image src="../../static/detail-icon/执教经验.png" style="width: 26rpx; height: 22rpx; margin-left: 18%"></image>-->
				<!--          <text style="margin-left: 8rpx">9</text>-->
				<!--        </view>-->
				<!--      </view>-->
				<view class="title">
					<text>相册</text>
				</view>
				<view class="album">
					<u-album
							singleMode="aspectFit"
							:urls="_getImgs(infoList.personalAlbum, true)"
							singleSize="730rpx"
							:previewFullImage="false"></u-album>
				</view>
				<view class="albums">
					<u-album

							:urls="_getImgs(infoList.personalAlbum)"
							maxCount="3"
							multipleSize="236rpx"
							show-more></u-album>
				</view>
				<view class="title">资格认证</view>
				<!--        <image-->
				<!--          style="height: 500rpx; width: 100%"-->
				<!--          src="/static/detail-icon/证书奖牌.png"-->
				<!--        ></image>-->
				<view class="certificText">
					<text>资质证书</text>
				</view>
				<view class="certificate-texts">
					<view class="text" v-for="text in infoList.qualificationText" :key="text">{{ text }}</view>
				</view>
				<view @click="certific" class="underline">
					<text class="text">查看证书相册</text>
					<text>→</text>
				</view>
				<view class="certificText">获奖情况</view>
				<view @click="certific" class="underline">
					<text class="text">查看获奖相册</text>
					<text>→</text>
				</view>
				<view class="title">擅长</view>
				<view class="skill">
					<view class="text-box">{{ infoList.like }}</view>
					<image :src="infoList.avatar" class="avatar"></image>
					<view class="text-underline-box">
						<view class="comma1">“</view>
						<view class="line"></view>
						<view class="line"></view>
						<view class="line"></view>
						<view class="comma">”</view>
					</view>
				</view>
				<!--				<view class="title">兴趣爱好</view>-->
				<!--				<view class="tag">-->
				<!--					<u-gap height="15rpx"/>-->
				<!--					<text style="margin-left: 25rpx">{{ infoList.goodAtTypeString }}</text>-->
				<!--				</view>-->
				<!--      <view class="title">会员评价</view>-->
				<!--      <scroll-view :indicator="false" scroll-x style="white-space: nowrap">-->
				<!--        <view v-for="b in 3" class="comment">-->
				<!--          <text style="font-size: 28rpx">111</text>-->
				<!--        </view>-->
				<!--      </scroll-view>-->
				<!--      <view @click="certific" class="underline">-->
				<!--        <text style="text-decoration: underline">显示该教练评价列表</text>-->
				<!--        <text>→</text>-->
				<!--      </view>-->
				<!--      <view class="title">关联场地</view>-->
				<!--      <scroll-view :indicator="false" scroll-x style="white-space: nowrap">-->
				<!--        <view v-for="c in 2" class="site">-->
				<!--          <text>22</text>-->
				<!--        </view>-->
				<!--      </scroll-view>-->
				<!--      <view @click="certific" class="underline">-->
				<!--        <text style="text-decoration: underline">教练更多关联场地</text>-->
				<!--        <text>→</text>-->
				<!--      </view>-->
				<!--      <view class="title">教练动态</view>-->
				<!--      <view class="flex-row">-->
				<!--        <image style="width: 30rpx; height: 10rpx" src="../../static/detail-icon/教练动态-时间分割线.png"/>-->
				<!--      </view>-->
				<u-gap height="140rpx"/>
			</view>
		</scroll-view>
		<u-popup :show="confirmAppoint" :round="10">
			<!--      <view v-if="!goBuySellPack" class="tip-box-class">-->
			<!--        <text class="title">您当前没有该教练的课包</text>-->
			<!--        <text class="tip">点击去购买课包</text>-->
			<!--        <view class="buttons flex-row justify-between">-->
			<!--          <view class="button-close flex-col" @click="noUserPackTipBox=false">关闭</view>-->
			<!--          <view class="button-ok flex-col" @click="getSellPackList()">去购买</view>-->
			<!--        </view>-->
			<!--      </view>-->
			<!--      <view v-else class="tip-box-class">-->
			<view class="tip-box-class">
				<text class="title">请选择课包</text>
				<view class="buy-list">
					<buy-sell-pack-corp ref="buySellPackCorp"></buy-sell-pack-corp>
				</view>
				<view class="buttons flex-row justify-between">
					<view class="button-close flex-col" @click="confirmAppoint = false">关闭</view>
					<view class="button-ok flex-col" @click="$refs.buySellPackCorp.paySelectSellPack()">下单</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import BuySellPackCorp from "../../components/buy-sell-pack-corp/buy-sell-pack-corp.vue";
export default {
	components: {BuySellPackCorp},
	data() {
		return {
			num: 0,
			infoList: [],
			confirmAppoint: false,
		};
	},
	onLoad: function (option) {
		if (option.id) {
			this.num = option.id;
		}
		this.$api
				.getCoachInfo({
					cid: this.num,
				})
				.then((res) => {
					console.log(res.data);
					this.infoList = res.data;
				})
	},
	methods: {
		back() {
			this.$emit("leftClick");
			// if (this.autoBack) {
			uni.navigateBack();
			// }
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
		// 获取相册第一张图片
		_getImgs(array, first = false) {
			if (!array || array.length <= 0) {
				return null;
			}
			if (first) {
				return [array[0]];
			}
			return array.slice(1);
		},
		certific() {
			console.log(this.infoList.certificateAlbum)
			this.$utils.previewImage(this.infoList.certificateAlbum);
		},
		popupAppoint() {
			this.$api
					.getCoachUserPackList({
						coachId: this.num,
						goodAt: 0,
						buy: true,
					})
					.then((res) => {
						this.confirmAppoint = true;
						this.$nextTick(() => {
							this.$refs.buySellPackCorp.init({
								sellPacks: res.data.list,
								expSellPacks: res.data.exp,
								coachId: this.coachId,
								coachName: this.needToKnowData.coachName,
								coachAvatar: this.needToKnowData.coachAvatar,
							});
						});
					});
		},
	},
};
</script>

<style scoped lang="scss">
.float {
	width: 750rpx;
	height: 140rpx;
	border-radius: 20rpx 20rpx 0 0;
	position: absolute;
	bottom: 0; //1075rpx;
	align-items: center;
	z-index: 1;
	background-color: #ffffff;

	.float-box {
		padding: 12rpx;
		display: flex;
		width: 100%;

		.price-info {
			flex: 1;
			margin-left: 25rpx;
			height: 96rpx;

			.price-info-box {
				height: 50rpx;
				//font-weight: 700;
				font-size: 28rpx;
				color: #181818;
				line-height: 50rpx;
				text-align: left;

				.price {
					font-weight: bold;
				}
				.num {
					font-size: 42rpx;
					margin: -10rpx 0 15rpx 0
				}

			}
			.box {
				.text {
					font-size: 22rpx;
					color: #9C9CB0;
				}

				.thumbnail {
					width: 22rpx;
					height: 22rpx;
				}
			}
			.image {
				width: 110rpx;
				height: 30rpx;
				display: block
			}
		}

		.appoint-button {
			color: #ffffff;
			background: linear-gradient(to left, #6bd0ff, #00d9d9);
			width: 180rpx;
			height: 96rpx;
			border-radius: 50rpx;
			margin-right: 20rpx;
			font-size: 36rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.button_1{
			height: 96rpx;
			background: #FFFFFF 100% no-repeat;
			width: 180rpx;
			border-radius: 50rpx;
			border: #DEDEDE solid 1rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.text_1 {
				color: #060c24;
				font-size: 36rpx;
				font-family: Source Han Sans-Regular;
				font-weight: bolder;
			}
		}
	}
}

.back {
	border-radius: 35rpx;
	border: 1rpx solid #ffffff;
	width: 82rpx;
	height: 58rpx;
	margin-left: 30rpx;
	position: absolute;
	top: 100rpx;
	z-index: 1;

	.arrow {
		margin: 10rpx 0 0 25rpx;
		color: #ffffff
	}
}

.page {
	height: 100vh;
	display: flex;
	justify-content: center;
	margin-top: -450rpx;

	.topleft {
		margin: 0 0 70rpx 30rpx;
		flex-direction: row;

		.topAvatar {
			position: absolute;
			margin-top: -20rpx;
			border: 4rpx solid #ffffff;
			border-radius: 50%;
			width: 140rpx;
			height: 140rpx;
		}

		.gender {
			width: 28rpx;
			height: 28rpx;
			position: absolute;
			margin: 90rpx 0 0 120rpx;
		}

		.name {
			flex-direction: column;
			margin: 30rpx 0 0 170rpx;


			.text1 {
				font-size: 42rpx;
				color: #ffffff;
			}

			.text2 {
				font-size: 24rpx;
				color: #ffffff;
				margin-top: 30rpx
			}
		}
	}

	.page-bg {
		background-color: #ededed;

		.white {
			background-color: #FFFFFF;
			.introduce {
				margin: 30rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: #222222;
				line-height: 42rpx;
				text-align: left;
			}

			.tags {
				margin: 30rpx;

				.tag-item {
					align-items: center;

					.item-image {
						width: 50rpx;
						height: 50rpx;
					}

					.item-text {
						width: 100rpx;
						height: 28rpx;
						font-size: 24rpx;
						color: #181818;
						line-height: 28rpx;
						text-align: center;
						margin-top: 20rpx;
					}
				}
			}


			.scroll-social {
				white-space: nowrap;
				width: 95%;
				margin: 0 0 10rpx 30rpx;

				.social {
					border: 1rpx solid #D6F3F9;
					border-radius: 15rpx;
					width: max-content;
					height: 48rpx;
					display: inline-flex;
					margin-right: 10rpx;
					flex-direction: row;
					align-items: center;
					font-size: 20rpx;

					.head {
						height: 100%;
						border-radius: 15rpx 0 0 15rpx;
						background-color: #D6F3F9;
						padding-right: 10rpx;
						display: flex;
						align-items: center;
						width: max-content;

						.social-head-image {
							width: 30rpx;
							height: 30rpx;
							margin: 0 10rpx;
						}
					}

					.value {
						margin: 0 20rpx;
					}
				}
			}
		}

		.analyse {
			border-radius: 15rpx;
			overflow: hidden;
			background-color: #ffffff;
			margin: 10rpx 10rpx 55rpx 10rpx;
			width: 730rpx;

			.top {
				background-color: #181818;
				display: flex;
				width: 100%;
				height: 106rpx;

				.top-left {
					.icon {
						width: 66rpx;
						height: 66rpx;
						margin-left: 20rpx;
					}

					.coachText {
						background: linear-gradient(to left, #ffc98a, #ffeed1);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
						font-size: 28rpx;
						margin-left: 10rpx;


					}
				}

				.all-data-button {
					background: linear-gradient(to left, #ffc98a, #ffeed1);
					border-radius: 30rpx;
					width: 264rpx;
					height: 56rpx;
					margin-right: 20rpx;
					font-weight: 400;
					font-size: 24rpx;
					color: #181818;
					line-height: 28rpx;
					text-align: left;
				}
			}

			.numbertop {
				font-size: 40rpx;
				font-weight: bold;
				font-family: D-DIN;
			}

			.info-3 {
				flex-direction: row;
				font-family: AliPHT3-55Regular;
				font-size: 24rpx;
				margin: 40rpx 0 0 20rpx;
			}

			.number {
				flex-direction: row;
				font-size: 36rpx;
				font-family: D-DIN;
				font-weight: bolder;
				margin: 20rpx 0 30rpx 20rpx;
			}
		}

		.album {
			border-radius: 20rpx;
			margin: 45rpx 10rpx 0 10rpx;
			overflow: hidden;
		}

		.albums {
			margin: 11rpx 10rpx 0 10rpx;
			flex-direction: row;
			border-radius: 20rpx;
			overflow: hidden
		}

		.certificate-texts {
			padding: 20rpx;

			.text {
				font-weight: 400;
				font-size: 28rpx;
				color: #333333;
				line-height: 40rpx;
				text-align: left;
			}
		}

		.certificText {
			font-size: 32rpx;
			font-weight: 600;
			color: #060c24;
			margin: 30rpx 0 30rpx 20rpx;
		}

		.title {
			font-size: 42rpx;
			font-family: AliPHT3-55Regular;
			font-weight: bold;
			margin: 60rpx 0 60rpx 20rpx;
		}

		.skill {
			border: 2rpx solid #fdebbb;
			background-color: #fff8df;
			border-radius: 15rpx;
			height: 220rpx;
			width: 730rpx;
			margin: 0 10rpx;
			position: relative;

			.avatar {
				border: 6rpx solid #ffffff;
				border-radius: 50%;
				width: 90rpx;
				height: 90rpx;
				position: absolute;
				top: 20rpx;
				left: 20rpx;
			}

			.text-box {
				margin: 10rpx 0 0 150rpx;
				font-weight: 400;
				font-size: 30rpx;
				color: #181818;
				line-height: 60rpx;
				text-align: left;
				width: 530rpx;
			}

			.text-underline-box {
				top: 0;
				left: 130rpx;
				width: 530rpx;
				position: absolute;
				height: 210rpx;

				.line {
					height: 60rpx;
					border-bottom: 1px #fad374 dashed;
				}
			}

			.comma1 {
				position: absolute;
				color: #fdebbb;
				font-size: 80rpx;
			}

			.comma {
				position: absolute;
				font-size: 200rpx;
				color: #fdebbb;
				bottom: -110rpx;
				right: 20rpx;
			}

			//.comma::after{
			//  content: ',';
			//  margin: 0;
			//  position: absolute;
			//  font-size: 200rpx;
			//  color: #ffe2bb;
			//  bottom: 20rpx;
			//  right: 5rpx;
			//}
		}

		.underline {
			font-weight: 600;
			font-size: 36rpx;
			margin: 60rpx 0 80rpx 20rpx;

			.text {
				text-decoration: underline
			}
		}

		.tag {
			border-radius: 25rpx;
			background-color: #ffffff;
			width: 98rpx;
			height: 56rpx;
			font-size: 24rpx;
			margin-left: 10rpx;
		}

		.comment {
			border-radius: 15rpx;
			background-color: #ffffff;
			width: 420rpx;
			height: 420rpx;

			margin-left: 10rpx;
			display: inline-flex;
			flex-direction: column;
		}

		.site {
			border-radius: 15rpx;
			background-color: #ffffff;
			width: 420rpx;
			height: 634rpx;
			margin-left: 10rpx;
			display: inline-flex;
		}
	}
}

.cancel {
	color: #060c24;
	background-color: #ffffff;
	border-color: #dedede;
	width: 345rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
}

.confirm {
	color: #ffc98a;
	background-color: #181818;
	width: 345rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
}
</style>
