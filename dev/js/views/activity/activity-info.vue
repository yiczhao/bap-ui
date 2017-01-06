<template>
    <div class="activity-info">
        <div class="info-title">
            <ul class="tab-bor">
                <li @click="step=1" :class="{'active':step===1}">活动基本信息</li>
                <li v-show="!!ruleList.ruleType" @click="step=2" :class="{'active':step===2}">规则设置</li>
                <li v-show="!!storeList.length" @click="step=3" :class="{'active':step===3}">商户信息</li>
                <!--<li @click="step=4" :class="{'active':step===4}">权益信息</li>-->
            </ul>
        </div>
        <div class="info-main">
            <div class="main-title">
                <span>活动形式： 随机立减活动</span>
                <span>活动形式： 活动上线</span>
                <span>创建时间： {{basicData.createdAt}}</span>
                <span>所属银行： 江西建行</span>
            </div>
            <div v-show="step===1" class="info-basic">
               <div class="main-row">
                   <span>活动名称：</span>
                   <span>{{basicData.name}}</span>
                   <span>所在地区：</span>
                   <span>{{basicData.provinceName}} - {{basicData.cityName}}</span>
               </div>
                <div class="main-row">
                    <span>活动主办方： </span>
                    <span> {{basicData.organizerName}}</span>
                </div>
                <div class="main-row">
                    <span>参与时间段：</span>
                    <span>每天参与时间段<template v-for="n in basicData.timesList">【{{n}}】</template></span>
                    <span>活动时间：  {{basicData.startTime}} ~ {{basicData.endTime}}</span>
                </div>
                <div class="main-row table-row">
                    <span class="w85">活动主题：</span>
                    <span>{{basicData.subject}}</span>
                </div>
                <div class="main-row table-row">
                    <span class="w85">活动细则：</span>
                    <span>{{basicData.detail}}</span>
                </div>
                <div class="main-row table-row">
                    <span class="w140">POS小票内容设置：</span>
                    <span>{{basicData.posPrint}}</span>
                </div>
            </div>
            <div v-show="step===2" class="info-rule">
                <div class="main-row table-row">
                    <span class="w140">{{ruleList.typename}}：</span>
                    <span>{{ruleList.posPrint}}</span>
                </div>
            </div>
            <div v-show="step===3" class="info-store">
                <div class="store-title">共{{storeList.length}}家商户</div>
                <table class="table">
                    <tr>
                        <th>商户ID</th>
                        <th>商户名称</th>
                        <th>地区</th>
                    </tr>
                    <tr v-for="n in storeList">
                        <td>{{n.storeId}}</td>
                        <td>{{n.storeName}}</td>
                        <td>{{n.industry}}</td>
                    </tr>
                </table>
            </div>
            <div v-show="step===4" class="info-quanyi">
                权益信息
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .activity-info{
        .info-title{
            .tab-bor{
                position: relative;
                top: -20px;
                left: -20px;
                font-size: 16px;
                li{
                    cursor: pointer;
                }
            }
        }
        .info-main{
            font-size: 15px;
            .main-title{
                margin:20px;
                span{
                    font-size: 17px;
                    margin-right: 40px;
                }
            }
            .info-basic,.info-store{
                margin-left: 30px;
                padding-right: 20px;
                .table-row{
                    span{
                        display: table-cell;
                    }
                    .w85{
                        width: 85px;
                    }
                    .w140{
                        width: 140px;
                    }
                }
                .main-row{
                    padding: 20px 0;
                    span{
                        min-width: 100px;
                        margin-right: 20px;
                    }
                }
            }
            .store-title{
                font-size: 16px;
                margin-bottom: 10px;
            }
        }
    }
</style>
<script type="text/javascript">
    import model from '../../ajax/activity/info_model'
    export default{
        data(){
            this.model=model(this)
            return{
                step:1,
                basicData:{},
                ruleList:{},
                storeList:[]
            }
        },
        methods:{
            getRules(data){
                let datas=_.cloneDeep(data);
            }
        },
        created(){
            let activityId=this.$route.params.infoId;
            this.model.getinfoList(activityId).then((res)=>{
                if(res.data.code===0){
                    console.log(res.data.data);
                    this.$set('basicData',res.data.data.base);
                    this.$set('storeList',res.data.data.store.bankMarketingStores);
                    this.$set('ruleList',res.data.data.ruleAndLimit);
                    this.getRules(res.data.data.ruleAndLimit);
                }
            })
        },
    }
</script>