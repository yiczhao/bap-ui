<template>
    <div class="transaction-detail">
        <div class="table">
            <table>
                <tr>
                    <th>名称参数</th>
                    <th>操作</th>
                </tr>
                <tr>
                    <td>
                        <input class="input" type="text" v-model="activityIds" @keyup.enter="submit" placeholder="请输入活动ID(逗号隔开)"/>
                        同步大后台活动交易数据(逗号隔开)
                    </td>
                    <td>
                        <a @click="submit">确认</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input class="input" type="text" v-model="startDate" @keyup.enter="delSub" placeholder="请输入起始日期"/>
                        删除交易数据（起始日期后无交易数据的，该活动的交易都删除）yyyy-MM-dd
                    </td>
                    <td>
                        <a @click="delSub">确认</a>
                    </td>
                </tr>
                <tr>
                    <td>删除非银行活动的交易
                    </td>
                    <td>
                        <a @click="delTransSub">确认</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input class="input" type="text" v-model="transNos" @keyup.enter="delByNos" placeholder="请输入交易流水号(逗号隔开)"/>
                        按交易流水号删除交易（逗号隔开）
                    </td>
                    <td>
                        <a @click="delByNos">确认</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input class="input" type="text" v-model="transNo" placeholder="请输入交易流水号(逗号隔开)"/>
                        <ks-date-picker type="datetime" :value.sync="tradeTime" placeholder="请选择交易时间(yyyy-MM-dd HH:mm:ss)"></ks-date-picker>
                        交易时间修复(yyyy-MM-dd HH:mm:ss)
                    </td>
                    <td>
                        <a @click="repaire">确认</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input class="input" type="text" v-model="actIds" placeholder="请输入活动id(逗号隔开)"/>
                        按活动统计：交易数据分析、交易时段分析、商户数据分析、交易区域分析、卡BIN数据分析、单卡交易分析
                    </td>
                    <td>
                        <a @click="actidsCount">确认</a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script type="text/javascript">
	export default{
        data(){
            return{
                activityIds:'',
                startDate:'',
                transNos:'',
                transNo:'',
                tradeTime:'',
                actIds:''
            }
        },
        methods:{
            submit(){
                this.$http.post('./tool/synTransData?activityIds='+this.activityIds).then((res)=>{
                    if(res.data.code===0){
                        dialog('success','成功！');
                    }
                })
            },
            delSub(){
                this.$http.post('./tool/transaction/delete?startDate='+this.startDate).then((res)=>{
                    if(res.data.code===0){
                        dialog('success','成功！');
                    }
                })
            },
            delTransSub(){
                this.$http.post('./tool/transaction/not/activity/delete').then((res)=>{
                    if(res.data.code===0){
                        dialog('success','成功！');
                    }
                })
            },
            delByNos(){
                this.$http.post('./tool/transaction/delete/by/trans/nos?transNo='+this.transNos).then((res)=>{
                    if(res.data.code===0){
                        dialog('success','成功！');
                    }
                })
            },
            repaire(){
                let data = {
                    "transNo":this.transNo,
                    "tradeTime":this.tradeTime
                };
                this.$http.post('./tool/tradeTime/repair',data).then((res)=>{
                    if(res.data.code===0){
                        dialog('success','成功！');
                    }
                })
            },
            actidsCount(){
                this.$http.post('./tool/trade/statistics?activityIds='+this.actIds).then((res)=>{
                    if(res.data.code===0){
                        dialog('success','成功！');
                    }
                })
            }
        },
        created(){
            if(JSON.parse(sessionStorage.getItem('loginList')).roleID==1){
                this.$router.go({'name':'home'});
            }
        }
    }
</script>