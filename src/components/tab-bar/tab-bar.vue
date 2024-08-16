<template>
	<u-tabbar ref="bar" :value="show" :fixed="true" :border="false" :placeholder="true" :safeAreaInsetBottom="true"
		activeColor="#6BD0FF" inactiveColor='#002024'>
		<u-tabbar-item :name="item.name" v-for="item in list" :key="item.pagePath" v-if="item.enable" :text="item.text"
			:icon="item.name===show?item.selectedIconPath:item.iconPath" @click="clickTabBarItem(item.pagePath)" />
	</u-tabbar>
</template>

<script>
	export default {
		name: "tab-bar",
		data() {
			return {
				list: [{
						name: 'hall',
						pagePath: "/pages/hall/index",
						text: "私教",
						iconPath: "/static/static/甄选私教.png",
						selectedIconPath: "/static/static/甄选私教-当前.png",
						enable: true
					},
					{
						name: 'appoint',
						pagePath: "/pages/reserve/index",
						text: "预约",
						iconPath: "/static/static/约课.png",
						selectedIconPath: "/static/static/约课-当前.png",
						enable: true
					},
					{
						name: 'sites',
						pagePath: "/pages/sites/index",
						text: "签课",
						iconPath: "/static/static/训练场地.png",
						selectedIconPath: "/static/static/训练场地-当前.png",
						enable: true
					},
					{
						name: 'my',
						pagePath: "/pages/my/index",
						text: "我的",
						iconPath: "/static/static/我的.png",
						selectedIconPath: "/static/static/我的-当前.png",
						enable: true
					}
				],
				show: 'hall',
			}
		},
		created() {

		},
		methods: {
			getRect() {
				try {
					return this.$refs.bar.getRect()
				} catch (e) {
					return new Promise(resolve => {
						const data = uni.$u.sys().safeArea
						data.top = data.bottom
						resolve(data)
					})
				}
			},
			enable(name, enable) {
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].name === name) {
						this.list[i].enable = enable
					}
				}
			},
			clickTabBarItem(path) {
				uni.vibrateShort()
				this.$v_router.pushTab(path)
			},
			findName(name) {
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].name === name) {
						return this.list[i]
					}
				}
				return null
			},
			switchRouter(name) {
				const item = this.findName(name);
				if (!item) {
					return
				}
				this.show = name
			}
		}
	}
</script>

<style scoped>
</style>