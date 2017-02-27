 <template>
	 <div class="latinos-detail">
         <div class="search-div">
             <span>手机号码</span>
             <input class="input" type="text" v-model="searchData.mobileNumber" placeholder="输入手机号码"/>
             <span>状态</span>
             <select class="select" v-model="searchData.usedFlag">
                 <option value="">请选择状态</option>
                 <option value="true">已使用</option>
                 <option value="false">未使用</option>
             </select>
             <a class="btn btn-primary searchBtn" @click="doSearch">搜索</a>
         </div>
         <!-- <div class="something">
             <span>活动名称：<strong>{{showTitle.couponName}}</strong></span>
             <span>权益名称：<strong>{{showTitle.activityName}}</strong></span>
             <span>面额/折扣：<strong>{{showTitle.couponFaceValue}}</strong></span>
             <span>活动时间：<strong>{{showTitle.startTime}}~{{showTitle.endTime}}</strong></span>
         </div> -->
         <div class="table">
             <table>
                 <tr>
                     <th>权益总数量</th>
                     <th>权益使用量</th>
                     <th>权益未使用量</th>
                     <th>权益逾期量</th>
                 </tr>
                 <tr>
                     <td>{{latinosDetailTotal.circulation}}</td><!-- 权益总数量 -->
                     <td>{{latinosDetailTotal.usedAmount}}</td><!-- 权益使用量 -->
                     <td>{{latinosDetailTotal.unusedAmount}}</td><!-- 权益未使用量 -->
                     <td>{{latinosDetailTotal.expiredAmount}}</td><!-- 权益逾期量 -->
                 </tr>
                 <tr v-show="!latinosDetailTotal">
                      <td colspan="4">未查询到数据</td> 
                  </tr>
             </table>
         </div>
         <div class="showInfo">
             <span class="activity-name">权益名称：<strong>{{showTitle.couponName}}</strong></span>
             <span class="infor-num">共<strong>{{searchData.total}}</strong>条数据</span>
             <span class="out-excel" @click="getExcel"><i class="icon-file-excel"></i>导出excel表格</span>
         </div>
         <div class="table">
             <table>
                 <tr>
                     <th>手机号码</th>
                     <th>使用时间</th>
                     <th>商户名称</th>
                     <th>状态</th>
                 </tr>
                 <tr v-for="n in latinosDetailList">
                    <td>{{n.mobileNumber}}</td><!-- 手机号码 -->
                    <td>{{n.useTime}}</td><!-- 使用时间 -->
                    <td>{{n.storeName}}</td><!-- 商户名称 -->
                    <td><!-- 状态 -->
                        <template v-if="n.usedFlag==0">未使用</template>
                        <template v-if="n.usedFlag==1">已使用</template>
                    </td>
                 </tr>
                 <tr v-show="!latinosDetailList.length">
                      <td colspan="7">未查询到数据</td>
                  </tr>
             </table>
         </div>
         <pagegroup class="pagegroup"
             :page_current.sync="searchData.page"
             :total="searchData.total"
             :page_size.sync="searchData.maxResult"
              v-on:current_change="getfirstResult"
                      v-on:size_change="getfirstResult"
             ></pagegroup>
     </div>
 </template>
 <script>
       import model from '../../ajax/latinos/latinos_detail_model'
     export default{
         data(){
               this.model=model(this);
             return{
                 searchData:{
                    page:1,
                     id:'',
                     usedFlag:'',
                     mobileNumber :'',
                     firstResult :0,//当前选中的分页值
                     total:0,//数据总条数
                     maxResult :10,//每页展示多少条数
                 },
                 latinosDetailTotal:'',
                 latinosDetailList:[],
                 showTitle:{
                    couponName:'',
                    activityName:'',
                    startTime:'',
                    endTime:'',
                    couponFaceValue:'',
                 }
             }
         },
         methods:{
            getList(){
               this.model.getLationsTotal(this.searchData).then((res)=>{
                   if (res.data.code==0 && !_.isEmpty(res.data.data)) {
                       this.$set('latinosDetailTotal',res.data.data);
                   }
               })
               this.model.getLatinosCumulative(this.searchData).then((res)=>{
                   if (res.data.code==0) {
                       this.$set('latinosDetailList',res.data.data);
                       this.searchData.total=res.data.total;
                   }
               })
            },
            getfirstResult(){
                let page=this.searchData.page;
                let firstResult=(page-1)*this.searchData.maxResult;
                this.searchData.page=page;
                this.searchData.firstResult=firstResult;
                this.getList();
            },
            doSearch(){
                this.searchData.page=1;
                this.searchData.firstResult=(this.searchData.page-1)*this.searchData.maxResult;
                this.getList();
            },
            getExcel(){
                console.log('success')
                let data=getFormData(this.searchData);
                data+='&methodName=couponDetailDataExportExcel&mid='+JSON.parse(sessionStorage.getItem('loginList')).token;
                window.open(origin+this.$API.latinosDetailExcel+data);
            },
        },
        ready(){
           this.getList();
        },
        created(){
           this.searchData.id=(this.$route.params.latinosID)>>0;
           this.showTitle.couponName=this.$route.params.couponName;
           this.showTitle.activityName=this.$route.params.activityName;
           this.showTitle.startTime=this.$route.params.startTime;
           this.showTitle.endTime=this.$route.params.endTime;
           this.showTitle.couponFaceValue=this.$route.params.couponFaceValue;
        },
     }
 </script>
