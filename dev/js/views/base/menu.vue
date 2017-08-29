<template>
    <div class="menu">
        <ul class="menu-first">
            <template  v-for="n in menuLists">
                <li><a :class="{'link-active':links==n.code&&!!n.code}" v-link="{name:n.code}">{{n.name}}</a></li>
            </template>
        </ul>
    </div>
</template>
<script>
    import store from '../../vuex/store'
    export default{
        data(){
            return{
                menuLists: [],
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
                },
                showUl ({ showMenu }) {
                    return showMenu.menuShow;
                }
            }
        },
        methods:{
            getMenuHeight(){
                let availableHeight = document.body.clientHeight  - document.querySelector('.header').offsetHeight;
                document.querySelector('.content').style.height=availableHeight+'px';
            },
            waiting(){
                dialog('info','正在开发中，敬请期待！');
            },
            changeShow(index){
                store.dispatch('SHOW_MENU',index);
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
