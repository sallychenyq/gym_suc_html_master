<template>
  <view style="display: inline-block" :class="[disable?'disable':'']">
    <view v-if="selected" class="block6 flex-col" :class="[bgActive?'selected':'no-selected']" @click="select">
      <view class="layer2 flex-col justify-between">
        <image
            v-if="img"
            class="img2"
            referrerpolicy="no-referrer"
            :src="selectedImg?selectedImg:img"
        />
        <text class="info1 selected-text" :class="img?'have-img':'no-img'">{{ label }}</text>
      </view>
    </view>
    <view v-else class="block6 flex-col no-selected" @click="select">
      <view class="layer2 flex-col justify-between">
        <image
            v-if="img"
            class="img2"
            referrerpolicy="no-referrer"
            :src="img"
        />
        <text class="info1" :class="img?'have-img':'no-img'">{{ label }}</text>
      </view>
    </view>
  </view>

</template>

<script>
	export default {
		name:"select-item",
    props:{
      label:String,
      img:String,
      selectedImg:String,
      selected: {
        type:Boolean,
        default:false
      },
      item:Object,
      bgActive:{
        type:Boolean,
        default: true
      },
      disable:{
        type:Boolean,
        default:false
      },
      disableText:{
        type:String,
        default:null
      }
    },
		data() {
			return {

			};
		},
    methods:{
      select(){
        this.$emit('select')
      }
    }
	}
</script>

<style lang="scss">
.disable{
  background-color: #ooo; opacity:0.3;
}
.selected{
  background-color: $winhouse-main-color-1;
}
.no-selected{
  background-color: rgba(251, 251, 251, 1);
}
.block6 {
  margin: 15rpx 15rpx 5rpx 15rpx;
  border-radius: 16px;
  height: 140rpx;
  border: 3px solid rgba(251, 251, 251, 1);
  width: 140rpx;
  //padding: 16rpx 0 0 25rpx;
  padding: 16rpx 0 0 0;
  .layer2 {
    //width: 85rpx;
    height: 96rpx;
    .img2 {
      width: 70rpx;
      height: 70rpx;
      //margin-left: 6rpx;
      margin: 0 0 0 31rpx;
    }
    .no-img{
      line-height: 96rpx;
    }
    .have-img{
      line-height: 22rpx;
    }
    .info1 {
      //width: 85rpx;
      height: 21rpx;
      overflow-wrap: break-word;
      color: rgba(80, 80, 80, 1);
      font-size: 22rpx;
      text-align: center;
      white-space: nowrap;
      margin-top: 5rpx;
      display: block;
    }
    .selected-text{
      color: $winhouse-main-color;
    }
  }
}
</style>
