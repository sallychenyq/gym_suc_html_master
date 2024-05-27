<script>
export default {
  name: "check-switch",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      checked: false,
      v:[]
    }
  },
  watch:{
    'value'(val){
      this.checked = val
      if (val){
        this.v = ['']
      }else{
        this.v = []
      }
    }
  },
  created() {
    this.checked = this.value
    if (this.checked){
      this.v = ['']
    }else {
      this.v = []
    }
  },
  methods: {
    change(e) {
      if (e.length>0){
        this.checked = true
      }else{
        this.checked = false
      }
      this.$emit('input', this.checked)
    },
    set(val){
      this.checked = val
      this.$emit('input', this.checked)
      if (val){
        this.v = ['']
      }else{
        this.v = []
      }
    }
  }
}
</script>

<template>
  <u-checkbox-group
      v-model="v"
      placement="column"
      @change="change"
  >
    <u-checkbox :checked="checked" shape="circle" :active-color="$utils.getColors().main" :label="label"></u-checkbox>
  </u-checkbox-group>

</template>

<style scoped lang="scss">

</style>
