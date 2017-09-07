import store from './vuex/store'
import * as types from './vuex/title-types'
export default function (Vue,router){
    router.map({
        /* 登录页面 */
        '/login': {
            name: 'login',
            component: resolve => {
                require(['./views/login.vue'], res => {
                    resolve(res)
                })
            }
        },
        /* 忘记密码页面 */
        '/forget-password': {
            name: 'forget-password',
            component: resolve => {
                require(['./views/config/forget-password.vue'], res => {
                    resolve(res)
                })
            }
        },
        /* 主容器 */
        '/index':{
            router_type:'index',
            name:'index',
            component: (resolve)=>{
                require(['./views/app.vue'],resolve)
            },
            subRoutes:{
                /* 欢迎页面 */
                'home': {
                    name: 'home',
                    router_type:[{link:'home',text:'数据总览'}],
                    router_tile:'数据总览',
                    component: (resolve) => {
                        require(['./views/home.vue'], resolve)
                    }
                },
                /* 活动分析数据总览 */
                'activity-analysis': {
                    name: 'activity-analysis',
                    router_type:[
                        {link:'activity-analysis',text:'活动分析'}
                    ],
                    router_tile:'活动分析',
                    component: (resolve) => {
                        require(['./views/activity/activity-analysis.vue'], resolve)
                    }
                },
                /* 活动分析页面 */
                'activity-data-overview/:adoActivityId/:mainStepChance/:adoActivityIds': {
                    name: 'activity-data-overview',
                    router_type:[
                        {link:'activity-analysis',text:'活动分析'},
                        {link:'activity-data-overview',text:'活动分析-表格总览'}
                    ],
                    router_tile:'活动分析',
                    component: (resolve) => {
                        require(['./views/activity/activity-data-overview.vue'], resolve)
                    }
                },
                /* 活动分析页面pdf导出页面 */
                'activity-pdfout/:pdfActivityId/:pdfActivityIds': {
                    name: 'activity-pdfout',
                    router_type:[
                        {link:'activity-analysis',text:'活动分析'},
                        {link:'activity-pdfout',text:'活动分析-导出PDF'}
                    ],
                    router_tile:'导出PDF',
                    component: (resolve) => {
                        require(['./views/activity/activity-pdfout.vue'], resolve)
                    }
                },
                /* 活动详情页面 */
                'activity-info/:infoId': {
                    name: 'activity-info',
                    router_type:[
                        {link:'activity-info',text:'活动详情'}
                    ],
                    router_tile:'活动详情',
                    component: (resolve) => {
                        require(['./views/activity/activity-info.vue'], resolve)
                    }
                },
                /* 交易查询*/
                'transaction-search':{
                    name:'transaction-search',
                    router_type:[
                        {link:'transaction-search',text:'交易查询'}
                    ],
                    router_tile:'交易查询',
                    component:(resolve)=>{
                        require(['./views/transaction/transaction-search.vue'], resolve)
                    }
                },
                /* 交易明细查询*/
                'transaction-detail/:transactionName/:transactionId':{
                    name:'transaction-detail',
                    router_type:[
                        {link:'transaction-search',text:'交易查询'},
                        {link:'transaction-detail',text:'交易明细'}
                    ],
                    router_tile:'交易明细',
                    component:(resolve)=>{
                        require(['./views/transaction/transaction-detail.vue'], resolve)
                    }
                },
                /* 活动穿透到权益查询*/
                'atl-search/:atlId':{
                    name:'atl-search',
                    router_type:[
                        {link:'activity-manage',text:'活动管理'},
                        {link:'atl-search',text:'权益查询'}
                    ],
                    router_tile:'权益查询',
                    component:(resolve)=>{
                        require(['./views/latinos/atl-search.vue'], resolve)
                    }
                },
                /* 权益查询*/
                'latinos-search':{
                    name:'latinos-search',
                    router_type:[
                        {link:'latinos-search',text:'权益查询'}
                    ],
                    router_tile:'权益查询',
                    component:(resolve)=>{
                        require(['./views/latinos/latinos-search.vue'], resolve)
                    }
                },
                /* 权益明细查询*/
                'latinos-detail/:latinosID/:couponName/:activityName/:startTime/:endTime/:couponFaceValue/:couponType':{
                    name:'latinos-detail',
                    router_type:[
                        {link:'latinos-search',text:'权益查询'},
                        {link:'latinos-detail',text:'权益明细'}
                    ],
                    router_tile:'权益明细',
                    component:(resolve)=>{
                        require(['./views/latinos/latinos-detail.vue'], resolve)
                    }
                },
                /* 密码设置页面 */
                'password-config': {
                    name: 'password-config',
                    router_type:[
                        {link:'password-config',text:'密码设置'}
                    ],
                    router_tile:'密码设置',
                    component: (resolve) => {
                        require(['./views/config/password-config.vue'], resolve)
                    }
                },
                /* 用户设置页面 */
                'user-config': {
                    name: 'user-config',
                    router_type:[
                        {link:'user-config',text:'用户设置'}
                    ],
                    router_tile:'用户设置',
                    component: (resolve) => {
                        require(['./views/config/user-config.vue'], resolve)
                    }
                },
                /* 工具页面 */
                'uploadForm': {
                    name: 'uploadForm',
                    router_type:[
                        {link:'user-config',text:'用户设置'}
                    ],
                    router_tile:'工具页面',
                    component: (resolve) => {
                        require(['./views/uploadForm/uploadForm.vue'], resolve)
                    }
                }
            }
        },
        /* 404路由 */
        '*': {
            name:'404',
            component: ()=>{
                router.go({ name: 'login'})
            }
        }
    })

    router.beforeEach(transition =>{
        if(!sessionStorage.getItem('loginList')&&transition.to.name!=='forget-password'){
            router.go({ name: 'login'});
        }
        transition.next()
    })
    
    router.afterEach(transition =>{
        store.dispatch(types.CHANGE_TITLE, transition.to);
        if(back_json.num==0){
            back_json.isback=true;
        }
        else{
            back_json.isback=false;
            back_json.num=0;
            localStorage.removeItem(transition.to.path);
        }
    })
}