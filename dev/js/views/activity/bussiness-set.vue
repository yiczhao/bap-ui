<template>
<activity-main :propclass="'bussiness-set'" :showstep.sync="showstep">
    <div class="rule-row rule-title">
        <a class="btn btn-primary" @click="addBtn">添加商户</a>
        <div class="search-div">
            <input class="input" type="text" v-model="storeName" placeholder="输入商户名称/商户ID筛选"/>
        </div>
    </div>
    <div class="table-row">
        <table class="table">
            <tr>
                <th>商户ID</th>
                <th>商户名称</th>
                <th>所属行业</th>
                <th>操作</th>
            </tr>
            <tr v-show="!!searchList" v-for="n in searchList | filterBy storeName in 'id' 'name'">
                <td>{{n.id}}</td>
                <td>{{n.name}}</td>
                <td>{{n.industry}}</td>
                <td><a @click="removeStore(n.id)">移除</a></td>
            </tr>
            <tr v-show="!searchList.length">
                <td colspan="4">请添加商户</td>
            </tr>
        </table>
        <!--<div v-show="!!dataList">-->
            <!--<pagegroup-->
                    <!--:total="searchData.total"-->
                    <!--:page_size.sync="searchData.maxResult"-->
                    <!--:page_current.sync="searchData.page"-->
                    <!--v-on:current_change="getList"-->
                    <!--v-on:size_change="getList"-->
            <!--&gt;</pagegroup>-->
        <!--</div>-->
    </div>
    <div class="rule-row tc">
        <a class="btn btn-primary" @click="backBasic">上一步</a>
        <a class="btn btn-gray" @click="submitAdd(false)">保存草稿</a>
        <a class="btn btn-primary" @click="submitAdd(true)">保存并提交审核</a>
    </div>
    <content-dialog
            :show.sync="addshow" :is-button="false" :type.sync="'infos'"
            :title.sync="'添加商户'"
    >
        <div class="add-table">
            <div class="add-search">
                <span>商户名称</span>
                <input class="input" type="text" v-model="addsearchData.name"/>
                <span>商户区域</span>
                <select class="select" v-model="addsearchData.province" @change="getCity">
                    <option value="">全部省份</option>
                    <option v-for="n in provinceList" :value="n.id">{{n.name}}</option>
                </select>
                <select class="select" v-model="addsearchData.city">
                    <option value="">全部城市</option>
                    <option v-for="n in cityList" :value="n.id">{{n.name}}</option>
                </select>
                <a class="btn btn-primary" @click="getaddList">搜索</a>
            </div>
            <div class="addtable-row">
                <table class="table">
                    <tr>
                        <th>
                            <div v-show="!!addList">
                                <div class="KSNRCheckbox KSNRCheckbox__UID--all">
                                    <input id="all" type="checkbox" @change="chooseAll" v-model="checkAll"/>
                                    <label class="KSNRCheckbox__skin" for="all"></label>
                                </div>
                                <!--<ks-checkbox @change="chooseAll" :checked.sync="checkAll"></ks-checkbox>-->
                            </div>
                        </th>
                        <th>商户ID</th>
                        <th>商户名称</th>
                        <th>地区</th>
                    </tr>
                    <tr v-show="!!addList" v-for="n in addList">
                        <td><ks-checkbox :checked.sync="n.ischeck" @change="checkeds(n)"></ks-checkbox></td>
                        <td>{{n.id}}</td>
                        <td>{{n.name}}</td>
                        <td>{{n.address}}</td>
                    </tr>
                    <tr v-show="!addList">
                        <td colspan="4">{{waring}}</td>
                    </tr>
                </table>
            </div>
            <div v-show="!!addList">
                <pagegroup
                        :total="addsearchData.total"
                        :page_size.sync="addsearchData.maxResult"
                        :page_current.sync="addsearchData.page"
                        v-on:current_change="getaddList"
                        v-on:size_change="getaddList"
                ></pagegroup>
            </div>
            <div class="tc">
                <a class="btn btn-primary" @click="addTrue">添加选中商户</a>
                <a class="btn btn-gray" @click="addshow=false">取消</a>
            </div>
        </div>
    </content-dialog>
</activity-main>
</template>
<style type="text/css" scoped>
    #all{
        display: none;
    }
    #all:checked + .KSNRCheckbox__skin:before {
        background: #00A5E0!important;
        opacity: 1;
    }
    .KSNRCheckbox__skin:before {
        content: '';
        display: inline-block;
        height: 10px;
        width: 10px;
        border-radius: 3px;
        opacity: 0;
        -webkit-transition: opacity .3s;
        transition: opacity .3s;
    }
</style>
<script type="text/javascript">
    import activityMain from './activity-main.vue'
    import model from '../../ajax/activity/basic_model'
    export default{
        data(){
            this.model=model(this)
            return{
                waring:'请搜索商户',
                addshow:false,
                showstep:2,
                storeName: "",
                searchData:{
                    total:0,
                    activityId:0,
                    page: 1,
                    maxResult: 10,
                    storeName: ""
                },
                addsearchData:{
                    page: 1,
                    maxResult: 10,
                    total: 0,
                    name: "",
                    province: "",
                    city: "",
                    shopid: 0
                },
                dataList:[],
                searchList:[],
                addList:[],
                provinceList:[],
                cityList:[],
                addIDs:[],
            }
        },
        computed:{
            checkAll(){
                let clength=0;
                _.map(this.addList,(value)=>{
                    (!value.ischeck)?clength++:null;
                })
                return !clength
            }
        },
        methods:{
            chooseAll(){
                this.addIDs=[];
                let cloneData=_.cloneDeep(this.addList);
                if(this.checkAll){
                    _.map(cloneData,(value)=>{
                        value.ischeck=false;
                    })
                }else{
                    _.map(cloneData,(value)=>{
                        this.addIDs.push(value);
                        value.ischeck=true;
                    })
                }
                this.addList=cloneData;
            },
            checkeds(_list){
                if(!!_list.ischeck){
                    this.addIDs.push(_list);
                }else{
                    _.remove(this.addIDs, function(n) {
                        return n.storeId==_list.id;
                    })
                }
            },
            getProvince(){
                this.$common_model.getProvince().then((res)=>{
                    if(res.data.code===0){
                        this.$set('provinceList',res.data.data)
                    }
                });
            },
            initCity(){
                if(!this.addsearchData.province)return;
                let data={
                    province:this.addsearchData.province
                }
                this.$common_model.getCity(data).then((res)=>{
                    if(res.data.code===0){
                        this.$set('cityList',res.data.data);
                    }
                })
            },
            getCity(){
                this.addsearchData.city='';
                if(!this.addsearchData.province)return;
                let data={
                    province:this.addsearchData.province
                }
                this.$common_model.getCity(data).then((res)=>{
                    if(res.data.code===0){
                        this.$set('cityList',res.data.data);
                    }
                })
            },
            backBasic(){
                let ruleId='';
                !!sessionStorage.getItem('activityId')?ruleId=sessionStorage.getItem('activityId') << 0:ruleId=this.$route.params.bactivityId;
                this.$router.go({'name':sessionStorage.getItem('rulename'),params:{'ruleId':ruleId}});
            },
            /**
             * @description 错误处理
             * @summary 只是简单的提示用处错误信息
             */
            errHandle (err) {
                dialog('info', err)
            },
            getList(){
                this.model.getBussinessList(this.searchData).then((res)=>{
                    if(res.data.code===0){
                        let data=[];
                        _.map(res.data.data,(val)=>{
                            data.push({
                                id:val.storeId,
                                name:val.storeName,
                                industry:val.industry,
                            })
                        })
                        this.$set('searchList',data);
                        this.dataList=data;
                        this.searchData.total=res.data.total;
                    }
                })
            },
            getaddList(){
                this.waring='未查询到商户数据';
                this.model.getAddBussinessList(this.addsearchData).then((res)=>{
                    if(res.data.code===0){
                        this.$set('addList',res.data.data);
                        this.addsearchData.total=res.data.total;
                    }
                })
            },
            addBtn(){
                this.addsearchData={
                    page: 1,
                    maxResult: 10,
                    total: 0,
                    province: "",
                    city: "",
                    name: "",
                    shopid: 0
                }
                this.addIDs=[];
                this.addData=[];
                this.waring='请搜索商户';
                this.model.getAddBussinessList(this.addsearchData).then((res)=>{
                    if(res.data.code===0){
                        this.$set('addList',res.data.data);
                        this.addsearchData.total=res.data.total;
                        this.addshow=true;
                    }
                })
            },
            addTrue(){
                let data=_.cloneDeep(this.addIDs);
                let oldData=_.cloneDeep(this.dataList)
                _.map(data,(val)=>{
                    _.remove(oldData,(value)=>{
                        return val.id==value.id
                    })
                })
                this.$set('searchList',_.concat(data,oldData));
                this.dataList=this.searchList;
                this.addshow=false;
            },
            submitAdd(bool){
                let data={
                    step:this.showstep+1,
                    bankMarketingStores:[]
                };
                _.map(this.dataList,(val)=>{
                    data.bankMarketingStores.push({
                        storeId:val.id,
                        storeName:val.name
                    })
                })
                !!sessionStorage.getItem('activityId')?data.activityId=sessionStorage.getItem('activityId') << 0:data.activityId='';
                this.model.saveStore(data).then((res)=>{
                    if(res.data.code===0){
                        this.getList();
                        if(bool){
                            this.model.toCheck(data.activityId).then((res)=>{
                                if(res.data.code===0){
                                    dialog('successTime','保存成功！');
                                    this.$router.go({'name':'activity-manage'});
                                }
                            })
                        }else{
                            dialog('success','保存草稿成功！');
                        }
                    }
                })
            },
            removeStore(id){
                let cloneData=_.cloneDeep(this.dataList);
                _.remove(cloneData,(value)=>{
                    return value.id==id;
                })
                let data={
                    step:this.showstep+1,
                    bankMarketingStores:[]
                };
                _.map(cloneData,(val)=>{
                    data.bankMarketingStores.push({
                        storeId:val.id,
                        storeName:val.name
                    })
                })
                !!sessionStorage.getItem('activityId')?data.activityId=sessionStorage.getItem('activityId') << 0:data.activityId='';
                this.model.saveStore(data).then((res)=>{
                    if(res.data.code===0){
                        this.getList();
                        dialog('success','已移除！');
                    }
                })
            },
        },
        created(){
            this.getProvince();
            let activityId = '';
            this.$route.params.bactivityId==':bactivityId'?activityId=sessionStorage.getItem('activityId') << 0:activityId = this.$route.params.bactivityId << 0;
            if (activityId) {
                // 获取活动信息
                this.searchData.activityId=activityId;
                this.getList();
                this.initCity();
            }
        },
        components: { activityMain }
    }
</script>