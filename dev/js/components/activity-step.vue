<template>
    <div class="rule-step">
        <div v-for="(index,n) in datas" class="pr" :class="{'active':showstep==index}">
            {{index+1}}.{{n}}
            <div class="triangle-right" :class="{'active':showstep==index}"></div>
            <div class="triangle-right-white" v-if="showstep!=index"></div>
        </div>
    </div>
</template>
<style lang="scss">
.rule-step{
    overflow: hidden;
    display: table;
    width: 100%;
    border-right: 1px solid #dadada;
    .pr{
        position: relative;
        width: 25%;
        display: table-cell;
        border: 1px solid #ddd;
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        color: #000;
        text-align: center;
    }
    .pr.active{
        border: 1px solid #2196F3;
        background: #2196F3;
        color:#fff;
    }
    .triangle-right {
        position: absolute;
        z-index: 2;
        top:0;
        right:-25px;
        width: 0;
        height: 0;
        border-top: 25px solid transparent;
        border-left: 25px solid #ddd;
        border-bottom: 25px solid transparent;
    }
    .triangle-right-white {
        position: absolute;
        z-index: 3;
        right: -24px;
        width: 0;
        height: 0;
        border-top: 24px solid transparent;
        border-left: 25px solid #fff;
        border-bottom: 24px solid transparent;
        top: 1px;
    }
    .triangle-right.active{
        border-left: 26px solid #2196F3;
        border-top: 26px solid transparent;
        border-bottom: 26px solid transparent;
        right: -27px;
    }
}
</style>
<script>
    export default{
        props:{
            datas:{type:Array,require:true},
            showstep:{type:Number}
        },
        data(){
            return{
            }
        },
        ready(){
            console.log(this.datas)
            console.log(this.showstep)
        }
    }
</script>
