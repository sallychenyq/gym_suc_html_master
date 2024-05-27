<template>
    <view>
        <u-button icon="arrow-down" :plain="true" @click="select()">{{ selectView?selectView:placeholder }}</u-button>
        <u-datetime-picker
                :title="`请选择${selectMode===1?'开始':'结束'}时间`"
                :show="show"
                v-model="values[`value${selectMode}`]"
                :mode="type"
                :cancelText="`${selectMode===2?'选择开始时间':'取消'}`"
                :confirmText="`${selectMode===1?'选择结束时间':'确认'}`"
                @cancel="cancel"
                @confirm="confirm"
        />
        <u-action-sheet @close="showFast=false" closeOnClickOverlay @select="fastSelectClick" :actions="fastSelectList" title="快速选择" :show="showFast"></u-action-sheet>
    </view>
</template>

<script>
export default {
    name: "selector-time-interval",
    props: {
        startPlaceholder: {
            type: String,
            default: '选择开始日期'
        },
        endPlaceholder: {
            type: String,
            default: '选择结束日期'
        },
        placeholder: {
            type: String,
            default: '选择开始和结束日期'
        },
        type: {
            type: String,
            default: 'datetime'
        },
        today: {
            type: Boolean,
            default: false
        },
        fastSelect: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            selectView:null,
            showFast:false,
            show:false,
            values:{value1:null,value2:null},
            selectMode:1,
            fastSelectList: [
                {name:'今天'},
                {name:'本周(从周一)'},
                {name:'上周(从周一)'},
                {name:'本月'},
                {name:'上月'},
                {name:'自由选择'},
            ],
        }
    },
    mounted() {
        if (this.today){
            const s = this.$dayjs(new Date()).startOf('day').toDate()
            const start = Number(s)
            const e = this.$dayjs(new Date()).startOf('day').add( 1,'day').toDate()
            const end = Number(e)
            this.values = {value1:start,value2:end}
            this.changeValue(this.values)
            this.selectView='今天'
        }
    },
    methods:{
        fastSelectClick(e){
            switch (e.name) {
                case '今天':
                    this.values.value1=Number(this.$dayjs(new Date()).startOf('day').toDate())
                    this.values.value2=Number(this.$dayjs(new Date()).startOf('day').add(1,'day').toDate())
                    break
                case '本周(从周一)':
                    this.values.value1=Number(this.$dayjs(new Date()).startOf('week').toDate())
                    this.values.value2=Number(this.$dayjs(new Date()).endOf('week').startOf('day').add(1,'day').toDate())
                    break
                case '上周(从周一)':
                    this.values.value1=Number(this.$dayjs(new Date()).subtract(1,'week').startOf('week').toDate())
                    this.values.value2=Number(this.$dayjs(new Date()).subtract(1,'week').endOf('week').startOf('day').add(1,'day').toDate())
                    break
                case '本月':
                    this.values.value1=Number(this.$dayjs(new Date()).startOf('month').toDate())
                    this.values.value2=Number(this.$dayjs(new Date()).endOf('month').startOf('day').add(1,'day').toDate())
                    break
                case '上月':
                    this.values.value1=Number(this.$dayjs(new Date()).subtract(1,'month').startOf('month').toDate())
                    this.values.value2=Number(this.$dayjs(new Date()).subtract(1,'month').endOf('month').startOf('day').add(1,'day').toDate())
                    break
                default:
                    this.selectMode=1
                    this.show=true
                    this.showFast=false
                    return
            }
            this.selectView=e.name
            this.changeValue(this.values)
            console.log(e);
        },
        select(){
            if (this.fastSelect){
                this.showFast=true
                return
            }
            this.selectMode=1
            this.show=true
        },
        cancel(){
            if (this.selectMode===2){
                this.selectMode=1
                return
            }
            this.show=false
        },
        confirm(e){
            this.values[`value${this.selectMode}`]=e.value
            if (this.selectMode===1){
                if (!this.values.value1){
                    this.$utils.showToast('请选择开始时间')
                    return;
                }
                this.selectMode=2
                return
            }
            this.changeValue(this.values)
        },
        changeValue(val) {
            let format="yyyy-mm-dd"
            switch (this.type) {
                case 'date':
                    format="YYYY-MM-DD"
                    break
                case 'datetime':
                    format="YYYY-MM-DD HH:mm:ss"
                    break
            }
            const start = this.$dayjs(new Date(val.value1)).format(format)
            const end = this.$dayjs(new Date(val.value2)).format(format)
            const v={start:start,end:end}
            console.log(v);
            this.$emit('select', v)
            this.$emit('input', v)
            this.show=false
            this.showFast=false
        }
    }
}
</script>

<style scoped>

</style>
