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
                'activity-rule/:propes':{
                    name:'activity-rule',
                    router_type:'activity',
                    component:(resolve)=>{
                        require(['./views/activity/activity-rule.vue'],resolve)
                    },
                    subRoutes:{
                        'MeetMinus':{
                            name:'MeetMinus',
                            router_type:'activity',
                            component:(resolve)=>{
                                require(['./views/rule-template/MeetMinus.vue'],resolve)
                            }
                        },
                        'RandomMinus':{
                            name:'RandomMinus',
                            router_type:'activity',
                            component:(resolve)=>{
                                require(['./views/rule-template/RandomMinus.vue'],resolve)
                            }
                        }
                    }
                },
                'bussiness-set/:bpropes/:bactivityId':{
                    name:'bussiness-set',
                    router_type:'activity',
                    component:(resolve)=>{
                        require(['./views/activity/bussiness-set.vue'],resolve)
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
                /* 活动分析页面 */
                'activity-analysis': {
                    name: 'activity-analysis',
                    router_type:'activity-analysis',
                    component: (resolve) => {
                        require(['./views/activity/activity-analysis.vue'], resolve)
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

    })
}