<template>
    <div class="user-config">
        <div class="form-row">
            <a class="btn btn-info" @click="addUser">新增用户</a>
        </div>
        <div class="table">
            <table>
                <tr>
                    <th>序号</th>
                    <th>银行名称</th>
                    <th>所属部门</th>
                    <th>用户名</th>
                    <th>手机号</th>
                    <th>创建时间</th>
                    <th>创建人</th>
                    <th>账号状态</th>
                    <th>操作</th>
                </tr>
                <tr v-show="!!userList" v-for="n in userList">
                    <td>{{$index+1}}</td>
                    <td>{{n.bankName}}</td>
                    <td>{{n.department}}</td>
                    <td>{{n.name}}</td>
                    <td>{{n.phone}}</td>
                    <td>{{n.createTime | datetime}}</td>
                    <td>{{n.createUserName}}
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
        <content-dialog
                :show.sync="addshow" :is-cancel="true" :type.sync="'infos'"
                :title.sync="addTitle" @kok="addBtn" @kcancel="cancelAll"
        >
            <div class="create-user">
                <div class="form-group">
                    <label class="name-left"><i>*</i>用户身份</label>
                    <select v-model="addList.roleID" @change="addList.bankName=addList.bankId=''" class="select" :disabled="addTitle=='编辑用户'">
                        <option :value="1">银行用户</option>
                        <option :value="2">管理员</option>
                    </select>
                </div>
                <div class="form-group confirm-text">
                    <label class="name-left" v-show="checkText.roleID==true">请选择用户身份</label>
                </div>
                <div class="form-group" v-if="addList.roleID==1" style="position:relative">
                    <label class="name-left"><i>*</i>银行名称</label>
                    <input class="input " type="text" v-model="addList.bankName" placeholder="输入银行名称"
                           @keyup="getActivity($event)" @keyup.enter="searchList"
                           @keyup.up="changeLiIndex('up')" @keyup.down="changeLiIndex('down')"
                    />
                    <div class="showList showLi" v-show="showList">
                        <ul class="showLi">
                            <li class="showLi" v-for="n in activityList" :class="{'checked':liIndex==$index}" @click="getId(n)">{{n.shortName}}</li>
                            <li class="showLi" v-if="!activityList.length">未查询到{{addList.bankName}}银行</li>
                        </ul>
                    </div>
                </div>
                <div class="form-group confirm-text" v-if="addList.roleID==1">
                    <label class="name-left" v-show="checkText.bankName==true">请选择银行</label>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>用户名</label>
                    <input type="text" class="input" v-model="addList.name" placeholder=" 请输入用户名">
                </div>
                <div class="form-group confirm-text">
                    <label class="name-left" v-show="checkText.name==true">请输入用户名</label>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>手机号码</label>
                    <input type="text" class="input" v-model="addList.phone" @change="changePassword(false)" v-limitnumber="addList.phone" placeholder="请输入真实手机号码">
                </div>
                <div class="form-group confirm-text">
                    <label class="name-left" v-show="checkText.phone==true">请输入真实的手机号码</label>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>密码</label>
                    <input type="password" class="input" v-model="addList.curPassword" @focus="changecurPassword"  placeholder="填写密码或勾选">
                    <ks-checkbox :checked.sync="passWordCheck" v-show="!!addList.phone" @change="changePassword(passWordCheck)">默认 手机号作为密码</ks-checkbox>
                </div>
                <div class="form-group confirm-text">
                    <label class="name-left" v-show="checkText.curPassword==true">请填写密码或者勾选</label>
                </div>
                <div class="form-group">
                    <label class="name-left">所属部门</label>
                    <input type="text" class="input" v-model="addList.department" placeholder="填写所属部门">
                </div>
                <div class="form-group confirm-text">
                </div>
                <div class="form-group" v-if="addList.id!=loginUserID">
                    <label class="name-left"><i>*</i>状态</label>
                        <ks-radio :checked.sync="addList.status" :value="'false'" name="TEST1">禁用</ks-radio>
                        <ks-radio :checked.sync="addList.status" :value="'true'" name="TEST1">启用</ks-radio>
                </div>
            </div>
        </content-dialog>
    </div>
</template>
<style lang="scss">
    .user-config{
        .kdialog__btnwrap{
            padding-top:0;padding-bottom:0;height:65px;
        }
        .disable b{
            background: rgba(77, 77, 77, 0.1);
        }
    }
</style>
<script type="text/javascript">
    import model from '../../ajax/config/user_model'
    export default{
        data(){
            this.model=model(this)
            return{
                loginUserID:JSON.parse(sessionStorage.getItem("loginList")).id,
                checkboxList:[],
                objectotalNumber:1,
                defaultData:{
                    pageIndex:1,
                    pageSize:10,
                },
                activityList:[],
                showList:false,
                addTitle:'',
                addshow:false,
                passWordCheck:false,
                userList:[],
                bankLists:[],
                addList:{
                    bankID:'',
                    bankName:'',
                    name:'',
                    phone:'',
                    curPassword :'',
                    status:'true',
                    department:'',
                    roleID:1
                },
                replaceName:'',
                checkText:{
                    bankName:false,
                    name:false,
                    phone:false,
                    curPassword :false,
                },
            }
        },
        methods:{
            searchList(){
                if(this.showList){
                    this.addList.bankName=this.activityList[this.liIndex].shortName;
                    this.addList.bankID=this.activityList[this.liIndex].id;
                }
                this.getList();
            },
            getActivity: _.debounce(function(e){
                if(e.keyCode == 38 || e.keyCode == 40|| e.keyCode == 13){  //向上向下
                    return ;
                }
                let vm=this;
                vm.replaceName=(vm.addList.bankName).replace(/(^\s+)|(\s+$)/g, "");
                let data={
                    bankName:vm.replaceName,
                }
                if(!vm.replaceName){
                    vm.addList.bankName="";
                    vm.showList=false;
                    return;
                }else{
                    vm.$common_model.getBankList(data).then((res)=>{
                        if(res.data.code===0&&res.data.data!=vm.addList.bankName){
                            this.liIndex=0;
                            vm.$set('activityList',res.data.dataList);
                            vm.showList=true;
                        }
                    })
                }
            },300),
            changeLiIndex(type){
                if(!this.activityList.length)return;
                switch (type){
                    case 'up':
                        this.liIndex==0?this.liIndex=this.activityList.length-1:this.liIndex--;
                        break;
                    case 'down':
                        this.liIndex==this.activityList.length-1?this.liIndex=0:this.liIndex++;
                        break;
                    default:
                        break;
                }
            },
            getId({id,shortName}){
                this.showList=false;
                this.addList.bankName=shortName;
                this.addList.bankID=id;
            },
            cancelAll(){
                this.addshow=false;
            },
            getList(){
                this.model.getUserList(this.defaultData).then((res)=>{
                    if(res.data.code===0){
                        this.$set('userList',res.data.dataList);
                        this.$set('objectotalNumber',res.data.objectotalNumber);
                    }
                })
            },
            initList(){
                this.cancelAll();
                this.getList();
            },
            addUser(){
                this.addList={
                    bankName:'',
                    name:'',
                    phone:'',
                    curPassword :'',
                    status:'true',
                    department:'',
                    roleID:1
                }
                this.addTitle='新增用户';
                this.addshow=true;
                this.clear();
            },
            clear(){
                this.checkText.bankName=false;
                this.checkText.name=false;
                this.checkText.phone=false;
                this.checkText.curPassword=false;
            },
            showEdit(_id){
                this.addTitle='编辑用户';
                this.passWordCheck=false;
                this.model.getUserInfo(_id).then((res)=>{
                    if(res.data.code===0){
                        // console.log(res.data.data);
                        this.$set('addList',res.data.data);
                        this.addList.status=''+this.addList.status;
                        this.addList.curPassword='::::::';
                        this.addshow=true;
                    }
                })
            },
            addBtn(){
                this.checkText.bankName=false;
                this.checkText.name=false;
                this.checkText.phone=false;
                this.checkText.curPassword=false;
                (this.addTitle=='新增用户')?this.addUserTrue():this.editUserTrue();
            },
            checkedData(){
                if(this.addList.roleID==1&&!this.addList.bankID){this.checkText.bankName=true;return false}else{this.checkText.bankName=false};
                if(!this.addList.name){this.checkText.name=true;return false}else{this.checkText.name=false};
                if(!this.addList.phone){this.checkText.phone=true;return false}else{this.checkText.phone=false};
                if(!this.addList.curPassword){this.checkText.curPassword=true;return false}else{this.checkText.curPassword=false};
                return true;
            },
            addUserTrue(){
                this.showList=false;
                if(this.checkedData()){
                    this.model.addUser(this.addList).then((res)=>{
                        if(res.data.code===0){
                            dialog('success',res.data.message)
                            this.initList();
                        }
                    })
                }
            },
            editUserTrue(){
                if(this.checkedData()){
                    this.model.addUser(this.addList).then((res)=>{
                        if(res.data.code===0){
                            dialog('success',res.data.message)
                            this.initList();
                        }
                    })
                }
            },
            changePassword(bool){
                if(bool){
                    this.addList.curPassword =this.addList.phone;
                }else{
                    this.addList.curPassword ='';
                    this.passWordCheck=false;
                }
            },
            changecurPassword(){
                this.addList.curPassword=='::::::'?this.addList.curPassword='':null
                this.passWordCheck=false;
            },
        },
        ready(){
            this.getList();
        }
    }
</script>