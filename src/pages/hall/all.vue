<template>
	<view class="page flex-col">
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
			<!-- <view class="image-wrapper_2 flex-row">
		</view> -->

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
						<text class="text_15">{{coachlist[1].resume.height}}cm</text>
						<text class="text_16">・</text>
						<text class="text_15">{{coachlist[1].resume.education}}</text>
						<text class="text_16">・</text>
						<text class="text_15">{{coachlist[1].resume.constellation}}</text>
					</view>
				</view>
				<view class="image-wrapper_4 flex-col">
					<image class="label_2" referrerpolicy="no-referrer" src="../../static/static/男-icon.png" />
				</view>
			</view>
			<view class="text-wrapper_4">
				<text class="text_22">周均授课</text>
				<text class="text_23">32</text>
				<text class="text_22">{节} 教练课量排名前</text>
				<text class="text_23">82%</text>
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

			<image class="label_5" referrerpolicy="no-referrer" src="../../static/static/进度条头像背景.png" />
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			getCoach() {
				this.$api.getCoach().then(res => {
					console.log(res.data);
					this.coachlist = res.data;
				})
			},
		}
	}
</script>

<style>
	@import './all.scss';
</style>