<template>
    <div class="transaction-detail">
        <div class="table">
            <table>
                <tr>
                    <th>名称参数</th>
                    <th>操作</th>
                </tr>
                <tr>
                    <td>
                        <input class="input" type="text" v-model="cardNumber" @keyup.enter="submit" placeholder="请输入银行卡号"/>
                    </td>
                    <td>
                        <a @click="submit">确认</a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script type="text/javascript">
	export default{
        data(){
            return{
                cardNumber:''
            }
        },
        methods:{
            submit(){
                let data={
                    cardNumber:this.cardNumber
                }
                formDataRequest('./merchant_data/trade_count').get(data).then((res)=>{
                    if(res.data.code===0){
                        dialog('success','成功！');
                    }
                })
                this.$http.post('./user/verify_message_code',data).then((res)=>{
                    if(res.data.code===0){
                        dialog('success','成功！');
                    }
                })
            },
        },
        created(){
            if(JSON.parse(sessionStorage.getItem('loginList')).roleID==1){
                this.$router.go({'name':'home'});
            }
        }
    }
</script>
