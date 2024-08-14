<script>

import AppRadioMark from "@/components/app/app-radio-mark.vue";

export default {
  name: "buy-sell-pack-corp",
  components: {AppRadioMark},
  data(){
    return{
      sellPacks:[],
      expSellPacks:[],
      coachId: Number,
      coachName: String,
      coachAvatar: String,
      selectSellPack:{}
    }
  },
  methods:{
    init(options){
      this.sellPacks=options.sellPacks
      this.expSellPacks=options.expSellPacks
      this.coachId=options.coachId
      this.coachName=options.coachName
      this.coachAvatar=options.coachAvatar
      this.selectSellPack={}
    },
    goSelectSellPack(sellPack){
      console.log(sellPack);
      this.selectSellPack=sellPack
      this.$forceUpdate()
    },
    paySelectSellPack(){
      if (!this.selectSellPack.sellId){
        this.$message.tip('请选择购买的课包')
        return
      }
      this.createOrder(this.selectSellPack)
    },
    createOrder(sellPack){
      console.log('下单',sellPack);
      this.$emit('success');
      // 计算优惠
      // let discount=null
      // let useDiscount=null
      // if (sellPack.haveDiscount){
      //   //有优惠价
      //   discount=sellPack.discounts[0];
      //   useDiscount=discount.bingCode
      //   this.$utils.showToast('已经帮你选择了最优折扣价,请确认')
      //   return
      // }
      // this.$api.buyPackWx({
      //   sellpackId: sellPack.sellId,
      //   sellpackCoachid: sellPack.coachId
      // }).then(res=>{
      //   this.$utils.pullPay(res.data).then(()=>{
      //     setTimeout(()=>{
      //       this.$emit('success');
      //     },500)
      //   }).catch()
      // }).catch(e=>{
      //   console.log(e);
      // })
    }
  }
}
</script>

<template>
  <view class="sell-pack-list">
    <view class="item exp-item" v-for="item in expSellPacks" :key="item.sellId">
      <image v-if="item.haveDiscount" class="preferential-tag" src="/static/imgs/corps/coach-企业折扣@2x.png"></image>
      <view class="left1">
        <image mode="aspectFit" class="image" src="/static/imgs/corps/sell-pack-单次体验卡@2x.png"></image>
        <view class="names">
          <view class="name">{{ item.chargeName }}</view>
          <view class="price">
            <text class="unit">￥</text>
            <text class="value"> {{ item.discountPackAmt || item.packAmt }} </text>
            <text v-if="item.haveDiscount" class="close-value"> ￥{{ item.packAmt }} </text>
            <text class="remark">({{ item.courseCount }}课时)</text>
          </view>
        </view>
      </view>
      <view class="right cut-hole justify-center align-center">
        <view class="buy-button" @click="createOrder(item)">购买</view>
      </view>
    </view>
    <view
        :class="['item normal-item',selectSellPack.sellId === item.sellId?'selected-border-corp':'']"
        v-for="item in sellPacks"
        :key="item.sellId"
        @click="goSelectSellPack(item)"
    >
      <view class="media-info">
        <image mode="aspectFill" class="coach-avatar" :src="coachAvatar"></image>
        <view class="name-box">
          <view class="name">{{ item.chargeName }}</view>
          <image v-if="item.haveDiscount" class="preferential-tag" src="/static/imgs/corps/coach-企业折扣@2x.png"></image>
        </view>
      </view>
      <view class="sku-info justify-start">
        <view class="price">
          <text class="unit">￥</text>
          <text class="value"> {{ item.discountPackAmt || item.packAmt }} </text>
          <text v-if="item.haveDiscount" class="close-value"> ￥{{ item.packAmt }} </text>
        </view>
        <view class="illustrate">
          <text class="count">{{ item.courseCount }}课时</text>
          <text class="info">(￥{{ item.coursePrice }}/课时)</text>
        </view>
        <view class="lifetime">有效期:1年</view>
      </view>
      <app-radio-mark :selected="selectSellPack.sellId === item.sellId"></app-radio-mark>
    </view>
  </view>
</template>

<style scoped lang="scss">
$bg-color:#ededed;
.sell-pack-list{
  margin: 10rpx 0;
  padding: 20rpx;
  background-color: $bg-color;
}
.item{
  margin-bottom: 20rpx;
}
.cut-hole{
  position: relative;
  ::before,::after{
    content: '';
    position: absolute;
    width: 40rpx;
    height: 40rpx;
    background-color: $bg-color;
    border-radius: 50%;
    z-index: 99;
  }
  ::before{
    top: -30rpx;
    left: -23rpx;
  }
  ::after{
    bottom: -30rpx;
    left: -23rpx;
  }
}
.exp-item{
  padding: 10rpx;
  display: flex;
  background-color: #181818;
  border-radius: 20rpx;
  position: relative;
  .preferential-tag{
    left: 40rpx;
  }
  .left1{
    flex: 1;
    display: flex;
    .image{
      width: 160rpx;
      height: 160rpx;
      //margin: 10rpx;
    }
    .names{
      flex: 1;
      padding-left: 10rpx;
      .name{
        font-weight: 700;
        font-size: 32rpx;
        color: #FFFFFF;
        line-height: 90rpx;
        text-align: left;
      }
      .price{
        font-weight: 700;
        line-height: 90rpx;
        color: #FFC98A;
        .unit{
          font-size: 28rpx;
        }
        .value{
          font-size: 42rpx;
        }
        .close-value{
          font-weight: 400;
          font-size: 26rpx;
          color: #888888;
          // 删除线
          text-decoration: line-through;
        }
        .remark{
          font-size: 28rpx;
          font-weight: 500;
        }
      }
    }
  }
  .right{
    width: 200rpx;
    height: 180rpx;
    border-left: 2px #FFC98A dashed;
    box-sizing: border-box;
    .buy-button{
      width: 110rpx;
      height: 56rpx;
      background: linear-gradient( 315deg, #EBA04A 0%, #FFCB8F 100%);
      border-radius: 28rpx;

      font-weight: 400;
      font-size: 28rpx;
      color: #181818;
      line-height: 56rpx;
      text-align: center;
    }
  }

}
.normal-item{
  height: 220rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  box-sizing: border-box;
  position: relative;
  .media-info{
    display: flex;
    height: 130rpx;
    border-bottom: 1px #d8d8d8 dashed;
    .coach-avatar{
      width: 100rpx;
      height: 100rpx;
      border-radius: 10rpx;
      margin: 15rpx;
    }
    .name-box{
      flex: 1;
      padding: 10rpx;
      position: relative;
      .name{
        font-weight: 500;
        font-size: 32rpx;
        color: #181818;
        line-height: 36rpx;
        text-align: left;
      }
    }
  }
  .sku-info{
    display: flex;
    padding: 20rpx 10rpx;
    .price{
      color: #181818;
      line-height: 50rpx;
      height: 50rpx;
      padding-right: 10rpx;
      .unit{
        font-size: 28rpx;
        font-weight: 700;
      }
      .value{
        font-size: 42rpx;
        font-weight: 700;
      }
      .close-value{
        font-weight: 400;
        font-size: 26rpx;
        color: #888888;
        // 删除线
        text-decoration: line-through;
      }
    }
    .illustrate{
      height: 30rpx;
      margin: 10rpx 10rpx;
      padding-left: 10rpx;
      border-left: 2px #d8d8d8 solid;
      .count{
        font-weight: 700;
        font-size: 26rpx;
        color: #060C24;
        line-height: 30rpx;
        text-align: left;
      }
      .info{
        font-weight: 400;
        font-size: 26rpx;
        color: #888888;
        line-height: 30rpx;
        text-align: left;
      }
    }
    .lifetime{
      flex: 1;
      line-height: 50rpx;
      height: 50rpx;
      padding-right: 10rpx;

      font-weight: 400;
      font-size: 20rpx;
      color: #888888;
      text-align: right;
    }
  }
}
</style>
