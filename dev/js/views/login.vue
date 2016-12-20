<template>
    <div class="login login-container" id="test01">
        <div class="page-container">
            <div class="container-left">
                <div class="kashuo-logo"></div>
                <div class="system-title">银行活动管理系统</div>
            </div>
            <form>
                <div class="center-container">
                    <div class="form-group">
                        <div class="group-title">
                                <span>请登录</span>
                        </div>
                        <div class="group-username">
                            <input id="login-usertype" class="login-usertype" type="text" name="username" placeholder="用户名/手机号码/邮箱地址" v-model="username">
                        </div>
                        <div class="group-password">
                            <input id="login-passwordtype" class="login-passwordtype" type="password" name="password" placeholder="密码" @keyup.enter="login" v-model="password">
                        </div>
<!--                         <div class="form-aboutPassword">
                            <label>
                                <input class="about-password" type="checkbox" checked="checked" name="" v-model="about">
                                <span>记住密码</span>
                            </label>
                        </div> -->
                        <div class="form-login">
                            <input class="Login" type="button" name="" value="登   录" @click="login">
                        </div>
                    </div>
                    <div class="forget-password">
                        <a>忘记密码</a>
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
                        this.$router.go('index');
                    }
                    else{
                        dialog('error',data.data.message)
                    }
                })
            }
        },
        ready (){
            sessionStorage.clear()
        }
    }
</script>