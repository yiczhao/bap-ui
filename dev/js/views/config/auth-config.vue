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
                    <td>{{n.createTime | datetimes}}</td>
                    <td>{{n.createUserName}}
                    </td>
                    <td>
                        <template v-if="n.status">启用</template>
                        <template v-else>禁用</template>
                    </td>
                    <td>
                        <a @click="showInfo(n)">详情</a>
                        <a @click="showEdit(n.id)">编辑</a>
                    </td>
                </tr>
            </table>
        </div>
        <content-dialog
                :show.sync="addshow" :is-cancel="true" :type.sync="'infos'"
                :title.sync="addTitle" @kok="addBtn" @kcancel="addshow = false"
        >
            <div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>银行名称</label>
                    <v-select :value.sync="bankName" :taggable="true" :options="bankNameList"></v-select>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>级别划分</label>
                    <select v-model="addList.bankLevel">
                        <option v-for="(index,n) in bankLevelList" :value="n">
                            <template v-if="n==1">一级分行</template>
                            <template v-if="n==2">二级分行</template>
                            <template v-if="n==3">信用卡部</template>
                            <template v-if="n==4">营业部</template>
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>负责人</label>
                    <input type="text" class="input" v-model="addList.name" placeholder=" 请输入负责人的真实姓名">
                    <label class="name-right"><input type="checkbox" v-model="loginAccountType1"  @change="getloginAccountType(loginAccountType1,loginAccountType2)" class="checkBox">可作为登录账号</label>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>手机号码</label>
                    <input type="text" class="input" v-model="addList.phone" placeholder="请输入负责人的真实手机号码">
                    <label class="name-right"><input type="checkbox" v-model="loginAccountType2"  @change="getloginAccountType(loginAccountType1,loginAccountType2)" class="checkBox">可作为登录账号</label>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>密码</label>
                    <input type="password" class="input" v-model="addList.curPassword " placeholder="填写密码或勾选">
                    <label class="name-right"><input type="checkbox" class="checkBox" @change="changePassword(passWordCheck)" v-model="passWordCheck">默认 手机号作为密码</label>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>状态</label>
                    <label class="choose-radio"><input type="radio" value="false" v-model="addList.status">
                        禁用</label>
                    <label class="choose-radio"><input type="radio" value="true" v-model="addList.status">
                        启用</label>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>功能级</label>
                    <div class="function-area">
                        <label v-for="n in privileges['1']" class="function-choose"><input type="checkbox"  @click="checked(n.select,n.id)" v-model="n.select">{{n.name}}</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>数据级</label>
                    <div class="function-area">
                        <label v-for="n in privileges['2']" class="function-choose"><input type="checkbox"  @click="checked(n.select,n.id)" v-model="n.select">{{n.name}}</label>
                    </div>
                </div>
            </div>
        </content-dialog>
    </div>
</template>
<script type="text/javascript">
    import model from '../../ajax/config/user_model'
    export default{
        data(){
            this.model=model(this)
            return{
                addTitle:'',
                bankLevelList:[' 一级分行','二级分行','信用卡部','营业部'],
                bankName: null,
                bankNameList: ['foo','bar','baz'],
                addshow:false,
                loginAccountType1:true,
                loginAccountType2:true,
                passWordCheck:false,
                userList:[],
                privileges:[],
                addList:{
                    bankLevel:'',
                    bankName:'',
                    name:'',
                    phone:'',
                    curPassword :'',
                    status:'false',
                    loginAccountType:'3',
                    privilegeIDs:[]
                }
            }
        },
        methods:{
            getList(){
                this.model.getUserList().then((res)=>{
                    this.$set('userList',res.data.dataList);
                })
            },
            getBankList(){
                this.model.getBankList().then((res)=>{
                    this.$set('bankNameList',res.data.dataList);
                })
                this.model.getBanklevelList().then((res)=>{
                    this.$set('bankLevelList',res.data.dataList);
                })
                this.model.getPrivilegesList().then((res)=>{
                    this.$set('privileges',res.data.data);
                })
            },
            addUser(){
                this.getBankList();
                this.addTitle='新增用户';
                this.addshow=true;
            },
            showInfo(){
            },
            showEdit(_id){
                this.getBankList();
                this.model.getUserInfo(_id).then((res)=>{
                    this.addshow=true;
                })
            },
            addBtn(){
                (this.addTitle=='新增用户')?this.addUserTrue():this.editUserTrue()
            },
            addUserTrue(){
                this.addList.bankName=this.bankName;
                this.model.addUser(this.addList).then((res)=>{
                    this.addshow=false;
                })
            },
            editUserTrue(){

            },
            checked(_checked,_id){
                if(!_checked){
                    this.addList.privilegeIDs.push(_id);
                }else{
                    _.remove(this.addList.privilegeIDs,(val)=>{
                        return val==_id;
                    })
                }
            },
            getloginAccountType(bool1,bool2){
                if(bool1){
                    this.addList.loginAccountType='1';
                }
                if(bool2){
                    this.addList.loginAccountType='2';
                }
                if(bool1&&bool2){
                    this.addList.loginAccountType='3';
                }
                if(!bool1&&!bool2){
                    this.addList.loginAccountType='';
                }
                console.log('登录账号'+this.addList.loginAccountType);
            },
            changePassword(bool){
                if(bool){
                    this.addList.curPassword =this.addList.phone;
                }else{
                    this.addList.curPassword ='';
                }
            }
        },
        ready(){
            this.getList();
        }
    }
</script>