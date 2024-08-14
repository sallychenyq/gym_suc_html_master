<template>
	<view>
    <view v-if="packId && packId>=0">
      <calendar @selectDate="dateChanged" :sticky="false"></calendar>

      <view v-if="list && list.length>0">
        <view class="site-pack-time" v-for="item in list" :key="item.id">
          <image v-if="item.hasAppoint" class="icon background-main border-radius50" src="@/static/static/imgs/appoint-check.png"/>
          <image v-else class="icon border-radius50" src="@/static/static/imgs/clock-gray.png"/>
          <text class="pfb">{{ item.startTime }}-{{ item.endTime }}</text>
          <text class="appoint-num" v-if="holdNum>0 || item.faceHoldNum>0"><text class="appointed">{{ item.otherAppoint }}</text><text>/</text><text class="hold-num">{{ item.faceHoldNum>0?item.faceHoldNum:holdNum }}</text></text>
          <block v-if="item.canAppoint">
            <view class="btn cancel pfb" v-if="item.hasAppoint" @click="unAppoint(item.id)">取消预约</view>
            <view v-else class="btn pfb" @click="appoint(item.id)">预约</view>
<!--            <view v-else class="btn pfb" :data-ruleid="item.id" @click="appoint(item.id)">已约{{ item.otherAppoint }}人</view>-->
          </block>
          <block v-else>
            <view class="btn cancel pfb" v-if="item.hasAppoint" @click="unAppoint(item.id)">取消预约</view>
            <view v-else class="btn pfb disable">预约</view>
          </block>
        </view>
      </view>
      <u-empty v-else icon="/static/empty-icon/data.png" text="当前场地没有可预约的时间" />
    </view>
	</view>
</template>

<script>
	import Calendar from "../calendar/calendar";
  export default {
		name:"site-pack-times",
    components: {Calendar},
    props:{
      packId:Number,
      holdNum:{
        type:Number,
        default:0
      },
      date:{
        type:String,
        default: null
      }
    },
    watch:{
      'packId'(){
        this.loadData()
      },
      'selectDate'(){
        this.loadData()
      }
    },
		data() {
			return {
				list:[],
        selectDate:this.$utils.getToday()
			};
		},
    methods:{
      dateChanged(date){
        this.selectDate=date
      },
      loadData(){
        this.$api.listSitePackTime({
          packId: this.packId,
          startDate: this.selectDate
        }).then((res) => {
          this.list = res.data
        });
      },
      appoint(id){
        this.$emit('appoint', {ruleId:id,selectDate:this.selectDate})
      },
      unAppoint(id){
        this.$emit('unappoint', {ruleId:id,selectDate:this.selectDate})
      }
    }
	}
</script>

<style lang="scss">
.site-pack-time {
  display: flex;
  align-items: center;
  height: 117rpx;
  padding: 0 50rpx 0 60rpx;
  font-size: 32rpx;
  color: #000;
  border-top: 1rpx solid #f6f6f6;
}
.site-pack-time .appoint-num{
  margin:auto;
  line-height: 117rpx;
  //font-size: 5rpx;
}
.site-pack-time .appoint-num .appointed{
  color: $winhouse-main-color;
  margin-right: 10rpx;
}
.site-pack-time .appoint-num .hold-num{
  //color: $winhouse-main-color;
  margin-left: 10rpx;
}

.site-pack-time .icon {
  width: 36rpx;
  height: 36rpx;
  display: block;
  margin-right: 10rpx;
}

.site-pack-time .btn.cancel {
  background-color: #fff;
  border: 1rpx solid $winhouse-main-color;
  color: $winhouse-main-color;
}

.site-pack-time .btn {
  width: 150rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  border-radius: 30rpx;
  font-size: 24rpx;
  background-color: $winhouse-main-color;
  color: #fff;
  margin-left: auto;
}

.site-pack-time .btn.cancel {
  border: 1px solid $winhouse-main-color;
  color: $winhouse-main-color;
  background-color: #fff;
}

.site-pack-time .btn.disable {
  color: #fff;
  background-color: #e8e8e8;
  pointer-events: none;
}

.empty::after {
  content: '暂无安排，看看其他日期吧~';
  position: absolute;
  display: block;
  width: 342rpx;
  font-size: 24rpx;
  color: #666;
  text-align: center;
  bottom: -74rpx;
  left: -50rpx;
}

.empty {
  width: 242rpx;
  height: 199rpx;
  display: block;
  margin: 300rpx auto;
  overflow: visible;
  position: relative;
}

</style>
