<template>
    <div class="header">头部模板</div>
</template>
<style>
    .header{
        background-color:#ff0000;
    }
</style>
<script>
    export default{
        created(){
            if(!sessionStorage.getItem('loginList')){
                this.$router.go('login');
            }
        },
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>
