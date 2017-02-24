 <template>
	 <div class="latinos-detail">
         <div class="search-div">
             <span>手机号码</span>
             <input class="input" type="text" v-model="searchData.mobileNumber" placeholder="输入手机号码"/>
             <span>状态</span>
             <select class="select" v-model="searchData.usedFlag">
                 <option value="">请选择状态</option>
                 <option value="true">运行中</option>
                 <option value="false">已结束</option>
             </select>
             <a class="btn btn-primary searchBtn" @click="getList">搜索</a>
         </div>
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
                 <tr v-show="!latinosDetailTotal.length">
                      <td colspan="4">未查询到数据</td> 
                  </tr>
             </table>
         </div>
         <div class="showInfo">
             <span class="activity-name">权益名称</span>
             <span class="infor-num">共{{searchData.total}}条数据</span>
             <span class="out-excel"><i class="icon-file-excel"></i>导出excel表格</span>
         </div>
         <div class="table">
             <table>
                 <tr>
                     <th>手机号码</th>
                     <th>权益名称</th>
                     <th>面额/折扣</th>
                     <th>赠送时间</th>
                     <th>权益有效期</th>
                     <th>商户名称</th>
                     <th>状态</th>
                 </tr>
                 <tr v-for="n in latinosDetailList">
                    <td>{{n.mobileNumber}}</td><!-- 手机号码 -->
                    <td>{{n.couponName}}</td><!-- 权益名称 -->
                    <td>{{n.couponFaceValue}}</td><!-- 面额/折扣 -->
                    <td>{{n.giveTime}}</td><!-- 赠送时间 -->
                    <td>{{n.startTime}}-{{n.endTime}}</td><!-- 权益有效期 -->
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
             :page_current.sync="searchData.firstResult"
             :total="searchData.total"
             :page_size.sync="searchData.maxResult"
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
                     id:'',
                     usedFlag:'',
                     mobileNumber :'',
                     firstResult :0,//当前选中的分页值
                     total:0,//数据总条数
                     maxResult :10,//每页展示多少条数
                 },
                 latinosDetailTotal:{},
                 latinosDetailList:{},
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
         },
         ready(){
            this.getList();
            console.log(this.$route.params.latinosID)
         },
         created(){
            this.searchData.id=(this.$route.params.latinosID)>>0;
         },
     }
 </script>
