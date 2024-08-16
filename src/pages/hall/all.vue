<template>
  <view class="page flex-col">
    <view class="group_8 flex-col">
      <u-scroll-list>
	      <view class="block_3 flex-row">
          <button class="group_9 flex-col">
            <image
              class="image_3"
              referrerpolicy="no-referrer"
              src="/static/static/健身-icon.png"/><text class="text_8">健身</text>
          </button>
          <button class="group_12 flex-col">
            <image
              class="image_4"
              referrerpolicy="no-referrer"
              :src="type.largeImgActive"/>
	          <text class="text_9">{{ type.superCoachTypeName }}</text>
          </button>
          <button class="block_5 flex-col">
            <image
              class="image_7"
              referrerpolicy="no-referrer"
              src="/static/static/高尔夫-icon.png"/><text class="text_10">高尔夫</text>
          </button>
          <button class="group_14 flex-col">
            <image
              class="image_5"
              referrerpolicy="no-referrer"
              src="/static/static/国术-icon.png"/><text class="text_11">国术</text>
          </button>
        </view>
      </u-scroll-list>
    </view>
    <scroll-view
      :indicator="false"
      scroll-y
      class="scroll">
	    <view
        class="group_15 flex-col"
        v-for="(item, index) in coachlist"
        :key="index"
        @click="godetail(item.coachId)">
        <view class="block_6">
            <image
              class="image_8"
              mode="aspectFill"
              :src="item.headImage"/>
	        <view class="background">
		        <view class="text-wrapper_4">
			        <text class="text_22">周均授课</text>
			        <text class="text_23">32</text>
			        <text class="text_22">{节} 教练课量排名前</text>
			        <text class="text_23">82%</text>
		        </view>
		        <view class="lineProgress">
			        <u-line-progress
				        :percentage="82"
				        :showText="false"
				        height="5"
				        activeColor="#6bd0ff"
		        />
		        </view>
	        </view>
        </view>
        <view class="block_7 flex-row justify-between">
          <view class="text-group_1 flex-col justify-between">
            <text class="text_14">{{ item.coachNickName }}【网球教练】</text>
            <view class="text-wrapper_3">
	            <view class="tag"><text class="text">{{_Birthday(item)}}</text></view>
	            <view class="tag"><text class="text">{{ item.resume.height }}cm</text></view>
	            <view class="tag"><text class="text">{{ item.resume.education }}</text></view>
              <view class="tag"><text class="text">{{ item.resume.constellation }}</text></view>
            </view>
          </view>
          <view class="image-wrapper_4">
	          <image :src="item.avatar" class="avatar"></image>
            <image
              class="label_2"
              referrerpolicy="no-referrer"
              :src="item.gender == 1
                  ? '/static/static/男-icon.png'
                  : '/static/static/女-icon.png'"/>
          </view>
        </view>
        <view class="block_10 flex-row justify-between">
          <view class="block_11 flex-col">
            <view class="text-wrapper_5 flex-row">
              <text class="text_26">¥</text>
              <text class="text_27">{{item.priceOriginal}}</text>
            </view>
            <view class="image-text_1 flex-row">
              <text class="text-group_2">{课时均价}</text>
              <image
                class="thumbnail_1"
                src="/static/static/问好.png"/>
            </view>
          </view>
          <view class="flex-row">
	          <button class="text-wrapper_6">
            <text class="text_28">候选</text>
          </button>
          <button class="text-wrapper_7">
            <text class="text_29">购课</text>
          </button></view>
        </view>
	    </view>
    </scroll-view>
  </view>
</template>

<script>
// import PageMain from "../../components/page-main/page-main.vue";
export default {
  components: {
	  // PageMain,
  },
  onLoad(e) {
  },
  data() {
    return {
      coachlist: [],
      type: [],
    };
  },
  methods: {
	  init(){
		  this.$api.coachType().then((res) => {
			  console.log(res.data[0]);
			  this.type = res.data[0];
		  });
			this.$api.getCoachInfo().then((res) => {
			  console.log(res.data);
			  this.coachlist[0] = res.data;
		  });
	  },
    godetail(index) {
      uni.navigateTo({ url: "/module1/pages/detail?id=" + index });
    },
	  _Birthday(item) {
		  if (!item.resume) {
			  return null;
		  }
		  if (!item.resume.birthday) {
			  return null;
		  }
		  // 1999-01-01,拆分99年
		  let year = item.resume.birthday.split("-")[0].slice(2);
		  return year + "年";
	  },
  },
};
</script>

<style lang="scss">
@import "./all.scss";
</style>
