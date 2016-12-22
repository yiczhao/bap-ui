<template>
    <div class="header">
        <div class="header-title">银行活动管理系统</div>
        <div class="header-infor">
            <div class="img-area">
                <img class="logo-img" :src="bankLogo" v-show="!!bankLogo" alt="">
            </div>
            <div class="information-show">
                <span>{{bankName}}</span>
                <span>{{name}}</span>
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
            }else{
                if(!!JSON.parse(sessionStorage.getItem('loginList')).bankLogo){
                    this.bankLogo="data:image/png;base64,"+JSON.parse(sessionStorage.getItem('loginList')).bankLogo;
                    this.bankName=JSON.parse(sessionStorage.getItem('loginList')).bankName;
                    this.name=JSON.parse(sessionStorage.getItem('loginList')).name;
                }
            }
        },
        data(){
            return{
                bankLogo:'',
                bankName:'',
                name:''
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
