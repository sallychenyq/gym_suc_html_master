<template>
  <u-sticky :disable-default-custom-nav-height="!sticky">
    <view class="calendar">
      <view class="weeks">
        <view :data-idx="idx" :class="'week ' + (chooseDateIdx === idx ? 'active' : '')" @tap="changeDate(item,idx)"
              v-for="(item, idx) in calendar" :key="item.timeStamp">
          {{ idx === 0 ? '今日' : $utils.weekStr(item.startDate,'') }}
        </view>
      </view>
      <view class="dates-container">
        <view class="dates">
          <view class="date pfb" @tap="changeDate(item,index)" v-for="(item, index) in calendar" :key="item.date">
            {{ item.date }}
          </view>
        </view>
        <view
            class="dates active"
            :style="
                    'clip-path: circle(26rpx at ' +
                    (chooseDateIdx * 107.143 + 53.57) +
                    'rpx 48rpx);-webkit-clip-path: circle(26rpx at ' +
                    (chooseDateIdx * 107.143 + 53.57) +
                    'rpx 48rpx);'
                "
        >
          <view :data-idx="idx" class="date pfb" v-for="(item, idx) in calendar" :key="item.date">
            {{ item.date }}
          </view>
        </view>
      </view>
    </view>
  </u-sticky>

</template>

<script>
import * as utils from '../../common/utils';

export default {
  data() {
    return {
      chooseDateIdx: 0,
      calendar: utils.getCalendar(),
      startDate:''
    };
  },
  /**
   * 组件的属性列表
   */
  props: {
    sticky: {
      type:Boolean,
      default:true
    }
  },
  /**
   * 组件的方法列表
   */
  mounted() {
    // this.emit();
  },
  methods: {
    changeDate(item,index) {
      this.startDate=item.startDate
      this.chooseDateIdx=index
    },
    pushDate(date){
      for (let i = 0; i < this.calendar.length; i++) {
        const item=this.calendar[i]
        if (item.startDate===date){
          this.changeDate(item,i)
          break
        }
      }
    }
  },
  watch:{
    'startDate'(){
      this.$emit('selectDate',this.startDate)
    }
  }
};
</script>
<style lang="scss">
@import './calendar.scss';
</style>
