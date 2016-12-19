<template>
    <div class="menu">
        <ul class="menu-first">
            <li><a v-link="{name:'home'}"><i class="icon icon-home"></i>首页</a></li>
            <li>
                <span><i class="icon icon-coin-yen"></i>营销</span>
                <ul>
                    <li><a v-link="{name:''}">创建活动</a></li>
                    <li><a v-link="{name:''}">活动管理</a></li>
                    <li><a v-link="{name:''}">活动分析</a></li>
                </ul>
            </li>
            <li>
                <span><i class="icon icon-wrench"></i>设置</span>
                <ul>
                    <li><a v-link="{name:'bank-config'}">基本设置</a></li>
                    <li><a v-link="{name:''}">权限设置</a></li>
                    <li><a v-link="{name:'password-config'}">密码设置</a></li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return{
            }
        },
        methods:{
            getMenuHeight(){
                let availableHeight = document.body.clientHeight  - document.querySelector('.header').offsetHeight - document.querySelector('.footer').offsetHeight;
                document.querySelector('.content').style.height=availableHeight+'px';
            }
        },
        ready(){
            this.getMenuHeight();
            window.onresize=(()=>{
                this.getMenuHeight()
            })
        }
    }
</script>
