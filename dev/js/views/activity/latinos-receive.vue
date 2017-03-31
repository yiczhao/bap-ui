<template>
<activity-main :propclass="'latinos-receive'" :showstep.sync="showstep">
    <div class="rule-row">
        <div class="rule-label"><i>*</i>权益名称</div>
        <div class="rule-input">
            <input class="input" type="text" v-model="" placeholder="请输入权益名称" />
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>领取时间</div>
        <div class="rule-input">
            <ks-date-range-picker placeholder="开始时间,结束时间"
                :range.sync="daterange"
                :readonly="false"
                v-on:change="date_multi_picker_change"></ks-date-range-picker>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"></div>
        <div class="rule-input">
            <div class="setting-time"></div>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>使用有效期</div>
        <div class="rule-input">
            <select class="select">
                <option value="与活动时间同步">与活动时间同步</option>
                <option value="用户得到权益1天内">用户得到权益1天内</option>
                <option value="用户得到权益2天内">用户得到权益2天内</option>
                <option value="用户得到权益3天内">用户得到权益3天内</option>
                <option value="用户得到权益5天内">用户得到权益5天内</option>
                <option value="用户得到权益10天内">用户得到权益10天内</option>
                <option value="用户得到权益15天内">用户得到权益15天内</option>
                <option value="用户得到权益30天内">用户得到权益30天内</option>
            </select>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label">权益总数量</div>
        <div class="rule-input">
            <input class="input" type="text" v-model=""/>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label">权益每天数量</div>
        <div class="rule-input">
            <input class="input" type="text" v-model=""/>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label">规则描述</div>
        <div class="rule-input">
            <textarea></textarea>
        </div>
    </div>
    <div class="rule-row tc footer-btns">
        <a class="btn btn-primary" @click="submitAdd(true)" v-link="{name:'bussiness-set'}">下一步</a>
        <a @click="submitAdd(false)">保存为草稿</a>
    </div>
</activity-main>
</template>
<style type="text/css" scoped>
    .rule-input textarea{
        resize: none;padding: 15px;width: 476px;height: 250px;border: 1px solid #c8c8c8;
    }
    .setting-time{
        height: 200px;width: 506px;display: table-cell;background-color: #F5F5F5;
    }
    .latinos-receive .select{
        width: 506px !important;
    }
</style>
<script type="text/javascript">
    import activityMain from './activity-main.vue'
    export default{
        watch:{
            'daterange'(){
                if(this.daterange.length>1){
                    this.latinosData.endDate=this.daterange[1]+' 23:59:59'
                }else{
                    this.latinosData.startDate=this.daterange[0]+' 00:00:00'
                    this.latinosData.endDate=''
                }
            }
        },
        data(){
            return{
                showstep:2,
                latinosData:{
                    startDate:'',
                    endDate:'',
                }
                // textareaVal:'1、活动名称：满50减25 2、消费满50刷卡立减25 3、活动时间：2017-01-20 17:00-32:00 至 2017-08-20 17:00-32:00 仅限活动期间星期一至星期五使用。（根据所设置的时间条件动态改变） 4、该活动每卡金科参与1次（根据活动条件动态改变） 5、该权益不兑现、不找零。 6、请在权益有效期内到店刷卡使用，并在刷卡前向收银员提供本手机号码。 7、权益发布银行对本权益的最终解释权。',
            }
        },
        methods:{
            date_multi_picker_change(val){
                this.latinosData.startDate=val[0]+' 00:00:00';
                this.latinosData.endDate=val[1]+' 23:59:59';
            },
        },
        created(){},
        components: { activityMain }
    }
</script>