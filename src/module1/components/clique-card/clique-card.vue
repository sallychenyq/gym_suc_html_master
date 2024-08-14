<template>
    <view class="benefit card" @click="$emit('click')">
        <view class="label">权益{{ item.cliqueManage?'(可管理)':'' }}</view>

        <view class="info">
            <view class="name">{{ item.cliqueInfo.cliqueName }}</view>
            <!--      <view class="teacher">入场{{item.cliqueInfo.enterCorpCountBalance}}次</view>-->
<!--            <view class="teacher">操课{{ item.cliqueInfo.appointCourseCountBalance }}次</view>-->
            <!--      <view v-if="item.cliqueInfo.moneyDefault>0" class="teacher">余额￥{{item.cliqueInfo.moneyDefaultBalance}}</view>-->
<!--            <view class="teacher">场地{{ item.cliqueInfo.appointSitePackCountBalance }}次</view>-->
<!--            <view class="teacher">通用{{ item.cliqueInfo.appointAllCountBalance }}次</view>-->
            <view class="balance" v-if="item.statusSuccess">{{ item.statusView }}</view>
            <view class="balance" v-else>
                <text class="time-out">{{ item.statusView }}</text>
            </view>
        </view>
        <u-loading-page :loading="goManageLoading" loading-text="正在进入权益管理员页面"></u-loading-page>
    </view>
</template>

<script>
export default {
    name: "clique-card",
    props: {
        item: Object
    },
    data() {
        return {
            goManageLoading: false
        };
    },
    methods: {
        goManage() {
            if (!this.item.cliqueManage) {
                return
            }
            this.goManageLoading = true
            setTimeout(() => {
                this.goManageLoading = false
                this.$v_router.push(`/pages/clique-manage/panel?id=${this.item.cliqueId}`)
            }, 1000)
        }
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
