<template>
    <div class="header">
        <div class="header-title">银行活动管理系统</div>
        <div class="header-infor">
            <div class="img-area">
                <img src="../../../img/username.png" alt="">
            </div>
            <div class="information-show">
                <span>建设银行江西分行</span>
                <span>信用卡部</span>
            </div>
            <div class="function-click">
                <a @click="loginOut">退出</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        created(){
            if(!sessionStorage.getItem('loginList')){
                this.$router.go('login');
            }
        },
        data(){
            return{
            }
        },
        methods:{
            loginOut(){
                this.$http.post('./user/logout').then((data)=>{
                    if(data.data.code===0){
                        sessionStorage.clear();
                        this.$router.go('login');
                    }
                    else{
                        dialog('error',data.data.message)
                    }
                })
            }
        }
    }
</script>
