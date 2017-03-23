<template>
    <div class="menu">
        <ul class="menu-first">
            <li><a v-link="{name:'home'}"><i class="icon icon-home"></i>首页</a></li>
                <li>
                    <span><i class="icon icon-coin-yen"></i>营销</span>
                    <ul>
                        <template v-for="n in menuLists">
                            <li  v-if="n.type==1"><a :class="{'link-active':links==n.code}" v-link="{name:n.code}">{{n.name}}</a></li>
                        </template>
                    </ul>
                </li>
                <li>
                    <span><i class="icon icon-search"></i>查询</span>
                    <ul v-for="n in menuLists">
                        <li  v-if="n.type==2"><a :class="{'link-active':links==n.code}" v-link="{name:n.code}">{{n.name}}</a></li>
                    </ul>
                </li>
                <li>
                    <span><i class="icon icon-wrench"></i>设置</span>
                    <ul>
                        <template  v-for="n in menuLists">
                            <li  v-if="n.type==3"><a :class="{'link-active':links==n.code}" v-link="{name:n.code}">{{n.name}}</a></li>
                        </template>
                        <li><a v-link="{name:'password-config'}">密码设置</a></li>
                    </ul>
                </li>
        </ul>
    </div>
</template>
<script>
    import store from '../../vuex/store'
    export default{
        data(){
            return{
                menuLists: []
            }
        },
        store,
        vuex: {
            getters: {
                links ({ titles }) {
                    let link=''
                    if(titles.crumbsList.length>1){
                        link=titles.crumbsList[0].link
                    }
                    return link;
                }
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
                (!!document.querySelector('.content'))?this.getMenuHeight():null;
            });
        },
        created(){
            this.$set('menuLists',JSON.parse(sessionStorage.getItem('menuList')))
        }
    }
</script>
