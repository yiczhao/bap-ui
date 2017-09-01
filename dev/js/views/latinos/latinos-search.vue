  <template>
      <div class="latinos-search">
		    <div class="search-div search-table">
          <div class="conditions-list">
            <span class="show-position">
              <input class="input " type="text" v-model="searchData.favorConfigName" @keyup.down="doSearch" placeholder="输入权益名称"/>
            </span>
              <select class="select" v-model="searchData.favorTypesStr">
                  <option value="">请选择权益类型</option>
                  <option value="cash">优惠金额券</option>
                  <option value="discount">优惠折扣券</option>
                  <option value="zero">零元券</option>
              </select>
              <ks-date-range-picker placeholder="开始时间,结束时间"
                                    :range.sync="daterange"
                                    :readonly="false"
                                    v-on:change="date_multi_picker_change"></ks-date-range-picker>
          </div>
          <div class="do-search">
              <input type="button" class="btn btn-primary searchBtn" @click="doSearch" value="搜 索">
          </div>
          </div>
          <div class="flex-chart" v-show="latinos_echart==1">
            <div class="flex">
                <div class="echart-div" id="all-echart"></div>
                <div class="flex-title">{{searchTotal.circulation}}</div>
                <div class="border-right"></div>
            </div>
              <div class="flex">
                  <div class="echart-div" id="get-echart"></div>
                  <div class="flex-title">{{searchTotal.usedAmount+searchTotal.unusedAmount+searchTotal.expiredAmount}}</div>
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
          <div class="table overflow">
              <table>
                  <tr>
                      <th>活动名称</th>
                      <th>权益名称</th>
                      <th>权益类型</th>
                      <th>状态</th>
                      <th>发行量</th>
                      <th>使用量</th>
                      <th>过期</th>
                      <th>开始时间</th>
                      <th>结束时间</th>
                      <th>操作</th>
                  </tr>
                  <tr v-for="n in dataList">
                      <td>{{n.activityName}}</td><!-- 活动名称-->
                      <td>{{n.favorConfigName}}</td><!-- 权益名称-->
                      <td>
                          <template v-if="n.couponType=='cash'">优惠金额券</template>
                          <template v-if="n.couponType=='discount'">优惠折扣券</template>
                          <template v-if="n.couponType=='zero'">零元券</template>
                      </td><!-- 权益类型-->
                      <td>
                          <template v-if="n.status!=='OFF'&&(n.activityStatus==='early_offline'||n.activityStatus==='finish')">已结束</template>
                          <template v-if="n.status==='OFF'">已结束</template>
                          <template v-if="n.status=='ON'&&n.activityStatus!=='finish'&&n.activityStatus!=='early_offline'">运行中</template>
                      </td><!-- 状态-->
                      <td>{{n.circulation }}</td><!-- 发行量-->
                      <td>{{n.usedAmount}} </td><!-- 使用量-->
                      <td>{{n.expiredAmount}}</td><!-- 过期-->
                      <td>{{n.startTime }}</td><!-- 开始时间-->
                      <td>{{n.endTime}}</td><!-- 结束时间-->
                      <td>
                          <a v-link="{name:'latinos-detail',params:{'latinosID':n.couponID,'couponName':n.favorConfigName,'activityName':n.activityName,'startTime':n.startTime,'endTime':n.endTime,'couponFaceValue':n.couponFaceValue,'couponType':n.couponType}}">查看明细</a>
                      </td><!--操作-->
                  </tr>
                  <tr v-show="!dataList.length">
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
  <style type="text/css" scoped>
    .latinos-search .search-div .conditions-list .KsDaterMulti{
      left: -197px !important;
    }
  </style>
  <script>
       import model from '../../ajax/latinos/latinos_search_model'
      export default{
          watch:{
              'daterange'(){
                  if(this.daterange.length>1){
                      this.searchData.endTime=this.daterange[1]
                  }else{
                      this.searchData.startTime=this.daterange[0]
                      this.searchData.endTime=''
                  }
              }
          },
           data(){
               this.model=model(this);
               return{
                   dataList:{
                   },
                   activityList:[],
                   showList:false,
                   organizers:'',
                   searchData:{
                       page:1,
                       total:0,
                       favorConfigName:'',
                       favorTypesStr:'',
                       firstResult:0,
                       maxResult:10,
                       sorts:'id|desc',
                       startTime:'2017-01-01',//开始时间
                       endTime:'2017-12-31',//结束时间
                       organizers:sessionStorage.getItem('loginList').bankOperationCode,
                   },
                   searchTotal:'',
                   latinos_echart:1,
                   replaceName:'',
                   liIndex:0,
                   daterange:['2017-01-01','2017-12-31']
               }
           },
           methods:{
               date_multi_picker_change(val){
                   this.searchData.startTime=val[0];
                   this.searchData.endTime=val[1];
               },
                latinosEchart(divID,data1,data_name,color_1,baseData,color_2){
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
                                ],
                            }
                        ]
                    };
                    if(!!baseData){
                      option.series[0].data.push({value:baseData,itemStyle:{normal:{color:color_2}}});
                    }
                    myChart.setOption(option);
                },
               getBankString(){
                   if (!this.organizers) {
                       this.searchData.organizers=sessionStorage.getItem('loginList').bankOperationCode;
                   }else{
                       this.searchData.organizers=this.organizers;
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
                   this.model.getLatinosCumulative(this.searchData).then((res)=>{
                       if (res.data.code==0) {
                           this.$set('dataList',res.data.data);
                           this.searchData.total=res.data.total;
                       }
                   })
               },
               getList(){
                   this.model.getLatinosCumulative(this.searchData).then((res)=>{
                       if (res.data.code==0) {
                           this.$set('dataList',res.data.data);
                           this.searchData.total=res.data.total;
                       }
                   })
                   this.model.getLationsTotal(this.searchData).then((res)=>{
                       if (res.data.code==0 && !_.isEmpty(res.data.data)) {
                           this.$set('searchTotal',res.data.data);
                           this.latinosEchart('all-echart',this.searchTotal.circulation,'权益总数量','#10B283');
                           this.latinosEchart('use-echart',this.searchTotal.usedAmount,'权益使用量','#FF573A',this.searchTotal.circulation-this.searchTotal.usedAmount,'#D1D0CE');
                           this.latinosEchart('get-echart',res.data.data.usedAmount+res.data.data.unusedAmount+res.data.data.expiredAmount,'权益领取量','#62cca4',this.latinosDetailTotal.circulation-this.latinosDetailTotal.usedAmount-this.latinosDetailTotal.expiredAmoun-this.latinosDetailTotal.unusedAmount,'#10B283');
                           this.latinosEchart('unuse-echart',this.searchTotal.unusedAmount,'权益未使用量','#62cca4',this.searchTotal.circulation-this.searchTotal.unusedAmount,'#D1D0CE');
                           this.latinosEchart('expired-echart',this.searchTotal.expiredAmount,'权益逾期量','#007EFF',this.searchTotal.circulation-this.searchTotal.expiredAmount,'#D1D0CE');
                       }else{
                         this.latinos_echart=0;
                       }
                   })
               },
               getExcel(){
                   this.searchData.sorts = 'id%7Cdesc';
                   let data=getFormData(this.searchData);
                   data+='&methodName=couponDataExportExcel&mid='+JSON.parse(sessionStorage.getItem('loginList')).token;
                   window.open(origin+this.$API.latinosSearchExcel+data);
                   this.searchData.sorts = 'id|desc';
               },
               latinosOff(id){
                  this.model.getOnOff(id,'OFF').then((res)=>{
                    if (res.data.code==0) {
                      this.getList();
                    }
                  })
               },
           },
           ready(){
           },
           created(){
               this.getList();
           },
      }
  </script>