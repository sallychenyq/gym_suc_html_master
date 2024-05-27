<template>
	<u-navbar placeholder @leftClick="none()" :border="false" :auto-back="true">
		<view slot="center">
			<slot />
		</view>
		<view slot="left">
			<view v-if="(showBackBtn && !showQrButton)" @click.stop="back()">
				<u-icon name="arrow-left" size="19"></u-icon>
			</view>
			<view v-if="qrEnable" @tap.stop="showQr"
				:style="{ height: `${qrButtonViewStyle.height}px`, width: `${qrButtonViewStyle.width}px`, borderRadius: `${qrButtonViewStyle.border}px`} "
				:class="'btn-qr-container ' + ((showQrButton && !showBackBtn) ? '' : 'hide ')+ (qrButtonTip ? 'tips' : '')">
				<image src="@/static/imgs/header-qr-button.png" class="btn-qr"
					:style="{height: `${qrButtonStyle.height}px`,width: `${qrButtonStyle.width}px`}" />
			</view>
		</view>
	</u-navbar>
</template>

<script>
	import * as utils from '../../common/utils.js';
	import UButton from "../../uview-ui/components/u-button/u-button";
	import QrBox from "../qr-box/qr-box";
	import UIcon from "../../uview-ui/components/u-icon/u-icon";
	import UNavbar from "../../uview-ui/components/u-navbar/u-navbar.vue";
	import UAvatar from "@/uview-ui/components/u-avatar/u-avatar.vue";

	export default {
		name: 'page-head',
		components: {
			UAvatar,
			UNavbar,
			UIcon,
			QrBox,
			UButton
		},
		data() {
			return {
				headHeight: utils.getStatusBarHeight(),
				qrEnable: false,
				qrButtonViewStyle: {
					height: 0,
					width: 0,
					border: ''
				},
				qrButtonStyle: {
					height: 0,
					width: 0
				},
				qrButtonTip: false
			};
		},
		props: {
			title: String,
			showBackBtn: {
				type: Boolean,
				default: true
			},
			showQrButton: {
				type: Boolean,
				default: false
			}
		},
		externalClasses: ['transparent-effact', 'universal-backdrop-blur-effact'],
		created() {
			// #ifdef MP-WEIXIN
			let res = wx.getMenuButtonBoundingClientRect();
			this.qrButtonViewStyle.height = res.height
			this.qrButtonViewStyle.width = res.height * 2
			this.qrButtonViewStyle.border = res.height / 2

			this.qrButtonStyle.height = res.height - 8
			this.qrButtonStyle.width = res.height - 8
			// #endif

			// this.$api.getCorpManConfig().then(res => {
			//   this.qrEnable = (this.showQrButton && !this.showBackBtn) && res.data.gateQr
			//   if (this.qrEnable){
			//     this.qrButtonTip=true
			//     utils.timeoutDo(500).then(()=>{
			//       this.qrButtonTip=false
			//       utils.timeoutDo(500).then(()=>{
			//         this.qrButtonTip=true
			//         utils.timeoutDo(500).then(()=>{
			//           this.qrButtonTip=false
			//         })
			//       })
			//     })
			//   }
			// })
		},
		mounted() {

		},
		methods: {
			none() {
				return false
			},
			back() {
				if (this.qrEnable) {
					return;
				}
				if (getCurrentPages().length === 1) {
					uni.reLaunch({
						url: '/pages/home/index',
						success: () => {}
					});
					return;
				}

				uni.navigateBack({
					delta: 1,
					complete: function(result) {
						console.log(result);
					}
				});
			},
			showQr() {
				this.$emit('qr')
			}
		}
	};
</script>
<style lang="scss">
	@import './universal-page-head.scss';

	.color-transparent {
		//#ifndef H5
		color: transparent !important;
		//#endif
	}
</style>