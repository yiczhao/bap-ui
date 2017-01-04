<template>
    <div class="transaction-detail">
        <div class="table">
            <table>
                <tr>
                    <th>交易总笔数</th>
                    <th>交易总金额</th>
                    <th>可打折金额</th>
                    <th>实付总金额</th>
                    <th>补贴总金额</th>
                </tr>
                <tr>
                    <td>{{cumulative.tradeNum}}</td>
                    <td>{{cumulative.tradeAmount}}</td>
                    <td>{{cumulative.discountAmount}}</td>
                    <td>{{cumulative.realPay}}</td>
                    <td>{{cumulative.subsidiesAmount}}</td>
                </tr>
            </table>
        </div>
        <div class="showInfo">
            <span class="activity-name">建设银行北京分行（满100立减20）</span>
            <span class="infor-num">共{{tradeTotalNumber}}条数据</span>
            <span class="out-excel">导出excel表格</span>
        </div>
        <div class="table">
            <table>
                <tr>
                    <th>商户名称</th>
                    <th>银行卡号</th>
                    <th>卡种</th>
                    <th>手机号码</th>
                    <th>交易流水号</th>
                    <th>交易时间</th>
                    <th>结算时间</th>
                    <th>消费金额(元)</th>
                    <th>可打折金额（元）</th>
                    <th>实付金额</th>
                    <th>结算/折扣</th>
                    <th>补贴/金额</th>
                </tr>
                <tr>
                    <td>外婆家</td>
                    <td>4343******3200</td>
                    <td>贷记卡</td>
                    <td>177****1234</td>
                    <td>1234567890</td>
                    <td>
                        <span>2016-02-01</span><br>
                        <span>16:30:44</span>
                    </td>
                    <td>
                        <span>2016-02-01</span><br>
                        <span>00:00:00</span>
                    </td>
                    <td>100.00 </td>
                    <td>100.00</td>
                    <td>80</td>
                    <td>8折</td>
                    <td>20.00</td>
                </tr>
                <tr>
                    <td>外婆家</td>
                    <td>4343******3200</td>
                    <td>贷记卡</td>
                    <td>177****1234</td>
                    <td>1234567890</td>
                    <td>
                        <span>2016-02-01</span><br>
                        <span>16:30:44</span>
                    </td>
                    <td>
                        <span>2016-02-01</span><br>
                        <span>00:00:00</span>
                    </td>
                    <td>100.00 </td>
                    <td>100.00</td>
                    <td>80</td>
                    <td>8折</td>
                    <td>20.00</td>
                </tr>
            </table>
        </div>
    </div>
    </template>
</template>
<script type="text/javascript">
	export default{
        data(){
            return{
                cumulative:{
                    tradeNum:10,      //交易总笔数
                    tradeAmount:10,   //交易总金额
                    discountAmount:20,//可打折金额
                    realPay:20,       //实付总金额
                    subsidiesAmount:30,//补贴总金额
                },
                tradeTotalNumber:50,
            }
        },
        methods:{},
        ready(){}
    }
</script>