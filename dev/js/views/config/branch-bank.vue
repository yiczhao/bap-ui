<template>
    <div class="branch-bank">
        <div class="form-row">
            <a class="btn btn-info" @click="addUser">新增分支行</a>
        </div>
        <div class="table">
            <table>
                <tr>
                    <th>序号</th>
                    <th>分支行名称</th>
                    <th>行政级别</th>
                    <th>创建时间</th>
                    <th>创建人</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                <tr v-show="!!userList" v-for="n in userList">
                    <td>{{$index+1}}</td>
                    <td>{{n.shortName }}</td>
                    <td>
                        <template v-if="n.level ==1">一级分行</template>
                        <template v-if="n.level ==2">二级分行</template>
                        <template v-if="n.level ==3">信用卡部</template>
                        <template v-if="n.level ==4">营业部</template>
                    </td>
                    <td>{{n.createTime | datetime}}</td>
                    <td>{{n.createName}}
                    </td>
                    <td>
                        <template v-if="n.status">启用</template>
                        <template v-else>禁用</template>
                    </td>
                    <td>
                        <a @click="showEdit(n.id)">编辑</a>
                    </td>
                </tr>
            </table>
            <pagegroup
                    :total="objectotalNumber"
                    :page_size.sync="defaultData.pageSize"
                    :page_current.sync="defaultData.pageIndex"
                    v-on:current_change="getList"
                    v-on:size_change="getList"
            ></pagegroup>
        </div>
    </div>
</template>
<script>
	import model from '../../ajax/config/branch_bank'
    export default{
        data(){
	        this.model=model(this);
            return{
	            defaultData:{
		            pageIndex:1,
		            pageSize:10,
	            },
	            userList:[],
	            objectTotalNumber:1,
            }
        },
	    methods:{
		    getList(){
			    this.model.getBranchBankList(this.defaultData).then((res)=>{
				    if(res.data.code===0){
					    this.$set('userList',res.data.dataList);
					    this.$set('objectTotalNumber',res.data.objectTotalNumber);
				    }
			    })
		    },
            addUser(){},
//		    initList(){
//			    this.addshow=false;
//			    this.getList();
//		    },
	    },
	    ready(){
		    this.getList();
	    }
    }
</script>
