  <template>
	  <div class="latinos-search">
		  <div class="search-div">
              <span>权益名称</span>
              <input class="input" type="text" v-model="searchData.favorName" placeholder="输入权益名称"/>
              <span>结算方（银行）</span>
              <select class="select" v-model="bankUuidString" @change="getBankString">
                  <option value="">全部银行</option>
                  <option v-for="n in bankFullName" :value="n.uuid">{{n.shortName}}</option>
              </select>
              <span>开始时间</span>
              <ks-date-picker :value.sync="searchData.startTime"></ks-date-picker>
              <span>到</span>
              <ks-date-picker :value.sync="searchData.endTime"></ks-date-picker>
              <span>权益类型</span>
              <select class="select" v-model="searchData.favorTypes">
                  <option :value="['cash','discount']">请选择</option>
                  <option :value="['cash']">优惠金额券</option>
                  <option :value="['discount']">优惠折扣券</option>
              </select>
              <a class="btn btn-primary searchBtn" @click="doSearch">搜索</a>
          </div>
           <div class="table">
              <table>
                  <tr>
                      <th>权益总数量</th>
                      <th>权益使用量</th>
                      <th>权益未使用量</th>
                      <th>权益逾期量</th>
                  </tr>
                  <tr v-show="!!searchTotal">
                      <td>{{searchTotal.circulation}}</td>
                      <td>{{searchTotal.usedAmount}}</td>
                      <td>{{searchTotal.unusedAmount}}</td>
                      <td>{{searchTotal.expiredAmount}}</td>
                  </tr>
                  <tr v-show="!searchTotal">
                      <td colspan="12">未查询到数据</td>
                  </tr>
              </table>
          </div>
          <div class="showInfo">
              <span class="infor-num">共{{searchData.total}}条数据</span>
              <span class="out-excel"><i class="icon-file-excel"></i>导出excel表格</span>
          </div>
          <div class="table">
              <table>
                  <tr>
                      <th>活动名称</th>
                      <th>权益名称</th>
                      <!--<th>权益种类</th>-->
                      <th>结算方</th>
                      <th>权益类型</th>
                      <th>权益面值</th>
                      <th>状态</th>
                      <th>发行量</th>
                      <th>使用量</th>
                      <th>过期</th>
                      <th>开始时间</th>
                      <th>结束时间</th>
                      <th>操作</th>
                  </tr>
                  <tr v-for="n in searchList">
                      <td>{{n.activityName}}</td><!-- 活动名称-->
                      <td>{{n.couponName}}</td><!-- 权益名称-->
                      <!--<td>{{n.settlementParty }}</td>&lt;!&ndash; 权益种类&ndash;&gt;-->
                      <td>{{n.uuid | get_bank uuidsList}}</td>
                      <td>
                          <template v-if="n.couponType=='cash'">优惠金额券</template>
                          <template v-if="n.couponType=='discount'">优惠折扣券</template>
                      </td><!-- 权益类型-->
                      <td>{{n.couponFaceValue}}</td><!-- 权益面值-->
                      <td>
                          <template v-if="n.activityStatus=='draft_other'">草稿</template>
                          <template v-if="n.activityStatus=='wait_early_offline'">运行中</template>
                          <template v-if="n.activityStatus=='draft'">待审核</template>
                          <template v-if="n.activityStatus=='wait_check'">待审核</template>
                          <template v-if="n.activityStatus=='check_fail'">审核失败</template>
                          <template v-if="n.activityStatus=='online'">运行中</template>
                          <template v-if="n.activityStatus=='early_offline'">已结束</template>
                          <template v-if="n.activityStatus=='finish'">已结束</template>
                      </td><!-- 状态-->
                      <td>{{n.circulation }}</td><!-- 发行量-->
                      <td>{{n.usedAmount}} </td><!-- 使用量-->
                      <td>{{n.expiredAmount}}</td><!-- 过期-->
                      <td>{{n.startTime }}</td><!-- 开始时间-->
                      <td>{{n.endTime}}</td><!-- 结束时间-->
                      <td>
                        <a v-link="{name:'latinos-detail',params:{'latinosID':n.couponID}}">批量赠送</a>
                        <a v-link="{name:'latinos-detail',params:{'latinosID':n.couponID}}">查看明细</a>
                      </td><!--操作-->
                  </tr>
                  <tr v-show="!searchList.length">
                      <td colspan="12">未查询到数据</td>
                  </tr>
              </table>
          </div>
          <div class="pages" v-show="!!searchList">
              <pagegroup
                      :total="searchData.total"
                      :page_size.sync="searchData.maxResult"
                      :page_current.sync="searchData.page"
                      v-on:current_change="getfirstResult"
                      v-on:size_change="getfirstResult"
              ></pagegroup>
          </div>
	  </div>
  </template>
  <script>
       import model from '../../ajax/latinos/latinos_search_model'
      export default{
           data(){
               this.model=model(this);
               return{
                   searchList:{
                   },
                   bankUuidString:'',
                   searchData:{
                       page:1,
                       total:0,
                       favorName:'',
                       favorTypes:['cash','discount'],
                       firstResult:0,
                       maxResult:10,
                       startTime:JSON.parse(sessionStorage.getItem('loginList')).bankCreateTime,//开始时间
                       endTime:stringify(new Date())+' 23:59:59',//结束时间
                       uuids:_.split(sessionStorage.getItem('uuids'), ','),
                   },
                   searchTotal:'',
                   bankFullName:'',
                   uuidsList:JSON.parse(sessionStorage.getItem('bankNames'))
               }
           },
           methods:{
               getBankList(){
                   this.model.getBankList().then((res)=>{
                       if (res.data.code==0) {
                           this.$set('bankFullName',res.data.dataList);
                       }
                   })
               },
               getBankString(){
                   if (!this.bankUuidString) {
                       this.searchData.uuids=_.split(sessionStorage.getItem('uuids'), ',');
                   }else{
                       this.searchData.uuids=[this.bankUuidString];
                   }
               },
               doSearch(){
                   this.searchData.page=1;
                   this.searchData.firstResult=(this.searchData.page-1)*this.searchData.maxResult;
                   this.getList();
               },
               getfirstResult(){
                   let page=this.searchData.page;
                   let firstResult=(page-1)*this.searchData.maxResult;
                   this.searchData.page=page;
                   this.searchData.firstResult=firstResult;
                   this.getList();
               },
               getList(){
                   this.model.getLatinosCumulative(this.searchData).then((res)=>{
                       if (res.data.code==0) {
                           this.$set('searchList',res.data.data);
                           this.searchData.total=res.data.total;
                       }
                   })
                   this.model.getLationsTotal(this.searchData).then((res)=>{
                       if (res.data.code==0 && !_.isEmpty(res.data.data)) {
                           this.$set('searchTotal',res.data.data);
                       }
                   })
               },
           },
           created(){
               this.getBankList();
               this.getList();
           }
      } 
  </script>