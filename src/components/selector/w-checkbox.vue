<template>
    <u-checkbox-group
            v-model="checks"
            @change="checkboxChange"
    >
        <u-checkbox :activeColor="$utils.getColors().main" :label="label" :label-color="color" :name="true"/>
    </u-checkbox-group>
</template>

<script>
export default {
    name: "w-checkbox",
    props:{
        value:Boolean,
        label:String,
        color:String,
    },
    data(){
        return{
            checks:[]
        }
    },
    watch:{
      'value'(){
          this.init()
      }
    },
    created() {
        this.init()
    },
    methods:{
        init(){
            if (this.value){
                this.checks=[true]
            }else {
                this.checks=[]
            }
        },
        checkboxChange(n){
            if (n.length>0){
                this.$emit('input',true)
            }else {
                this.$emit('input',false)
            }
        }
    }
}
</script>

<style scoped>

</style>
