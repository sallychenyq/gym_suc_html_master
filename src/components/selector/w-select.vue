<template>
  <view>
      <u-button icon="arrow-down" :plain="true" @click="select()">{{ selectView?selectView:placeholder }}</u-button>
      <u-action-sheet
              @close="show=false"
              closeOnClickOverlay
              @select="selectOk"
              :actions="actionOptions"
              :title="placeholder"
              :show="show"/>
  </view>
</template>

<script>
export default {
    name: "w-select",
    props:{
        placeholder:{
            type:String,
            default:'请选择'
        },
        options:{
            type:Array,
            default:[]
        },
        labelField:{
            type:String,
            default:'name'
        },
        valueField:{
            type:String,
            default:'value'
        },
        value:Object
    },
    data(){
      return{
          show:false,
          selectView:null,
          actionOptions:[]
      }
    },
    watch:{
        'value'(){
            for (let i = 0; i < this.actionOptions.length; i++) {
                if (this.value===this.actionOptions[i].value){
                    this.selectView=this.actionOptions[i].name
                    return
                }
            }
            this.selectView=this.placeholder
        },
        'options'(){
            this.init()
        }
    },
    created() {
        this.init()
    },
    methods:{
        updateValue(value){
            for (let i = 0; i < this.actionOptions.length; i++) {
                if (value===this.actionOptions[i].value){
                    this.selectView=this.actionOptions[i].name
                    this.$emit('input',value)
                    return
                }
            }
            this.selectView=this.placeholder
        },
        init(){
            const actionOptions=[]
            for (let i = 0; i < this.options.length; i++) {
                actionOptions.push({name:this.options[i][this.labelField],value:this.options[i][this.valueField]})
            }
            this.actionOptions=actionOptions
            console.log(this.actionOptions);
        },
        select(){
            this.show=true
        },
        selectOk(e){
            this.updateValue(e.value)
        }
    }
}
</script>

<style scoped>

</style>
