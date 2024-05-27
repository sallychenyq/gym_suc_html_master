<script>
export default {
  name: "l-data-list",
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    api: Function,
    pageLimit: {
      type: Number,
      default: 20
    },
    params: {
      type: Object,
      default: {}
    },
    listSize: {
      type: Number,
      default: 0
    },
    empty: {
      type: String,
      default: '数据为空'
    },
    deepListen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      page: this.params.page || 0,
      limit: this.params.limit || this.pageLimit,
      total: this.listSize,
      list: this.value,
    }
  },
  watch: {
    'listSize'(val) {
      this.total = val
    },
    'total'() {
      this.$emit('total', this.total)
    }
  },
  methods: {
    deepObserve(obj, callback) {
      const handler = {
        set(target, prop, value, receiver) {
          const success = Reflect.set(target, prop, value, receiver);
          callback(target);
          return success;
        }
      };
      return new Proxy(obj, handler);
    },
  update(res) {
    this.$emit('input', this.list)
    this.$emit('apiupdate', res)
  },
  isEmpty() {
    return (!this.list || this.list.length <= 0) && (!this.value || this.value.length <= 0)
  },
  reload(resetPage = false, param) {
    return new Promise((resolve, reject) => {
      if (resetPage) {
        this.page = 1
      }
      let params = JSON.parse(JSON.stringify(this.params))
      if (param && param.query) {
        params = param.query
      }
      params.page = this.page
      params.limit = this.limit
      if (!this.api) {
        this.$emit('load', params)
        resolve()
        return
      }
      this.api(params).then(res => {
        this.list = res.data
        this.total = res.total || 0
        this.update(res)
        console.log(res);
        // this.$utils.loading.close(loading)
        resolve(res)
      }).catch(err => {
        // this.$utils.loading.close(loading)
        reject(err)
      })
    })
  },
  pageChange(page) {
    this.page = page
    this.reload()
  }
}
}
</script>

<template>
  <view>
    <slot v-if="isEmpty()" name="empty">
      <u-empty mode="order" :text="empty"/>
    </slot>
    <slot name="table"/>
    <l-pager
        v-if="!isEmpty()"
        v-show="total && total>0"
        :total="total" :current="page" @input="pageChange"/>
  </view>
</template>

<style scoped lang="scss">

</style>
