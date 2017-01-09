<template>
	<div class="latinos-detail">
        <div class="search-div">
            <span>手机号码</span>
            <input class="input" type="text" placeholder="输入手机号码"/>
            <span>活动状态</span>
            <select class="select">
                <option>11</option>
            </select>
            <a class="btn btn-primary searchBtn">搜索</a>
        </div>
        <div class="table">
            <table>
                <tr>
                    <th>权益总数量</th>
                    <th>权益领取量</th>
                    <th>权益使用量</th>
                    <th>权益未使用量</th>
                    <th>权益逾期量</th>
                </tr>
                <!-- <tr>
                    <td>{{cumulative.totalNumber}}</td>
                    <td>{{cumulative.totalAmount}}</td>
                    <td>{{cumulative.canDisAmount}}</td>
                    <td>{{cumulative.payAmount}}</td>
                    <td>{{cumulative.subsidyAmount}}</td>
                </tr> -->
                <tr>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                </tr>
            </table>
        </div>
        <div class="showInfo">
            <span class="activity-name">权益名称</span>
            <span class="infor-num">共条数据</span>
            <span class="out-excel"><i class="icon-file-excel"></i>导出excel表格</span>
        </div>
        <div class="table">
            <table>
                <tr>
                    <th>手机号码</th>
                    <th>权益名称</th>
                    <th>面额/折扣</th>
                    <th>权益来源</th>
                    <th>赠送时间</th>
                    <th>权益有效期</th>
                    <th>商户名称</th>
                    <th>状态(元)</th>
                </tr>
                <tr>
                    <td>1232</td>
                    <td>1232</td>
                    <td>1232</td>
                    <td>1232</td>
                    <td>1232</td>
                    <td>1232</td>
                    <td>1232</td>
                    <td>1232</td>
                </tr>
            </table>
        </div>
        <!-- <pagegroup class="pagegroup"
            :page_current.sync="searchDate.page" 
            :total="searchDate.total" 
            :page_size.sync="searchDate.maxResult"
            ></pagegroup> -->
        <pagegroup class="pagegroup"
            :page_current.sync="1" 
            :total="1" 
            :page_size.sync="1"
            ></pagegroup>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                pagegroupInfor:{
                    page:1,//当前选中的分页值
                    total:5,//数据总条数
                    maxResult:1,//每页展示多少条数
                    allPages:1,//总页数
                },
            }
        },
        methods:{
            
        },
        ready(){
            
        }
    }
</script>