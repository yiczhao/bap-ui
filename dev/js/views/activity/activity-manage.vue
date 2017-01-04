<template>
<div class="activity-manage">
    <div class="rule-row rule-title">
        <a class="btn btn-primary" @click="addBtn">添加商户</a>
        <div class="search-div">
            <input class="input" type="text" v-model="storeName" placeholder="输入商户名称/商户ID筛选"/>
        </div>
    </div>
    <div class="table-row">
        <table class="table">
            <tr>
                <th>商户ID</th>
                <th>商户名称</th>
                <th>所属行业</th>
                <th>操作</th>
            </tr>
            <tr v-show="!!searchList" v-for="n in searchList | filterBy storeName in 'id' 'name'">
                <td>{{n.id}}</td>
                <td>{{n.name}}</td>
                <td>{{n.industry}}</td>
                <td><a @click="removeStore(n.id)">移除</a></td>
            </tr>
            <tr v-show="!searchList.length">
                <td colspan="4">请添加商户</td>
            </tr>
        </table>
        <div v-show="!!dataList">
            <pagegroup
                    :total="searchData.total"
                    :page_size.sync="searchData.maxResult"
                    :page_current.sync="searchData.page"
                    v-on:current_change="getList"
                    v-on:size_change="getList"
            ></pagegroup>
        </div>
    </div>
</div>
</template>
<script type="text/javascript">
    import model from '../../ajax/activity/basic_model'
    export default{
        data(){
            this.model=model(this)
            return{
            }
        },
        methods:{
        },
        ready(){
        },
        created(){
        }
    }
</script>