<template>
	<page-main ref="page" title="私教大厅" show-qr-button is-tab-bar-page @qr="$refs.qrBox.loadCheckQr()">
		<view class="page flex-col">
			<view class="section_1 flex-col">
				<view class="box_2 flex-row">
					<button class="text_4" @click="goto('/pages/main/main')">推荐</button>
					<button class="text_5">私教大厅</button>

					<button class="box_3 flex-row">

						<!--view class="image-wrapper_1 flex-col"-->
						<image class="image_qiyeban" src="../../static/static/企业版.png"></image>
						<image class="image_2" referrerpolicy="no-referrer" src="../../static/static/切换版本-icon.png" />

					</button>
				</view>
			</view>
			<view class="group_8 flex-col">
				<view class="block_3 flex-row">
					<button class="group_9 flex-col">

						<image class="image_3" referrerpolicy="no-referrer" src="../../static/static/健身-icon.png" />
					</button>
					<button class="group_12 flex-col">

						<image class="image_4" referrerpolicy="no-referrer" src="../../static/static/瑜伽-icon-当前.png" />
					</button>
					<button class="block_5 flex-col">

						<image class="image_7" referrerpolicy="no-referrer" src="../../static/static/高尔夫-icon.png" />
					</button>
					<button class="group_14 flex-col">

						<image class="image_5" referrerpolicy="no-referrer" src="../../static/static/国术-icon.png" />
					</button>

				</view>
				<view class="text-wrapper_2 flex-row">
					<text class="text_8">健身</text>
					<text class="text_9">瑜伽</text>
					<text class="text_10">高尔夫</text>
					<text class="text_11">国术</text>
				</view>
				<view class="image-wrapper_2 flex-row">
				</view>



			</view>
			<view class="group_15 flex-col">
				<view class="block_6 flex-col">
					<view class="image-wrapper_3 flex-col">
						<image class="image_8" referrerpolicy="no-referrer" src="../../static/static/教练.jpg" />
					</view>
				</view>
				<view class="block_7 flex-row justify-between">
					<view class="text-group_1 flex-col justify-between">
						<text class="text_14">{{coachlist[0].coachNickName}}{网球教练}</text>
						<view class="text-wrapper_3">
							<text class="text_15">96年</text>
							<text class="text_16">・</text>
							<text class="text_17">{{coachlist[1].resume.height}}cm</text>
							<text class="text_18">・</text>
							<text class="text_19">{{coachlist[1].resume.education}}</text>
							<text class="text_20">・</text>
							<text class="text_21">{{coachlist[1].resume.constellation}}</text>
						</view>
					</view>
					<view class="image-wrapper_4 flex-col">
						<image class="label_2" referrerpolicy="no-referrer" src="../../static/static/男-icon.png" />
					</view>
				</view>
				<view class="text-wrapper_4">
					<text class="text_22">周均授课</text>
					<text class="text_23">32</text>
					<text class="text_24">&#123;节}&nbsp;&nbsp;教练课量排名前</text>
					<text class="text_25">82%</text>
				</view>
				<div class="block_8 flex-col">
					<div class="block_9 flex-col"></div>
				</div>
				<view class="block_10 flex-row">
					<view class="block_11 flex-col justify-between">
						<view class="text-wrapper_5 flex-row justify-between">
							<text class="text_26">¥</text>
							<text class="text_27">1688</text>
						</view>
						<view class="image-text_1 flex-row justify-between">
							<text class="text-group_2">课时均价</text>
							<image class="thumbnail_1" referrerpolicy="no-referrer" src="../../static/static/问好.png" />
						</view>
					</view>
					<div class="text-wrapper_6 flex-col">
						<text class="text_28">添加候选</text>
					</div>
					<div class="text-wrapper_7 flex-col">
						<text class="text_29">试课购课</text>
					</div>
				</view>
				<image class="label_3" referrerpolicy="no-referrer" src="../../static/static/头像.png" />
			</view>
			<view class="group_16 flex-col">
				<view class="box_5 flex-col">
					<view class="image-wrapper_5 flex-col">
						<image class="image_9" referrerpolicy="no-referrer" src="../../static/static/教练.jpg" />
					</view>
				</view>
				<view class="box_6 flex-row justify-between">
					<view class="text-group_3 flex-col justify-between">
						<text class="text_30">小秘幂&#123;网球教练}</text>
						<view class="text-wrapper_8">
							<text class="text_31">96年</text>
							<text class="text_32">・</text>
							<text class="text_33">185cm</text>
							<text class="text_34">・</text>
							<text class="text_35">硕士</text>
							<text class="text_36">・</text>
							<text class="text_37">射手座</text>
						</view>
					</view>
					<view class="image-wrapper_6 flex-col">
						<image class="label_4" referrerpolicy="no-referrer" src="../../static/static/女-icon.png" />
					</view>
				</view>
				<view class="text-wrapper_9">
					<text class="text_38">周均授课</text>
					<text class="text_39">38</text>
					<text class="text_40">&#123;节}&nbsp;&nbsp;教练课量排名前</text>
					<text class="text_41">92%</text>
				</view>
				<div class="box_7 flex-col">
					<div class="box_8 flex-col"></div>
				</div>
				<view class="box_9 flex-row">
					<view class="block_12 flex-col justify-between">
						<view class="text-wrapper_10 flex-row justify-between">
							<text class="text_42">¥</text>
							<text class="text_43">1888</text>
						</view>
						<view class="image-text_2 flex-row justify-between">
							<text class="text-group_4">课时均价</text>
							<image class="thumbnail_2" referrerpolicy="no-referrer" src="../../static/static/问好.png" />
						</view>
					</view>
					<div class="text-wrapper_11 flex-col">
						<text class="text_44">添加候选</text>
					</div>
					<div class="text-wrapper_12 flex-col">
						<text class="text_45">试课购课</text>
					</div>
				</view>
				<image class="label_5" referrerpolicy="no-referrer" src="../../static/static/进度条头像背景.png" />
			</view>

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
				tabBarPage: true,
				coachlist: []
			};
		},
		onShow: function() {
			this.$nextTick(() => {
				this.$refs.page.switchRouter('hall')
			})
		},
		onLoad(e) {
      // 使用页面内uniapp的生命周期，不适用vue的生命周期
      this.getCoach()
		},
		methods: {
			getCoach() {
				this.$api.getcoach().then(res => {
					console.log(res.data);
					this.coachlist = res.data;
				})
			},
			goto(url) {
				uni.switchTab({
					url: url
				})
			}
		},
		watch: {}
	};
</script>
<style lang="scss">
	@import './index.scss';
</style>


<!-- <style>
	@import './common.css';
	@import './index.rpx.css';
</style> -->
