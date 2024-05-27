<script>

import UniPagination from "@/l-components/l-data-list/uni-pagination/uni-pagination.vue";

export default {
  name: "l-pager",
  components: {UniPagination},
  props:{
    value:{
      type:Number,
      default:0
    },
    limit:{
      type:Number,
      default:20
    },
    total:{
      type:Number,
      default:0
    },
    current:{
      type:Number,
      default:0
    }
  },
  watch:{
    'page'(){
      this.$emit('input',this.page)
    }
  },
  data(){
    return{
      page:1
    }
  }
}
</script>

<template>
<uni-pagination class="l-pager" v-model="page" :current="current" :page-size="limit" :total="total"></uni-pagination>
</template>

<style scoped lang="scss">
.l-pager{
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}
</style>
