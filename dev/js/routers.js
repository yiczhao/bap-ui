export default function (Vue,router){
    router.map({

    '/':{
        router_type:'root',
        name:'root',
        component: function(resolve){
            require(['./views/app.vue'],resolve)
        },
        subRoutes:{

        }
    }

    })


    router.beforeEach(transition =>{
        if(transition.to.name == 'root') {
        }
        transition.next()
    })
    
    router.afterEach(transition =>{

    })
}