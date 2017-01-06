<template>
    <div class="menu">
        <ul class="menu-first">
            <li><a v-link="{name:'home'}"><i class="icon icon-home"></i>首页</a></li>
            <li>
                <span><i class="icon icon-coin-yen"></i>营销</span>
                <ul>
                    <li><a v-link="{name:'create-acitvity'}">创建活动</a></li>
                    <li><a v-link="{name:'activity-manage'}">活动管理</a></li>
                    <li><a v-link="{name:'activity-analysis'}">活动分析</a></li>
                </ul>
            </li>
            <li>
                <span><i class="icon icon-search"></i>查询</span>
                <ul>
                    <li><a v-link="{name:'transaction-search'}">交易查询</a></li>
                </ul>
            </li>
            <li>
                <span><i class="icon icon-wrench"></i>设置</span>
                <ul>
                    <li><a v-link="{name:'user-config'}">用户设置</a></li>
                    <li><a v-link="{name:'branch-bank'}">分支行设置</a></li>
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
                let availableHeight = document.body.clientHeight  - document.querySelector('.header').offsetHeight;
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
