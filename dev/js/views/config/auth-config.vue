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
                        <a @click="showInfo(n.id)">详情</a>
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
                <div class="form-group" v-if="addTitle=='新增用户'">
                    <label class="name-left"><i>*</i>银行名称</label>
                    <v-select :value.sync="bankName" :taggable="true" :options="bankNameList"></v-select>
                </div>
                <div class="form-group" v-if="addTitle=='编辑用户'">
                    <label class="name-left"><i>*</i>银行名称</label>
                    <span>{{addList.bankName}}</span>
                </div>
                <div class="form-group" v-if="addTitle=='新增用户'">
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
                <div class="form-group" v-if="addTitle=='编辑用户'">
                    <label class="name-left"><i>*</i>级别划分</label>
                    <span>
                         <template v-if="addList.bankLevel==1">一级分行</template>
                         <template v-if="addList.bankLevel==2">二级分行</template>
                         <template v-if="addList.bankLevel==3">信用卡部</template>
                         <template v-if="addList.bankLevel==4">营业部</template>
                    </span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>负责人</label>
                    <input type="text" class="input" v-model="addList.name" placeholder=" 请输入负责人的真实姓名">
                    <label class="name-right"><input type="checkbox" v-model="loginAccountType1"  @change="getloginAccountType(loginAccountType1,loginAccountType2)" class="checkBox">可作为登录账号</label>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>手机号码</label>
                    <input type="text" class="input" v-model="addList.phone" v-limitnumber="addList.phone" placeholder="请输入负责人的真实手机号码">
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
                        <label v-for="n in privileges['1']" class="function-choose"><input type="checkbox"  @change="checked(n.selected,n.id)" v-model="n.selected">{{n.name}}</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>数据级</label>
                    <div class="function-area">
                        <label v-for="n in privileges['2']" class="function-choose"><input type="checkbox"  @change="checked(n.selected,n.id)" v-model="n.selected">{{n.name}}</label>
                    </div>
                </div>
            </div>
        </content-dialog>
        <content-dialog
                :show.sync="infoshow" :is-button="false" :type.sync="'infos'"
                :title.sync="'查看详情'"
        >
            <div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>银行名称</label>
                    <span>{{addList.bankName}}</span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>级别划分</label>
                    <span>
                         <template v-if="addList.bankLevel==1">一级分行</template>
                         <template v-if="addList.bankLevel==2">二级分行</template>
                         <template v-if="addList.bankLevel==3">信用卡部</template>
                         <template v-if="addList.bankLevel==4">营业部</template>
                    </span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>负责人</label>
                    <span>{{addList.name}}</span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>手机号码</label>
                    <span>{{addList.phone}}</span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>状态</label>
                    <span>
                        <template v-if="!addList.status">禁用</template>
                        <template v-if="addList.status">启用</template>
                    </span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>功能级</label>
                    <div class="function-area">
                        <label v-for="n in privileges['1']" class="function-choose"><input type="checkbox" disabled @change="checked(n.selected,n.id)" v-model="n.selected">{{n.name}}</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>数据级</label>
                    <div class="function-area">
                        <label v-for="n in privileges['2']" class="function-choose"><input type="checkbox" disabled @change="checked(n.selected,n.id)" v-model="n.selected">{{n.name}}</label>
                    </div>
                </div>
                <div class="form-group">
                    <a class="btn btn-gray" @click="this.infoshow=false">关闭</a>
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
                bankLevelList:[],
                bankName: null,
                bankNameList: [],
                addshow:false,
                infoshow:false,
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
            initList(){
                this.addshow=false;
                this.getList();
            },
            getBankList(){
                this.model.getBankList().then((res)=>{
                    _.map(res.data.dataList,(val)=>{
                        this.bankNameList.push(val.shortName)
                    })
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
            showInfo(_id){
                this.model.getUserInfo(_id).then((res)=>{
                    if(res.data.code===0){
                        this.$set('addList',res.data.data);
                        this.$set('privileges',res.data.data.privileges);
                        this.infoshow=true;
                    }
                })
            },
            showEdit(_id){
                this.addTitle='编辑用户';
                this.model.getUserInfo(_id).then((res)=>{
                    this.$set('addList',res.data.data);
                    this.$set('privileges',res.data.data.privileges);
                    this.addList.status=''+this.addList.status;
                    this.addList.curPassword='::::::';
                    this.addList.privilegeIDs=[];
                    _.map(res.data.data.privileges,(val)=>{
                        _.map(val,(value)=>{
                            if(value.selected){
                                this.addList.privilegeIDs.push(value.id);
                            }
                        })
                    })
                    if(!this.addList.loginAccountType){
                        this.loginAccountType1=false;
                        this.loginAccountType2=false;
                    }
                    if(this.addList.loginAccountType=='1'){
                        this.loginAccountType1=true;
                        this.loginAccountType2=false;
                    }
                    if(this.addList.loginAccountType=='2'){
                        this.loginAccountType1=false;
                        this.loginAccountType2=true;
                    }
                    if(this.addList.loginAccountType=='3'){
                        this.loginAccountType1=true;
                        this.loginAccountType2=true;
                    }
                    this.addshow=true;
                })
            },
            addBtn(){
                (this.addTitle=='新增用户')?this.addUserTrue():this.editUserTrue()
            },
            addUserTrue(){
                this.addList.bankName=this.bankName;
                this.model.addUser(this.addList).then((res)=>{
                    if(res.data.code===0){
                        dialog('success',res.data.message)
                        this.initList();
                    }
                })
            },
            editUserTrue(){
                this.model.editUser(this.addList).then((res)=>{
                    if(res.data.code===0){
                        dialog('success',res.data.message)
                        this.initList();
                    }
                })
            },
            checked(_checked,_id){
                if(_checked){
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