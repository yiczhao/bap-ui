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
                            <input id="login-usertype" class="login-usertype" type="text" name="name" placeholder="用户名/手机号码" v-model="loginData.name">
                        </div>
                        <div class="group-password">
                            <input id="login-passwordtype" class="login-passwordtype" type="password" name="password" placeholder="密码" @keyup.enter="login" v-model="loginData.password">
                        </div>
                        <div class="login">
                             <ks-switch :disable="false" @change="autoType" :def-checked="true" color="#2196F3" size="mini" :checked.sync="checked"></ks-switch>
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
                loginData:{
                    name:"",
                    password:"",
                },
                checked:false,
            }
        },
        methods:{
            login(){
                this.$http.post('./user/login',this.loginData).then((data)=>{
                    if(data.data.code===0){
                        sessionStorage.setItem('loginList',JSON.stringify(data.data.data));
                        if (this.checked) {
                            localStorage.setItem('userInfor',JSON.stringify(this.loginData));
                        }
                        this.$router.go({'name':'home'});
                    }
                });
            },
            autoType(){
                if (!this.checked) {
                    localStorage.clear();
                }
            },
        },
        ready (){
            if (!!localStorage.getItem('userInfor')) {
                this.$set('loginData',JSON.parse(localStorage.getItem('userInfor')));
                this.checked=true;
            }
            sessionStorage.clear()
        }
    }
</script>