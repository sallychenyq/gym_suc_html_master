<template>
  <view>
    <u-popup :show="box.open" mode="center" round="10" :closeable="true" @close="closeBox" :safeAreaInsetBottom="false">
      <view class="buy-sell-pack-box">
        <view class="sellpack-info-box flex-col">
          <view class="sellpack-box flex-col">
            <view class="sellpack-title-box flex-row justify-between">
              <text class="sellpack-title">{{ title }}</text>
            </view>
            <u-list height="410" showScrollbar>
              <u-list-item
                  v-for="(item, index) in rechargeList"
                  :key="index"
                  :anchor="index"
              >
                <view class="sellpack-one-box flex-col" @click="selected=index">
                  <view class="sellpack-one flex-row justify-between">
                    <view class="sellpack-one-info-box flex-col justify-between">
                      <view class="sellpack-one-title">{{ item.chargeName }}</view>
                      <view :class="['sellpack-one-info', item.haveDiscount?'have-discount':'']">
                        <text class="sellpack-course-count">{{ item.courseCount }}</text>
                        <text class="sellpack-ks">课时</text>
                        <text class="sellpack-price">{{ item.packAmt }}</text>
                        <text class="sellpack-jg">元</text>
                        <text class="sellpack-ont-price-info">({{ item.coursePrice }}元/课时)</text>
                      </view>
                      <view v-if="item.haveDiscount" class="sellpack-one-info">
                        <text class="sellpack-ks">折扣价:</text>
                        <text class="sellpack-course-count">{{ item.courseCount }}</text>
                        <text class="sellpack-ks">课时</text>
                        <text class="sellpack-price-discount">{{ item.discountPackAmt }}</text>
                        <text class="sellpack-jg">元</text>
                      </view>

                    </view>
                    <view v-if="selected!==index" class="sellpack-check flex-col"></view>
                    <image
                        v-else
                        class="sellpack-checked"
                        referrerpolicy="no-referrer"
                        src="@/static/imgs/rechage-check.png"
                    />
                  </view>
                </view>
              </u-list-item>
            </u-list>
            <view class="layer5 flex-row justify-between">
              <button class="Button341 flex-col" @click="cancel">
                <text class="census-box-main-info-value">取消</text>
              </button>
              <button class="Button342 flex-col" @click="confirm">
                <text class="leger-info-say">确定</text>
              </button>
            </view>
          </view>
        </view>
      </view>

    </u-popup>
    <u-popup :show="confirmBox.open" mode="bottom" round="10" :closeable="true" @close="closeConfirmBox">
      <view class="sellpack-info-box flex-col">
        <view class="sellpack-box flex-col">
          <view class="sellpack-title-box flex-row justify-between">
            <text class="sellpack-title">确认购买信息</text>
          </view>
          <view class="sellpack-one-box flex-col">
            <view class="sellpack-one flex-row justify-between">
              <view class="sellpack-one-info-box flex-col justify-between">
                <view class="sellpack-one-title">{{ confirmBox.item.chargeName }}</view>
                <view :class="['sellpack-one-info',confirmBox.item.haveDiscount?'have-discount':'']">
                  <text class="sellpack-course-count">{{ confirmBox.item.courseCount }}</text>
                  <text class="sellpack-ks">课时</text>
                  <text class="sellpack-price">{{ confirmBox.item.packAmt }}</text>
                  <text class="sellpack-jg">元</text>
                  <text class="sellpack-ont-price-info">({{ confirmBox.item.coursePrice }}元/课时)</text>
                </view>
                <view class="sellpack-one-info">
                  <text class="sellpack-ks">最高折扣:</text>
                  <text class="sellpack-course-count">{{ confirmBox.item.courseCount }}</text>
                  <text class="sellpack-ks">课时</text>
                  <text class="sellpack-price-discount">{{ confirmBox.item.discountPackAmt }}</text>
                  <text class="sellpack-jg">元</text>
                </view>
              </view>
            </view>
          </view>
          <view class="sellpack-title-box flex-row justify-between">
            <text class="sellpack-title">请选择折扣</text>
          </view>
          <u-list height="410" showScrollbar>
            <u-list-item
                v-for="(discount,index) in confirmBox.discounts"
                :key="discount.bingCode"
                :anchor="index"
            >
              <view class="sellpack-one-box flex-col">
                <view
                    class="sellpack-one flex-row justify-between"
                    @click="selectDiscount(discount)">
                  <view class="sellpack-one-info-box flex-col justify-between">
                    <view class="sellpack-one-title">{{ discount.name }}</view>
                    <view class="sellpack-one-info">
                      <text class="sellpack-ks">优惠</text>
                      <text class="sellpack-price-discount">{{ discount.cutAmt }}</text>
                      <text class="sellpack-jg">元，</text>
                      <text class="sellpack-ks">实付</text>
                      <text class="sellpack-price-discount">{{ discount.finalAmt }}</text>
                      <text class="sellpack-jg">元</text>
                    </view>
                  </view>
                  <view v-if="confirmBox.useDiscount!==discount.bingCode" class="sellpack-check flex-col"></view>
                  <image
                      v-else
                      class="sellpack-checked"
                      referrerpolicy="no-referrer"
                      src="@/static/imgs/rechage-check.png"
                  />
                </view>
              </view>
            </u-list-item>
            <u-list-item>
              <view class="sellpack-one-box flex-col">
                <view class="sellpack-one flex-row justify-between" @click="selectDiscount(null)">
                  <view class="sellpack-one-info-box flex-col justify-between">
                    <view class="sellpack-one-title">不使用折扣</view>
                    <view class="sellpack-one-info">
                      <text class="sellpack-course-count">{{ confirmBox.item.courseCount }}</text>
                      <text class="sellpack-ks">课时</text>
                      <text class="sellpack-price">{{ confirmBox.item.packAmt }}</text>
                      <text class="sellpack-jg">元</text>
                    </view>
                  </view>
                  <view v-if="confirmBox.useDiscount!==null" class="sellpack-check flex-col"></view>
                  <image
                      v-else
                      class="sellpack-checked"
                      referrerpolicy="no-referrer"
                      src="@/static/imgs/rechage-check.png"
                  />
                </view>
              </view>
            </u-list-item>

          </u-list>

          <view class="layer5 flex-row justify-between">
            <button class="Button341 flex-col" @click="closeConfirmBox">
              <text class="census-box-main-info-value">取消</text>
            </button>
            <button class="Button342 flex-col" @click="confirmUseDiscount">
              <text class="leger-info-say">确认支付 {{ `${confirmBox.useDiscountFinalAmt?confirmBox.useDiscountFinalAmt+'元':''}` }}</text>
            </button>
          </view>
        </view>
      </view>
    </u-popup>
    <u-popup :show="balanceBox.open" mode="center" round="10" :closeable="true" @close="closeBox">
      <view class="pay-balance-box flex-col">
        <view class="pay-balance-box-main flex-col">
          <text class="pay-balance-box-message">
            {{ balanceBox.message }}
          </text>
          <text class="pay-balance-box-balance">¥{{ balanceBox.price }}</text>
          <view class="success-buttons flex-row justify-between">
            <button class="close-button flex-col" @click="cancel">
              <text class="close-button-text">取消</text>
            </button>
            <button class="ok-button flex-col" @click="payBalance">
              <text class="ok-button-text">充值</text>
            </button>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>

import UPopup from "../../uview-ui/components/u-popup/u-popup.vue";

export default {
  name: "recharge",
  components: {UPopup},
  data() {
    return {
      selected: 0,
      box: {
        open: false
      },
      balanceBox:{
        open:false,
        message:'',
        price:''
      },
      rechargeList:[],
      confirmBox:{
        open:false,
        item:{},
        discounts:[],
        useDiscount:null,
        useDiscountFinalAmt:null
      }
    };
  },
  created() {
    uni.$on('buySellPack',(list)=>{
      this.rechargeList=list
      this.box.open = true
      this.selected=0
    })
    uni.$on('buySellPack.close',()=>{
      this.box.open = false
    })
     uni.$on('payPrice',(data,other)=>{
       this.balanceBox.open = true
       this.balanceBox.message = other
       this.balanceBox.price = data.price
    })
    uni.$on('payPrice.close',()=>{
      this.balanceBox.open = false
    })

  },
  /**
   * 组件的属性列表
   */
  props: {
    title: {
      type:String,
      default:'购买课包'
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    closeBox() {
      this.box.open = false
      uni.$emit('buySellPack.close')
    },
    closeConfirmBox() {
      this.confirmBox.open = false
    },
    closeOnceBox() {
      this.balanceBox.open = false
      uni.$emit('payPrice.close')
    },
    cancel() {
      this.closeBox()
      this.closeOnceBox()
      this.$emit('cancel')
      uni.$emit('buySellPack.close')
      uni.$emit('payPrice.close')
    },
    confirmUseDiscount() {
      const sellPack = this.rechargeList[this.selected];
      this.$api.buyPackWx({
        sellpackId: sellPack.sellId,
        sellpackCoachid: sellPack.coachId,
        selectDiscount:this.confirmBox.useDiscount
      }).then(res=>{
        this.$utils.pullPay(res.data).then(()=>{
          this.$emit('success');
          this.closeBox()
        }).catch()
      }).catch(e=>{
        console.log(e);
      })
    },
    confirm() {
      const sellPack = this.rechargeList[this.selected];
      if (sellPack.haveDiscount){
        //有优惠价
        this.confirmBox.item=uni.$u.deepClone(sellPack);
        this.confirmBox.discounts=uni.$u.deepClone(sellPack.discounts);
        this.selectDiscount(this.confirmBox.discounts[0])
        this.confirmBox.open=true
        this.$utils.showToast('已经帮你选择了最优折扣价,请确认')
        return
      }
      this.$api.buyPackWx({
        sellpackId: sellPack.sellId,
        sellpackCoachid: sellPack.coachId
      }).then(res=>{
        this.$utils.pullPay(res.data).then(()=>{
          this.$emit('success');
          this.closeBox()
        }).catch()
      }).catch(e=>{
        console.log(e);
      })
    },
    selectDiscount(discount){
      if (!discount){
        this.confirmBox.useDiscount=null
        this.confirmBox.useDiscountFinalAmt=null
        return
      }
      discount=uni.$u.deepClone(discount);
      this.confirmBox.useDiscount=discount.bingCode
      this.confirmBox.useDiscountFinalAmt=discount.finalAmt
    },
    payBalance(){
      this.$api.setBalanceRechargeOrderWx({
        balance:this.balanceBox.price
      }).then(res=>{
        this.$utils.pullPay(res.data).then(()=>{
          this.$emit('success');
          this.closeOnceBox()
        }).catch(err=>{
          this.$utils.showToast(err);
        })
      })
    }
  }
};
</script>
<style lang="scss">
@import './index.scss';
</style>
