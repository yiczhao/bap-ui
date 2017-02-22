 <template>
	 <div class="latinos-detail">
         <div class="search-div">
             <span>手机号码</span>
             <input class="input" type="text" placeholder="输入手机号码"/>
             <span>活动状态</span>
             <select class="select" v-model="searchData.activityStatus">
                 <option value="">请选择活动状态</option>
                 <option value="1">运行中</option>
                 <option value="0">已结束</option>
             </select>
             <a class="btn btn-primary searchBtn">搜索</a>
         </div>
         <div class="table">
             <table>
                 <tr>
                     <th>权益总数量</th>
                     <th>权益领取量</th>
                     <th>权益使用量</th>
                     <th>权益未使用量</th>
                     <th>权益逾期量</th>
                 </tr>
                 <tr>
                     <td>权益总数量</td>
                     <td>权益领取量</td>
                     <td>权益使用量</td>
                     <td>权益未使用量</td>
                     <td>权益逾期量</td>
                 </tr>
             </table>
         </div>
         <div class="showInfo">
             <span class="activity-name">权益名称</span>
             <span class="infor-num">共1条数据</span>
             <span class="out-excel"><i class="icon-file-excel"></i>导出excel表格</span>
         </div>
         <div class="table">
             <table>
                 <tr>
                     <th>手机号码</th>
                     <th>权益名称</th>
                     <th>面额/折扣</th>
                     <th>权益来源</th>
                     <th>赠送时间</th>
                     <th>权益有效期</th>
                     <th>商户名称</th>
                     <th>状态</th>
                 </tr>
                 <tr v-for="n in latinosDetailTotal">
                    <td>{{n.phone}}</td>
                    <td>{{n.name}}</td>
                    <td>{{n.discount}}</td>
                    <td>{{n.from}}</td>
                    <td>{{n.time}}</td>
                    <td>{{n.validity}}</td>
                    <td>{{n.merchant}}</td>
                    <td>{{n.satatue}}</td>
                 </tr>
             </table>
         </div>
         <pagegroup class="pagegroup"
             :page_current.sync="searchData.pageIndex"
             :total="searchData.total"
             :page_size.sync="searchData.pageSize"
             ></pagegroup>
     </div>
 </template>
 <script>
     export default{
         data(){
             return{
                 searchData:{
                     activityStatus:1,
                     pageIndex:1,//当前选中的分页值
                     total:1,//数据总条数
                     pageSize:10,//每页展示多少条数
                 },
                 latinosDetailTotal:{
                    'phone':'1',
                    'name':'1',
                    'discount':'1',
                    'from':'1',
                    'time':'1',
                    'validity':'1',
                    'merchant':'1',
                    'satatue':'1',
                 }
             }
         },
         methods:{
            
         },
         ready(){

         }
     }
 </script>
