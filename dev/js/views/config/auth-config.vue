<template>
    <div class="auth-config">
        <div class="form-row">
            <a class="btn btn-info" @click="addUser">新增用户</a>
        </div>
        <div class="table">
            <table>
                <tr>
                    <th>序号</th>
                    <th>银行名称</th>
                    <th>级别划分</th>
                    <th>手机号</th>
                    <th>创建时间</th>
                    <th>创建人</th>
                    <th>账号状态</th>
                    <th>操作</th>
                </tr>
                <tr v-show="!!userList" v-for="n in userList">
                    <td>{{$index+1}}</td>
                    <td>{{n.bankName}}</td>
                    <td>
                        <template v-if="n.bankLevel==1">一级分行</template>
                        <template v-if="n.bankLevel==2">二级分行</template>
                        <template v-if="n.bankLevel==3">信用卡部</template>
                        <template v-if="n.bankLevel==4">营业部</template>
                    </td>
                    <td>{{n.phone}}</td>
                    <td>{{n.lastLoginTime | datatime}}</td>
                    <td>{{n.createUserName}}
                    </td>
                    <td>{{n.status}}
                        <template v-if="n.status">启用</template>
                        <template v-else>禁用</template>
                    </td>
                    <td>
                        <a @click="showInfo(n)">详情</a>
                        <a @click="showEdit(n)">编辑</a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script type="text/javascript">
    import model from '../../ajax/config/user_model'
    export default{
        data(){
            this.model=model(this)
            return{
                userList:[]
            }
        },
        methods:{
            getList(){
                this.model.getUserList().then((res)=>{
                    this.$set('userList',res.data.data);
                })
            },
            addUser(){
            },
            showInfo(){

            },
            showEdit(){

            }
        },
        ready(){
            this.getList();
        }
    }
</script>