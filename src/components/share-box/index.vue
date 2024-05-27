<template>
  <u-popup :show="show" @close="close" :round="10">
    <view class="share-box">
      <u-row
          justify="space-between"
          gutter="10"
      >
        <u-col span="6">
          <button open-type="share"
                  :data-media="getMedia()">
            <u-icon label="分享小程序" size="40" name="weixin-fill"></u-icon>
          </button>
        </u-col>
        <u-col span="6">
          <button @click="getWxmpQR">
            <u-icon label="分享二维码" size="40" name="share-square"></u-icon>
          </button>
        </u-col>
      </u-row>
    </view>
  </u-popup>
</template>

<script>
export default {
  name: "share-box",
  data(){
    return{
      show:false,
      shareId:0,
      shareMedia:{} // 分享的内容
    }
  },
  methods:{
    close(){
      this.show=false
    },
    getMedia(){
      const media = JSON.parse(JSON.stringify(this.shareMedia))
      media.shareFromBox = true
      return media
    },
    openShare(id,shareMedia){
      this.show=true
      this.shareId=id
      this.shareMedia=shareMedia
      console.log("shareMedia",shareMedia);
    },
    getWxmpQR(){
      this.$api.getShareWXMPQr({id:this.shareId}).then(res=>{
        console.log(res);
        uni.previewImage({
          urls:['data:image/jpeg;base64,'+res.data],
          complete:function (e) {
            console.log(e);
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.share-box{
  width: 700rpx;
  margin: auto;
  padding: 30rpx 0;
}
</style>
