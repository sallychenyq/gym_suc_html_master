<template>
	<page-main ref="page" title="私教大厅" show-qr-button is-tab-bar-page @qr="$refs.qrBox.loadCheckQr()">
		<u-sticky :offset-top="offsetTop" :enable="enable"><u-tabs :list="tabsList" :current="tabsCurrent"
				@change="tabsChange"></u-tabs></u-sticky>
		<view class="page flex-col" v-if="tabsCurrent === 0">
			<!--view class="group_1 flex-col"-->

			<div class="section_5 flex-col">
				<!-- <image class="main_image" src="../../static/static/教练.jpg" mode="center"> -->
				<view class="group_2 ">
					<view class="box_8 flex-row">
						<view class="group_3 flex-col ">
							<view class="text-wrapper_2 flex-row ">
								<text class="text_6">¥</text>
								<text class="text_7">1688</text>
							</view>
							<text class="text_8">{课时均价}</text>
						</view>
						<u-line class="group_4 flex-col"></u-line>
						<view class="group_5 flex-col ">
							<view class="box_9 flex-row ">
								<text class="text_9">吴磊 {网球教练}</text>
								<image class="label_2" referrerpolicy="no-referrer"
									src="../../static/static/男-icon.png" />
							</view>
							<view class="text-wrapper_3">
								<text class="text_10">96年</text>
								<text class="text_10">・</text>
								<text class="text_10">185cm</text>
								<text class="text_10">・</text>
								<text class="text_10">硕士</text>
								<text class="text_10">・</text>
								<text class="text_10">射手座</text>
							</view>
						</view>
					</view>
					<view class="image-text_1 flex-col ">
						<view class="block_1 flex-row">


							<text class="text-group_1">推荐理由</text>
							<image class="thumbnail_1" referrerpolicy="no-referrer" src="../../static/static/推荐.png" />

						</view>
						<view class="text-group_2 flex-row">
							<text class="text_17">
								这里写一些推荐甄选教练的理由，但是文字不能这么少，还要再写一点才能让页面看着比例协调nsjvdiufnvdifnvijdnvndfvvvvvvvvvvvvvvvvffvakjndfjvndkfjnckjdfvkjfdvkjmd
							</text>
							<text class="text_18">查看更多</text>
						</view>
					</view>
					<view class="box_10 flex-row">
						<view class="image-wrapper_2 flex-row">
							<image class="image_3" mode="aspectFill" referrerpolicy="no-referrer"
								:src="item.lanhuimage0" v-for="(item, index) in loopData0" :key="index" />
						</view>
						<image class="image_4" referrerpolicy="no-referrer" src="../../static/static/half.png" />
					</view>
				</view>
			</div>
			<view class="section_6 flex-col">
				<view class="group_6 flex-row justify-between">
					<button class="text-wrapper_4 flex-col" click="changeAdd">
						<text class="text_19">添加候选</text>
					</button>
					<button class="text-wrapper_5 flex-col">
						<text class="text_20">试课购课</text>
					</button>
				</view>
			</view>


		</view>
		<view v-else-if="tabsCurrent === 1">
			<hall></hall>
		</view>

	</page-main>

</template>

<script>
	import PageMain from "../../components/page-main/page-main.vue";
	import hall from "./all.vue"
	export default {
		components: {
			PageMain,
			hall
		},


		data() {
			return {
				tabBarPage: true,
				coachlist: [],
				tabsList: [{
					name: '推荐',
				}, {
					name: '大厅',
				}],
				tabsCurrent: 0,
				loopData0: [{
						lanhuimage0: '../../static/static/alterl.png',
					},
					{
						lanhuimage0: '../../static/static/lightup.png',
					},
					{
						lanhuimage0: '../../static/static/教练.jpg',
					},
					{
						lanhuimage0: '../../static/static/alterr.png',
					},
				],
			}
		},
		onShow: function() {
			this.$nextTick(() => {
				this.$refs.page.switchRouter('hall')
			})
		},

		methods: {
			getCoach() {
				this.$api.getCoach().then(res => {
					console.log(res.data);
					this.coachlist = res.data;
				})
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			tabsClick(item) {
				console.log('item', item);
			},

			/**
			 * @Event 方法
			 * @description: u-tabs 菜单change
			 * */
			tabsChange(index) {
				this.tabsCurrent = index.index;
			}

		},
		watch: {}
	};
</script>
<style lang="scss">
	@import './index.scss';
</style>