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
                    <th>行政级别</th>
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
                    <td>
                        <template v-if="n.bankLevel==1">一级分行</template>
                        <template v-if="n.bankLevel==2">二级分行</template>
                        <template v-if="n.bankLevel==3">信用卡部</template>
                        <template v-if="n.bankLevel==4">营业部</template>
                    </td>
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
                        <a @click="showInfo(n.id)">详情</a>
                        <template v-if="n.editable">
                            <a @click="showEdit(n.id)">编辑</a>
                        </template>
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
                :title.sync="addTitle" @kok="addBtn" @kcancel="addshow = false"
        >
            <div>
                <div class="form-group" v-if="addList.id!=loginUserID">
                    <label class="name-left"><i>*</i>银行名称</label>
                    <select v-model="addList.bankID" class="select">
                        <option :value="" disabled="disabled">选择银行</option>
                        <option v-for="(index,n) in bankLists" :value="n.id">{{n.shortName}}</option>
                    </select>
                </div>
                <div class="form-group" v-if="addList.id==loginUserID">
                    <label class="name-left"><i>*</i>银行名称</label>
                    <span class="catch-infor">{{addList.bankName}}</span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>用户名</label>
                    <input type="text" class="input" v-model="addList.name" placeholder=" 请输入用户名">
                    <ks-checkbox :checked.sync="loginAccountType1"  @change="getloginAccountType(loginAccountType1,loginAccountType2)">可作为登录账号</ks-checkbox>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>手机号码</label>
                    <input type="text" class="input" v-model="addList.phone" @change="changePassword(false)" v-limitnumber="addList.phone" placeholder="请输入真实手机号码">
                    <ks-checkbox :checked.sync="loginAccountType2"  @change="getloginAccountType(loginAccountType1,loginAccountType2)">可作为登录账号</ks-checkbox>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>密码</label>
                    <input type="password" class="input" v-model="addList.curPassword" @focus="changecurPassword"  placeholder="填写密码或勾选">
                    <ks-checkbox :checked.sync="passWordCheck" v-show="!!addList.phone" @change="changePassword(passWordCheck)">默认 手机号作为密码</ks-checkbox>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>状态</label>
                        <ks-radio :checked.sync="addList.status" :value="'false'" name="TEST1">禁用</ks-radio>
                        <ks-radio :checked.sync="addList.status" :value="'true'" name="TEST1">启用</ks-radio>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>功能级</label>
                    <div class="function-area">
                        <ks-checkbox :checked.sync="checkAll" @click="checkedAll">全选</ks-checkbox>
                        <ks-checkbox v-for="n in privileges" v-if="n.name!='密码设置'" @change="checked(n.selected,n.id)" :checked.sync="n.selected" :name="n.name">{{n.name}}</ks-checkbox>
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
                    <span class="catch-infor">{{addList.bankName}}</span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>行政级别</label>
                    <span class="catch-infor">
                         <template v-if="addList.bankLevel==1">一级分行</template>
                         <template v-if="addList.bankLevel==2">二级分行</template>
                         <template v-if="addList.bankLevel==3">信用卡部</template>
                         <template v-if="addList.bankLevel==4">营业部</template>
                    </span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>用户名</label>
                    <span class="catch-infor">{{addList.name}}</span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>手机号码</label>
                    <span class="catch-infor">{{addList.phone}}</span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>状态</label>
                    <span class="catch-infor">
                        <template v-if="!addList.status">禁用</template>
                        <template v-if="addList.status">启用</template>
                    </span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>功能级</label>
                    <div class="function-area">
                        <ks-checkbox v-for="n in privileges" :name="n.name" :disable="true" :checked.sync="n.selected">{{n.name}}</ks-checkbox>
                    </div>
                </div>
                <div class="form-group close-center">
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
                loginUserID:JSON.parse(sessionStorage.getItem("loginList")).id,
                checkboxList:[],
                objectotalNumber:1,
                defaultData:{
                    pageIndex:1,
                    pageSize:10,
                },
                addTitle:'',
                bankLevelList:[],
                addshow:false,
                infoshow:false,
                loginAccountType1:true,
                loginAccountType2:true,
                passWordCheck:false,
                userList:[],
                checkAll:false,
                bankLists:[],
                privileges:[],
                gnprivilegeIDs:[],
                addList:{
                    bankID:'',
                    bankLevel:'',
                    bankName:'',
                    name:'',
                    phone:'',
                    curPassword :'',
                    status:'true',
                    loginAccountType:'3',
                    privilegeIDs:[]
                }
            }
        },
        methods:{
            getCheckAll(){
                let check=true;
                _.map(this.privileges,(val)=>{
                    if(!val.selected){
                        check=false;
                    }
                })
                this.checkAll=check;
            },
            checkedAll(){
                let data=_.cloneDeep(this.privileges);
                if(!this.checkAll){
                    _.map(data,(val)=>{
                        val.selected=true;
                        this.addList.privilegeIDs.push(val.id);
                        this.gnprivilegeIDs.push(val.name);
                    })
                }else{
                    _.map(data,(val)=>{
                        val.selected=false;
                    })
                    this.addList.privilegeIDs=[];
                    this.gnprivilegeIDs=[];
                }
                this.$set('privileges',data);
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
                this.addshow=false;
                this.getList();
            },
            getBankList(){ 
                // this.model.getBanklevelList().then((res)=>{
                //     if(res.data.code===0){
                //         // this.addList.bankLevel=''+this.bankLevelList[0];
                //     }
                // })
                this.model.getPrivilegesList().then((res)=>{
                    if(res.data.code===0){
                        this.$set('privileges',res.data.dataList);
                    }
                })
                let requestParam = {
                    "noPage":1,
                    "status":1,
                    "isEdit":1
                };
                this.model.getBankList(requestParam).then((res)=>{
                    if (res.data.code ===0){
                        this.$set('bankLists', res.data.dataList);
                    }
                })
            },
            addUser(){
                this.addList={
                    bankLevel:'',
                    bankName:'',
                    name:'',
                    phone:'',
                    curPassword :'',
                    status:'true',
                    loginAccountType:'3',
                    privilegeIDs:[]
                }
                this.gnprivilegeIDs=[];
                this.loginAccountType1=true;
                this.loginAccountType2=true;
                this.getBankList();
                this.addTitle='新增用户';
                this.addshow=true;
            },
            showInfo(_id){
                this.model.getUserInfo(_id).then((res)=>{
                    if(res.data.code===0){
                        this.$set('addList',res.data.data);
                        this.$set('privileges',res.data.data.privilegeList);
                        this.infoshow=true;
                    }
                })
            },
            showEdit(_id){
                this.addTitle='编辑用户';
                this.passWordCheck=false;
                this.getBankList();
                this.model.getUserInfo(_id).then((res)=>{
                    if(res.data.code===0){
                        this.$set('addList',res.data.data);
                        this.$set('privileges',res.data.data.privilegeList);
                        this.addList.status=''+this.addList.status;
                        this.addList.curPassword='::::::';
                        this.addList.privilegeIDs=[];
                        _.map(this.privileges,(val)=>{
                                if(val.selected){
                                    this.addList.privilegeIDs.push(val.id);
                                    this.gnprivilegeIDs.push(val.name);
                                }
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
                        this.getCheckAll();
                        this.addshow=true;
                    }
                })
            },
            addBtn(){
                (this.addTitle=='新增用户')?this.addUserTrue():this.editUserTrue()
            },
            addUserTrue(){
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
                if(!_checked){
                    _.remove(this.addList.privilegeIDs,(val)=>{
                        return val==_id;
                    })
                }else{
                    this.addList.privilegeIDs.push(_id);
                }
                this.getCheckAll();
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