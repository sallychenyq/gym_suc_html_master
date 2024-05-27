<template>
  <scroll-view
      :id="documentId"
      :scroll-left="scrollLeft"
      @scrolltoupper="leftOver"
      @scrolltolower="rightOver"
      :scroll-x="true"
      :enable-flex="true"
      :scroll-with-animation="true"
      style="background-color: #fff;white-space: nowrap;width: 100%;">
    <view class="scroll-view-box__content">
      <slot />
    </view>
  </scroll-view>
</template>

<script>
	export default {
		name:"scroll-view-box",
    props:{
      viewId:String
    },
    data() {
      return{
        documentId:'',
        jump:100,
        width:100,
        scrollLeft:0,
        leftEnable:true,
        rightEnable:true
      }
    },
    created() {
      this.documentId=`scoll-view-${Math.floor(Math.random()*1000)}`
    },
    mounted() {

      // #ifdef H5
      document.getElementById(this.documentId).addEventListener('mousewheel',this.mousewheel,true)
      // #endif
      uni.createSelectorQuery().in(this).select(`#${this.documentId}`).boundingClientRect(data => {
        this.jump=data.width/3
      }).exec()
    },
    methods:{
      leftOver(){
        this.leftEnable=false
      },
      rightOver(){
        this.rightEnable=false
      },
      mousewheel(e){
        if(e.wheelDelta<0){
          if (!this.rightEnable){
            return
          }
          this.scrollLeft+=this.jump
          this.leftEnable=true
        }else if(e.wheelDelta>0){
          if (!this.leftEnable){
            return
          }
          this.scrollLeft-=this.jump
          this.rightEnable=true
          if (this.scrollLeft<=0){
            this.scrollLeft=0
          }
        }
      }

    }
	}
</script>

<style lang="scss">
.scroll-view-box__content{
  display: flex;
  width: auto;
}
</style>
