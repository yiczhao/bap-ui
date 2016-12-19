<template>
    <div class="bank-config">
        <div class="form-row">
            <div class="form-label"><i>*</i>银行简称</div>
            <div class="form-input"><input type="text" class="form-input" placeholder="请输入银行的简称 南昌银行信用卡部"/></div>
        </div>
        <div class="form-row">
            <div class="form-label">银行全称</div>
            <div class="form-input">
                <input type="text" class="form-input" placeholder=" 请输入银行的全称"/>
            </div>
        </div>
        <div class="form-row">
            <div class="form-label"><i>*</i>负责人</div>
            <div class="form-input"><input type="text" class="form-input" placeholder="请输入银行负责人姓名 张三"/></div>
        </div>
        <div class="form-row">
            <div class="form-label"><i>*</i>手机号码</div>
            <div class="form-input"><input type="text" class="form-input" placeholder=" 请输入银行负责人电话 15995408257"/></div>
        </div>
        <div class="form-row">
            <div class="form-label">邮箱</div>
            <div class="form-input">
                <input type="text" class="form-input" placeholder=" 请输入邮箱"/>
            </div>
        </div>
        <div class="form-row">
            <div class="form-label">地址</div>
            <div class="form-input">
                <input type="text" class="form-input" placeholder=" 请输入银行的详细地址"/>
            </div>
        </div>
        <div class="form-row">
            <div class="form-label">银行简介</div>
            <div class="form-input">
                <textarea></textarea>
            </div>
        </div>
        <div class="form-row">
            <div class="form-label"><i>*</i>银行logo</div>
            <div class="form-input">
                <img src=""/>
                <span> 图片说明：</span>
                <span> 1.上传图片支持jpg、jpeg、png格式； </span>
                <span> 2.图片尺寸200*200，大小不超过200k；</span>
                <a class="btn btn-gray">浏览</a>
            </div>
        </div>
        <div class="form-row">
            <a class="btn btn-primary">确认</a>
        </div>
    </div>
</template>
<script type="text/javascript">
    import model from '../../ajax/config/bank_model'
    export default{
        data(){
            this.model=model(this)
            return{
            }
        },
        methods:{
            getList(){
                this.model.getBankList().then((res)=>{
                    console.log(res);
                })
            }
        },
        ready(){
            this.getList();
        }
    }
</script>