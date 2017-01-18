<template>
    <header-component></header-component>
    <div class="content">
        <div class="content-main">
            <div class="content-left">
                <menu-component></menu-component>
            </div>
            <div class="content-right">
                <loading></loading>
                <router-view></router-view>
            </div>
        </div>
    </div>
    <!--<footer-component></footer-component>-->
</template>
<script type="text/javascript">
    import HeaderComponent from './base/header.vue'
    import MenuComponent from './base/menu.vue'
    import store from '../vuex/store'
//    import FooterComponent from './base/footer.vue'
    export default{
        data(){
            return{
            }
        },
        store,
        components:{
            HeaderComponent,MenuComponent
        },
        created(){
            formDataRequest('./bank/bank_list').get({'noPage':1}).then((res)=>{
                if(res.data.code===0){
                    let data=[]
                    let datas=[]
                    _.map(res.data.dataList,(val)=>{
                        (!!val.uuid)?data.push(val.uuid):null;
                        (!!val.uuid)?datas.push({
                            id:val.uuid,
                            name:val.shortName
                        }):null;
                    })
                    sessionStorage.setItem('uuids',_.join(data, ','));
                    sessionStorage.setItem('bankNames',JSON.stringify(datas));
                }
            })
        }
    }
</script>