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
                    router_type:'home',
                    component: (resolve) => {
                        require(['./views/home.vue'], resolve)
                    }
                },
                /* 创建活动页面 */
                'create-activity': {
                    name: 'create-acitvity',
                    router_type:'acitvity',
                    component: (resolve) => {
                        require(['./views/activity/create-activity.vue'], resolve)
                    }
                },
                'basic-rule/:activityId/:rulename':{
                    name:'basic-rule',
                    router_type:'activity',
                    component:(resolve)=>{
                        require(['./views/activity/basic-rule.vue'],resolve)
                    }
                },
                'activity-rule':{
                    name:'activity-rule',
                    router_type:'activity',
                    component:(resolve)=>{
                        require(['./views/activity/activity-rule.vue'],resolve)
                    },
                    subRoutes:{
                        'MeetMinus/:ruleId':{
                            name:'MeetMinus',
                            router_type:'activity',
                            component:(resolve)=>{
                                require(['./views/rule-template/MeetMinus.vue'],resolve)
                            }
                        },
                        'RandomMinus/:ruleId':{
                            name:'RandomMinus',
                            router_type:'activity',
                            component:(resolve)=>{
                                require(['./views/rule-template/RandomMinus.vue'],resolve)
                            }
                        },
                        'EveryMeetMinus/:ruleId':{
                            name:'EveryMeetMinus',
                            router_type:'activity',
                            component:(resolve)=>{
                                require(['./views/rule-template/EveryMeetMinus.vue'],resolve)
                            }
                        },
                        'ImmediatelyMinus/:ruleId':{
                            name:'ImmediatelyMinus',
                            router_type:'activity',
                            component:(resolve)=>{
                                require(['./views/rule-template/ImmediatelyMinus.vue'],resolve)
                            }
                        },
                        'MeetDiscount/:ruleId':{
                            name:'MeetDiscount',
                            router_type:'activity',
                            component:(resolve)=>{
                                require(['./views/rule-template/MeetDiscount.vue'],resolve)
                            }
                        },
                        'Ticket/:ruleId':{
                            name:'Ticket',
                            router_type:'activity',
                            component:(resolve)=>{
                                require(['./views/rule-template/Ticket.vue'],resolve)
                            }
                        },
                        'SerialDiscount/:ruleId':{
                            name:'SerialDiscount',
                            router_type:'activity',
                            component:(resolve)=>{
                                require(['./views/rule-template/SerialDiscount.vue'],resolve)
                            }
                        },
                        'WeekdayDiscount/:ruleId':{
                            name:'WeekdayDiscount',
                            router_type:'activity',
                            component:(resolve)=>{
                                require(['./views/rule-template/WeekdayDiscount.vue'],resolve)
                            }
                        },
                        'DateDiscount/:ruleId':{
                            name:'DateDiscount',
                            router_type:'activity',
                            component:(resolve)=>{
                                require(['./views/rule-template/DateDiscount.vue'],resolve)
                            }
                        },
                        'RandomDiscount/:ruleId':{
                            name:'RandomDiscount',
                            router_type:'activity',
                            component:(resolve)=>{
                                require(['./views/rule-template/RandomDiscount.vue'],resolve)
                            }
                        },
                        'CouponDiscount/:ruleId':{
                            name:'CouponDiscount',
                            router_type:'activity',
                            component:(resolve)=>{
                                require(['./views/rule-template/CouponDiscount.vue'],resolve)
                            }
                        },
                        'CouponMinus/:ruleId':{
                            name:'CouponMinus',
                            router_type:'activity',
                            component:(resolve)=>{
                                require(['./views/rule-template/CouponMinus.vue'],resolve)
                            }
                        },
                    }
                },
                'Custom':{
                    name:'Custom',
                    router_type:'Custom',
                    component:(resolve)=>{
                        require(['./views/rule-template/Custom.vue'],resolve)
                    }
                },
                'bussiness-set/:bactivityId':{
                    name:'bussiness-set',
                    router_type:'activity',
                    component:(resolve)=>{
                        require(['./views/activity/bussiness-set.vue'],resolve)
                    }
                },
                'ticketbussiness-set/:tactivityId':{
                    name:'ticketbussiness-set',
                    router_type:'activity',
                    component:(resolve)=>{
                        require(['./views/activity/ticketbussiness-set.vue'],resolve)
                    }
                },
                /* 活动管理页面 */
                'activity-manage': {
                    name: 'activity-manage',
                    router_type:'acitvity',
                    component: (resolve) => {
                        require(['./views/activity/activity-manage.vue'], resolve)
                    }
                },
                /* 活动管理页面 */
                'activity-info/:infoId': {
                    name: 'activity-info',
                    router_type:'acitvity',
                    component: (resolve) => {
                        require(['./views/activity/activity-info.vue'], resolve)
                    }
                },
                /* 活动分析页面 */
                'activity-analysis': {
                    name: 'activity-analysis',
                    router_type:'activity',
                    component: (resolve) => {
                        require(['./views/activity/activity-analysis.vue'], resolve)
                    }
                },
                /* 活动分析页面pdf导出页面 */
                'activity-pdfout/:pdfoutId/:pdfActivityId': {
                    name: 'activity-pdfout',
                    router_type:'activity',
                    component: (resolve) => {
                        require(['./views/activity/activity-pdfout.vue'], resolve)
                    }
                },
                /* 交易查询*/
                'transaction-search':{
                    name:'transaction-search',
                    router_type:'transaction',
                    component:(resolve)=>{
                        require(['./views/transaction/transaction-search.vue'], resolve)
                    }
                },
                /* 交易明细查询*/
                'transaction-detail/:transactionName/:transactionId':{
                    name:'transaction-detail',
                    router_type:'transaction',
                    component:(resolve)=>{
                        require(['./views/transaction/transaction-detail.vue'], resolve)
                    }
                },
                /* 权益查询*/
                'latinos-search':{
                    name:'latinos-search',
                    router_type:'latinos',
                    component:(resolve)=>{
                        require(['./views/latinos/latinos-search.vue'], resolve)
                    }
                },
                /* 权益明细查询*/
                'latinos-detail/:latinosID':{
                    name:'latinos-detail',
                    router_type:'latinos',
                    component:(resolve)=>{
                        require(['./views/latinos/latinos-detail.vue'], resolve)
                    }
                },
                /* 批量送权益*/
                'latinos-batch/:batchId/:batchUserId':{
                    name:'latinos-batch',
                    router_type:'latinos',
                    component:(resolve)=>{
                        require(['./views/latinos/latinos-batch.vue'], resolve)
                    }
                },
                /* 批量送权益*/
                'latinos-user/:latinosUserId':{
                    name:'latinos-user',
                    router_type:'latinos',
                    component:(resolve)=>{
                        require(['./views/latinos/latinos-user.vue'], resolve)
                    }
                },
                /* 银行基本设置页面 */
                'bank-config': {
                    name: 'bank-config',
                    router_type:'config',
                    component: (resolve) => {
                        require(['./views/config/bank-config.vue'], resolve)
                    }
                },
                /* 密码设置页面 */
                'password-config': {
                    name: 'password-config',
                    router_type:'config',
                    component: (resolve) => {
                        require(['./views/config/password-config.vue'], resolve)
                    }
                },
                /* 用户设置页面 */
                'user-config': {
                    name: 'user-config',
                    router_type:'config',
                    component: (resolve) => {
                        require(['./views/config/user-config.vue'], resolve)
                    }
                },
                /* 分支行设置页面 */
	            'branch-bank': {
		            name: 'branch-bank',
		            router_type:'config',
		            component: (resolve) => {
			            require(['./views/config/branch-bank.vue'], resolve)
		            }
	            },
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