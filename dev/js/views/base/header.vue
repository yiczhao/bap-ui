<template>
    <div class="header">头部模板</div>
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
        }
    }
</script>
