  <template>
      <div class="latinos-search">
          <div class="flex-chart" v-show="latinos_echart==1">
            <div class="flex">
                <div class="echart-div" id="all-echart"></div>
                <div class="flex-title">{{searchTotal.circulation}}</div>
                <div class="border-right"></div>
            </div>
            <div class="flex">
                <div class="echart-div" id="use-echart"></div>
                <div class="flex-title">{{searchTotal.usedAmount}}</div>
                <div class="border-right"></div>
            </div>
            <div class="flex">
                <div class="echart-div" id="unuse-echart"></div>
                <div class="flex-title">{{searchTotal.unusedAmount}}</div>
                <div class="border-right"></div>
            </div>
            <div class="flex">
                <div class="echart-div" id="expired-echart"></div>
                <div class="flex-title">{{searchTotal.expiredAmount}}</div>
                <div class="2"></div>
            </div>
          </div>
          <div class="flex-chart text" v-show="latinos_echart==0">未查询到数据</div>
          <div class="table">
              <table>
                  <tr>
                      <th>活动名称</th>
                      <th>权益名称</th>
                      <th>结算方</th>
                      <th>权益类型</th>
                      <th>面值/折扣</th>
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
                      <td>{{n.uuid | get_bank uuidsList}}</td>
                      <td>
                          <template v-if="n.couponType=='cash'">优惠金额券</template>
                          <template v-if="n.couponType=='discount'">优惠折扣券</template>
                      </td><!-- 权益类型-->
                      <td>
                          <template v-if="n.couponType=='cash'">{{n.couponFaceValue}}元</template>
                          <template v-if="n.couponType=='discount'">{{n.couponFaceValue}}折</template>
                      </td><!-- 面值/折扣-->
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
                        <a v-show="n.activityStatus=='online'" v-link="{name:'latinos-batch',params:{'batchId':n.activityID,'batchUserId':n.couponID}}">批量赠送</a>
                        <a v-link="{name:'latinos-detail',params:{'latinosID':n.couponID,'couponName':n.couponName,'activityName':n.activityName,'startTime':n.startTime,'endTime':n.endTime,'couponFaceValue':n.couponFaceValue,'couponType':n.couponType}}">查看明细</a>
                      </td><!--操作-->
                  </tr>
                  <tr v-show="!searchList.length" style="text-align:center">
                      <td colspan="12">未查询到数据</td>
                  </tr>
              </table>
          </div>
          <div class="showInfo">
            <div class="outPDF" @click="getExcel"><a>导出excel表格</a></div>
            <pagegroup class="pagegroup"
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
                   activityList:[],
                   showList:false,
                   bankUuidString:'',
                   searchData:{
                       page:1,
                       total:0,
                       favorName:'',
                       favorTypesStr:'cash,discount',
                       firstResult:0,
                       maxResult:10,
                       sorts:'id|desc',
                       startTime:JSON.parse(sessionStorage.getItem('loginList')).bankCreateTime,//开始时间
                       endTime:stringify(new Date())+' 23:59:59',//结束时间
                       uuidsStr:sessionStorage.getItem('uuids'),
                   },
                   searchTotal:'',
                   bankFullName:'',
                   uuidsList:JSON.parse(sessionStorage.getItem('bankNames')),
                   latinos_echart:1,
               }
           },
           methods:{
                latinosEchart(divID,data1,data_name,baseData,color_1,color_2){
                    var myChart=echarts.init(document.getElementById(divID));
                    var option = {
                        series: [
                            {
                                type:'pie',
                                radius: ['60%', '80%'],
                                avoidLabelOverlap: false,
                                hoverAnimation:false,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'center',
                                    }
                                },
                                labelLine: {normal: {show: false}},
                                data:[
                                    {
                                        value:data1, 
                                        name:data_name,
                                        label:{
                                            normal: {
                                                show: true,
                                                textStyle:{
                                                    color:'#444',
                                                    fontSize: '12',
                                                    fontWeight: 'bold'}
                                            }
                                        },
                                        itemStyle:{normal:{color:color_1}   
                                        },
                                    },
                                    {value:baseData,itemStyle:{normal:{color:color_2}},
                                    },
                                ],
                            }
                        ]
                    };
                    myChart.setOption(option);
                },
               getBankList(){
                   this.model.getBankList().then((res)=>{
                       if (res.data.code==0) {
                           this.$set('bankFullName',res.data.dataList);
                       }
                   })
               },
               getBankString(){
                   if (!this.bankUuidString) {
                       this.searchData.uuidsStr=sessionStorage.getItem('uuids');
                   }else{
                       this.searchData.uuidsStr=this.bankUuidString;
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
                           this.latinosEchart('all-echart',this.searchTotal.circulation,'权益总数量',0,'#e76b5f','#e76b5f');
                           this.latinosEchart('use-echart',this.searchTotal.usedAmount,'权益使用量',this.searchTotal.circulation-this.searchTotal.usedAmount,'#15a4fa','#f0f0f0');
                           this.latinosEchart('unuse-echart',this.searchTotal.unusedAmount,'权益未使用量',this.searchTotal.circulation-this.searchTotal.unusedAmount,'#62cca4','#f0f0f0');
                           this.latinosEchart('expired-echart',this.searchTotal.expiredAmount,'权益逾期量',this.searchTotal.circulation-this.searchTotal.expiredAmount,'#1a1a1a','#e76b5f');
                       }else{
                         this.latinos_echart=0;
                       }
                   })
               },
               getLatinosList(){
                let data={
                  favorName:(this.searchData.favorName).replace(/(^\s+)|(\s+$)/g, ""),
                  maxResult:this.searchData.maxResult,
                  uuidsStr:this.searchData.uuidsStr,
                  favorTypesStr:'cash,discount',
                  sorts:'id|desc'
                }
                    this.model.getLatinosCumulative(data).then((res)=>{
                         if (res.data.code==0) {
                          this.$set('activityList',res.data.data);
                          this.showList=true;
                         }

                  })
               },
               getId({couponName}){
                  this.showList=false;
                  this.searchData.favorName=couponName;
               },
               resetName(){
                this.showList=false;
               },
               getExcel(){
               this.searchData.sorts = 'id%7Cdesc';
                let data=getFormData(this.searchData);
                data+='&methodName=couponDataExportExcel&mid='+JSON.parse(sessionStorage.getItem('loginList')).token;
                window.open(origin+this.$API.latinosSearchExcel+data);
               this.searchData.sorts = 'id|desc';
              },
           },
           ready(){
            document.addEventListener('click', (e) => {
                if (!e.target.classList.contains('showLi')) {
                    this.resetName();
                }
            }, false);
           },
           beforeDestroy() {
            document.removeEventListener('click', this.resetName, false);
           },
           created(){
               if(this.$route.params.atlId!=':atlId'){
                  this.searchData['activityId']=this.$route.params.atlId;
               }
               this.getBankList();
               this.getList();
           },
      } 
  </script>