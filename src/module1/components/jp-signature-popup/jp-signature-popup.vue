<template>
	<div class="signature">
		<div class="inputs" v-if="!popup">
			<div class="label" :class="required?'labelqr':''">{{label}}</div>
			<div>
				<div v-if="value" class="images">
					<image  class="images" mode="aspectFit" :src="value"></image>
					<view v-if="!readonly" @click="toDeleteImg" class="icons">
						<!-- #ifndef MP-WEIXIN -->
						<svg t="1685617606397" class="icon" viewBox="0 0 1024 1024" version="1.1"
							xmlns="http://www.w3.org/2000/svg" p-id="3710" width="32" height="32">
							<path
								d="M202.666667 256h-42.666667a32 32 0 0 1 0-64h704a32 32 0 0 1 0 64H266.666667v565.333333a53.333333 53.333333 0 0 0 53.333333 53.333334h384a53.333333 53.333333 0 0 0 53.333333-53.333334V352a32 32 0 0 1 64 0v469.333333c0 64.8-52.533333 117.333333-117.333333 117.333334H320c-64.8 0-117.333333-52.533333-117.333333-117.333334V256z m224-106.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z m-32 288a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0V437.333333z m170.666666 0a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0V437.333333z"
								fill="#d81e06" p-id="3711"></path>
						</svg>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<view class="Deletes">X</view>
						<!-- #endif -->
					</view>
				</div>
				<div v-if="!value && !readonly" class="explain" @click="toPop">
					{{placeholder?placeholder:'点击签名'}}
				</div>
			</div>
		</div>
		<view class="bottomPopup" v-if="showPopup">
			<transition name="slide-up" appear>
				<view class="popup-content">
					<view class="popup">
						<div class="hader" v-if="!isHeight">
							<div @click="toclear">取消</div>
							<div class="text">{{label}}</div>
							<div @click="isEmpty">确定</div>
						</div>
						<div class="wgSignature">
							<div v-if="isHeight" key="999" style="width: 750rpx ;height: 100vh;">
								<jp-signature v-if="" :beforeDelay="200" landscape disableScroll ref="signatureRef"
									:openSmooth="true" :penSize="6" :bounding-box="true"></jp-signature>
							</div>
							<div v-else key="888" style="width: 750rpx ;height: 35vh;">
								<jp-signature :beforeDelay="200" :penSize="4" disableScroll ref="signatureRef" :openSmooth="true"
									:bounding-box="true"></jp-signature>
							</div>
							<div v-if="!isHeight" class="magnify" @click="Tomagnify">
								<!-- #ifndef MP-WEIXIN -->
								<svg t="1686894300542" class="icon" viewBox="0 0 1024 1024" version="1.1"
									xmlns="http://www.w3.org/2000/svg" p-id="3201" width="32" height="32">
									<path
										d="M853.333333 0h-682.666666C75.093333 0 0 75.093333 0 170.666667v682.666666C0 948.906667 75.093333 1024 170.666667 1024h682.666666c95.573333 0 170.666667-75.093333 170.666667-170.666667v-682.666666C1024 75.093333 948.906667 0 853.333333 0zM955.733333 853.333333c0 54.613333-47.786667 102.4-102.4 102.4h-682.666666c-54.613333 0-102.4-47.786667-102.4-102.4v-682.666666C68.266667 116.053333 116.053333 68.266667 170.666667 68.266667h682.666666c54.613333 0 102.4 47.786667 102.4 102.4v682.666666z"
										fill="#777777" p-id="3202"></path>
									<path
										d="M402.773333 573.44L204.8 771.413333V648.533333c0-20.48-13.653333-34.133333-34.133333-34.133333s-34.133333 13.653333-34.133334 34.133333v204.8c0 20.48 13.653333 34.133333 34.133334 34.133334h204.8c20.48 0 34.133333-13.653333 34.133333-34.133334s-13.653333-34.133333-34.133333-34.133333H252.586667l197.973333-197.973333c13.653333-13.653333 13.653333-34.133333 0-47.786667-13.653333-13.653333-34.133333-13.653333-47.786667 0zM853.333333 136.533333h-204.8c-20.48 0-34.133333 13.653333-34.133333 34.133334s13.653333 34.133333 34.133333 34.133333h122.88L573.44 402.773333c-13.653333 13.653333-13.653333 34.133333 0 47.786667 13.653333 13.653333 34.133333 13.653333 47.786667 0L819.2 252.586667v122.88c0 20.48 13.653333 34.133333 34.133333 34.133333s34.133333-13.653333 34.133334-34.133333v-204.8c0-20.48-13.653333-34.133333-34.133334-34.133334z"
										fill="#777777" p-id="3203"></path>
								</svg>
								<!-- #endif -->
								<!-- #ifdef MP-WEIXIN -->
								全屏
								<!-- #endif -->
							</div>
							<!-- #ifndef MP-WEIXIN -->
							<div v-if="isHeight" class="magnify" @click="Tomagnify">
								<svg t="1685611713082" class="icon" viewBox="0 0 1024 1024" version="1.1"
									xmlns="http://www.w3.org/2000/svg" p-id="1741" width="32" height="32">
									<path
										d="M872.3 899.1h-718c-14.3 0-26-11.7-26-26v-718c0-14.3 11.7-26 26-26h718c14.3 0 26 11.7 26 26v718c0 14.3-11.6 26-26 26z m-711.9-32h706v-706h-706v706z"
										fill="" p-id="1742"></path>
									<path
										d="M487.4 488.6l-166.1-0.2c-8.8 0-16-7.2-16-16s7.2-16 16-16l134.1 0.1 0.1-134.1c0-8.8 7.2-16 16-16s16 7.2 16 16l-0.1 166.2z"
										fill="" p-id="1743"></path>
									<path
										d="M438.5 461.1L256 278.6c-6.2-6.2-6.2-16.4 0-22.6 6.2-6.2 16.4-6.2 22.6 0l182.5 182.5c6.2 6.2 6.2 16.4 0 22.6-6.3 6.2-16.4 6.2-22.6 0zM553.2 719.7c-8.8 0-16-7.2-16-16l0.2-166.1 166.1 0.2c8.8 0 16 7.2 16 16s-7.2 16-16 16l-134.1-0.1-0.1 134.1c-0.1 8.8-7.3 15.9-16.1 15.9z"
										fill="" p-id="1744"></path>
									<path
										d="M745.2 767.9L548.5 572.6l22.5-22.7 196.7 195.3c6.3 6.2 6.3 16.4 0.1 22.6-6.2 6.3-16.4 6.3-22.6 0.1z"
										fill="" p-id="1745"></path>
								</svg>
							</div>
							<!-- #endif -->

							<div v-if="isHeight" class="gather">
								<div class="imgs" @click="undo">
									<!-- #ifndef MP-WEIXIN -->
									<svg t="1692082493252" class="icon" viewBox="0 0 1024 1024" version="1.1"
										xmlns="http://www.w3.org/2000/svg" p-id="4026" width="22" height="22">
										<path
											d="M396.8 200.533333l64 64L384 341.333333h298.666667c119.466667 0 213.333333 93.866667 213.333333 213.333334s-93.866667 213.333333-213.333333 213.333333H298.666667v-85.333333h384c72.533333 0 128-55.466667 128-128s-55.466667-128-128-128H170.666667l226.133333-226.133334z"
											fill="#444444" p-id="4027"></path>
									</svg>
									<!-- #endif -->
									<text>撤销</text>
								</div>
								<div class="imgs" @click="deleteImg">
									<!-- #ifndef MP-WEIXIN -->
									<svg t="1686205282563" class="icon" viewBox="0 0 1050 1024" version="1.1"
										xmlns="http://www.w3.org/2000/svg" p-id="2409" width="20" height="20">
										<path
											d="M1024 1024H26.25641a26.25641 26.25641 0 1 1 0-52.512821h997.74359a26.25641 26.25641 0 0 1 0 52.512821zM630.153846 887.466667l-21.005128 31.507692H262.564103l-180.434052-155.017846L36.758974 729.928205l31.507693-42.010256L503.020308 12.077949l36.023795-8.086975L966.235897 288.820513l45.42359 30.299897-30.877538 42.482872zM532.795077 63.015385l-422.203077 656.410256L262.564103 867.774359V866.461538h318.542769l355.98441-534.002871z"
											fill="#484D55" p-id="2410"></path>
										<path
											d="M525.128205 26.25641l472.615385 262.564103-210.051282 315.076923-472.615385-262.564103z"
											fill="#484D55" p-id="2411"></path>
									</svg>
									<!-- #endif -->
									<text>清除</text>
								</div>
								<div class="qx" @click="toclear">取消</div>
								<div class="wc" @click="isEmpty">完成</div>
							</div>
							<div v-else class="gather2">
								<div class="imgs" @click="undo">
									<!-- #ifndef MP-WEIXIN -->
									<svg t="1692082493252" class="icon" viewBox="0 0 1024 1024" version="1.1"
										xmlns="http://www.w3.org/2000/svg" p-id="4026" width="30" height="30">
										<path
											d="M396.8 200.533333l64 64L384 341.333333h298.666667c119.466667 0 213.333333 93.866667 213.333333 213.333334s-93.866667 213.333333-213.333333 213.333333H298.666667v-85.333333h384c72.533333 0 128-55.466667 128-128s-55.466667-128-128-128H170.666667l226.133333-226.133334z"
											fill="#444444" p-id="4027"></path>
									</svg>
									<!-- #endif -->
									<!-- #ifdef MP-WEIXIN -->
									撤销
									<!-- #endif -->
								</div>
								<div class="imgs" @click="deleteImg">
									<!-- #ifndef MP-WEIXIN -->
									<svg t="1686205282563" class="icon" viewBox="0 0 1050 1024" version="1.1"
										xmlns="http://www.w3.org/2000/svg" p-id="2409" width="25" height="25">
										<path
											d="M1024 1024H26.25641a26.25641 26.25641 0 1 1 0-52.512821h997.74359a26.25641 26.25641 0 0 1 0 52.512821zM630.153846 887.466667l-21.005128 31.507692H262.564103l-180.434052-155.017846L36.758974 729.928205l31.507693-42.010256L503.020308 12.077949l36.023795-8.086975L966.235897 288.820513l45.42359 30.299897-30.877538 42.482872zM532.795077 63.015385l-422.203077 656.410256L262.564103 867.774359V866.461538h318.542769l355.98441-534.002871z"
											fill="#484D55" p-id="2410"></path>
										<path
											d="M525.128205 26.25641l472.615385 262.564103-210.051282 315.076923-472.615385-262.564103z"
											fill="#484D55" p-id="2411"></path>
									</svg>
									<!-- #endif -->
									<!-- #ifdef MP-WEIXIN -->
									清除
									<!-- #endif -->
								</div>
							</div>
						</div>
					</view>
				</view>
			</transition>
		</view>
	</div>
</template>

<script>
	/**
	 * 手写签名组件
	 * 用于手写签名（弹框签名支持小屏和全屏）
	 *
	 *********参数********
	 * label        选项名称
	 * value        初始值String（支持bas64，url 等图片显示）
	 * required     是否显示必填
	 * placeholder  默认值
	 * readonly     是否只读
	 *
	 * *********回调********
	 * @input(e)   点击确认   e生成的图片数据(bas64)
	 *
	 *********方法********
	 * isEmpty()     生成图片
	 * deleteImg()   删除图片
	 */
	export default {
		props: {
			popup: {
				type: [Boolean, String],
				default: false,
			},
			label: {
				type: String,
				default: '手写签名',
			},
			value: {
				type: String,
				default: '',
			},
			required: {
				type: [Boolean, String],
				default: false,
			},
			placeholder: {
				type: String,
				default: '点击签名',
			},
			readonly: {
				type: [Boolean, String],
				default: false,
			},
		},
		data() {
			return {
				showPopup: false,
				isHeight: false,
				height1: uni.getSystemInfoSync().windowWidth / 2,
				width: uni.getSystemInfoSync().windowWidth, //实时屏幕宽度
				height: uni.getSystemInfoSync().windowHeight, //实时屏幕高度
				showPicker: false
			}
		},
		methods: {
			undo() {
				this.$refs.signatureRef.undo()
			},
			toPop() {
				this.showPopup = true
			},
			toDeleteImg() {
				this.$emit('input', '')
			},
			toclear() {
				this.isHeight = false
				this.showPopup = false
			},
			close() {
				this.isHeight = false
				this.showPopup = false
				this.$refs.signatureRef.clear()
			},
			deleteImg() {
				this.$refs.signatureRef.clear()
			},
			toDataURL(url) {
				this.$emit('input', url)
				this.showPicker = false
				console.log(url)
			},
			Tomagnify() {
				this.isHeight = !this.isHeight
				this.$refs.signatureRef.clear()
			},
			isEmpty() {
				this.$refs.signatureRef.canvasToTempFilePath({
					quality: 0.8,
					success: (res) => {
						if (this.required) {
							if (!res.isEmpty) {
								this.$emit('input', res.tempFilePath)
								this.isHeight = false
								this.showPopup = false
							} else {
								uni.showToast({
									title: '请先签名',
									icon: 'none'
								});
							}
						} else {
							this.$emit('input', res.tempFilePath)
							this.isHeight = false
							this.showPopup = false
						}

					}
				})
			},
		},
		beforeCreate() {},
		created() {}
	}
</script>

<style scoped lang="scss">
	.bottomPopup {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		z-index: 999;
		background-color: rgba(0, 0, 0, 0.5);

		.popup-content {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			// top: 0;
			background-color: #ffffff;
		}

		.slide-up-enter-active,
		.slide-up-leave-active {
			transition: all .3s ease;
		}

		.slide-up-enter,
		.slide-up-leave-to {
			transform: translateY(100%);
		}
	}

	.signature {
		.inputs {
			background-color: #fff;
			padding: 10px 16px;

			.label {
				line-height: 35px;
				position: relative;
			}

			.labelqr:before {
				content: "*";
				color: #f00;
			}

			.explain {
				width: 100%;
				background-color: #f1f1f1;
				text-align: center;
				line-height: 40px;
				border: 1px dotted #ccc;
				color: #999;
			}

			.Deletes {
				border: 1px solid #f00;
				width: 30rpx;
				height: 30rpx;
				border-radius: 50%;
				color: #f00;
				text-align: center;
				font-size: 30rpx;
				line-height: 30rpx;
			}
		}

		.images {
			width: 300rpx;
			height: 150rpx;
			position: relative;

			.icons {
				position: absolute;
				top: 0;
				right: 0;
			}
		}
	}

	.popup {
		background-color: #fff;
	}

	.hader {
		display: flex;
		justify-content: center;
		text-align: center;
		height: 45px;
		border-bottom: 1px solid #f5f5f5;
		align-items: center;

		div {
			text-align: center;
			width: 80px;
			color: #E59C36;
		}

		.text {
			color: #333;
			flex: 1;
		}
	}

	.wgSignature {
		position: relative;

		.gather2 {
			color: #00aaff;
			position: absolute;
			bottom: 20rpx;
			right: 0rpx;
			display: flex;
			justify-content: center;
			z-index: 2;

			.imgs {
				margin-right: 15px;
			}
		}

		.gather {
			position: absolute;
			z-index: 2;
			display: flex;
			justify-content: center;
			align-items: center;
			transform: rotate(90deg);
			bottom: 160px;
			left: -250rpx;

			text {
				margin-left: 3px;
			}

			div {
				width: 80px;
				margin: 5px;
				text-align: center;
				line-height: 40px;
			}

			.qx {
				background-color: #f5f5f5;
				border-radius: 20px;
			}

			.wc {
				color: #fff;
				background-color: #E59C36;
				border-radius: 20px;
			}

			img {
				width: 25px;
				height: 25px;
			}
		}

		.magnify {
			position: absolute;
			top: 5px;
			right: 5px;
			z-index: 3;
			color: #00aaff;

			uni-image {
				width: 25px;
				height: 25px;
			}
		}

		.eliminate {
			position: absolute;
			bottom: 5px;
			right: 5px;

			uni-image {
				width: 25px;
				height: 25px;
			}
		}
	}
</style>