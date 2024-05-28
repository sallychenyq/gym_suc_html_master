<template>
	<page-main ref="page" title="预约训练" show-qr-button is-tab-bar-page @qr="$refs.qrBox.loadCheckQr()">
		<view>
			2
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
				tabBarPage: true
			};
		},
		onShow: function() {
			this.$nextTick(() => {
				this.$refs.page.switchRouter('reserve')
			})
		},
		onLoad(e) {

		},
		methods: {},
		watch: {}
	};
</script>

<style>

</style>