<template>
    <div class="login login-container" id="test01">
        <div class="page-container">
            <div class="container-left">
                <div class="kashuo-logo"></div>
                <div class="system-title">银行活动管理系统</div>
                <div class="center-img"></div>
            </div>
            <form>
                <div class="center-container">
                    <div class="form-group">
                        <div class="group-title">
                                <span>请登录</span>
                        </div>
                        <div class="group-username">
                            <input id="login-usertype" class="login-usertype" type="text" name="name" placeholder="用户名/手机号码" v-model="username">
                        </div>
                        <div class="group-password">
                            <input id="login-passwordtype" class="login-passwordtype" type="password" name="password" placeholder="密码" @keyup.enter="login" v-model="password">
                        </div>
                        <div class="savePassword">
                             <ks-switch :disable="false" :def-checked="true" color="#2196F3" size="mini" :checked.sync="checked" @change="savePassword"></ks-switch>
                             记住密码
                        </div>
                        <div class="form-login">
                            <input class="Login" type="button" name="" value="登   录" @click="login">
                        </div>
                    </div>
                    <div class="forget-password">
                        <a v-link="{'name':'forget-password'}">忘记密码</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
        data (){
            return {
                username:"",
                password:"",
                checked:false,
            }
        },
        methods:{
            login(){
                let data={
                    name:this.username,
                    password:this.password,
                }
                this.$http.post('./user/login',data).then((data)=>{
                    if(data.data.code===0){
                        sessionStorage.setItem('loginList',JSON.stringify(data.data.data));
                        this.$router.go({'name':'home'});
                    }
                })
            },
            savePassword(){
                var storage=window.localStorage,
                    userInfo={
                        username:this.username,
                        password:this.password
                    };
                storage.setItem('userInfor',JSON.stringify(userInfo));
                console.log(JSON.parse(storage.getItem('userInfor')).username);
                console.log(JSON.parse(storage.getItem('userInfor')).password);
            },
            autoType(){
                // window.onbeforeunload=function() {
                    var storage=window.localStorage;
                    if (this.username=='') {
                        console.log("success")
                        this.username=JSON.parse(storage.getItem('userInfor')).username;
                        this.password=JSON.parse(storage.getItem('userInfor')).password;   
                    }
                }
            // }
        },
        ready (){
            var storage=window.localStorage;
            sessionStorage.clear();
            // this.savePassword();
            this.autoType();
        }
    }
</script>