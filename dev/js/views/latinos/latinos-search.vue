  <template>
      <div class="latinos-search">
		    <div class="search-div search-table">
          <div class="conditions-list">
            <span class="show-position">
              <input class="input " type="text" v-model="searchData.favorName" placeholder="输入权益名称"
                     @keyup="getActivity($event)" @keyup.enter="searchList"
                     @keyup.up="changeLiIndex('up')" @keyup.down="changeLiIndex('down')"
              />
              <div class="showList showLi" v-show="showList">
                  <ul class="showLi">
                      <li class="showLi" v-for="n in activityList" :class="{'checked':liIndex==$index}" @click="getId(n)">{{n.couponName}}</li>
                      <li class="showLi" v-if="!activityList.length">未查询到{{searchData.favorName}}活动</li>
                  </ul>
              </div>
            </span>
              <select class="select" v-model="bankUuidString" @change="getBankString">
                  <option value="">请选择结算方（银行）</option>
                  <option v-for="n in bankFullName" :value="n.uuid">{{n.shortName}}</option>
              </select>
              <select class="select" v-model="searchData.favorTypesStr">
                  <option value="cash,discount">请选择权益类型</option>
                  <option value="cash">优惠金额券</option>
                  <option value="discount">优惠折扣券</option>
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
                  <tr v-for="n in dataList">
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
                          <template v-if="n.status==='OFF'">已结束</template>
                          <template v-if="n.status=='ON'">运行中</template>
                      </td><!-- 状态-->
                      <td>{{n.circulation }}</td><!-- 发行量-->
                      <td>{{n.usedAmount}} </td><!-- 使用量-->
                      <td>{{n.expiredAmount}}</td><!-- 过期-->
                      <td>{{n.startTime }}</td><!-- 开始时间-->
                      <td>{{n.endTime}}</td><!-- 结束时间-->
                      <td>
                          <a v-if="n.status==='OFF'&&n.activityStatus==='online'" v-link="{name:'set-receive',params:{'setReceiveId':n.id,'setReceiveActivityId':n.activityID}}">权益设置</a>
                          <a v-if="n.status==='ON'&&n.activityStatus==='online'" @click="latinosOff(n.id)">权益下线</a>
                          <span v-if="n.activityStatus!=='online'" class="color999">权益设置</span>
                          <a v-if="n.activityStatus=='online'" v-link="{name:'latinos-user',params:{'latinosUserId':n.couponID}}">批量赠送</a>
                          <span v-else class="color999">批量赠送</span>
                          <a v-link="{name:'latinos-detail',params:{'latinosID':n.couponID,'couponName':n.couponName,'activityName':n.activityName,'startTime':n.startTime,'endTime':n.endTime,'couponFaceValue':n.couponFaceValue,'couponType':n.couponType}}">查看明细</a>
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
                       endTime:stringify(new Date()),//结束时间
                       uuidsStr:sessionStorage.getItem('uuids'),
                   },
                   searchTotal:'',
                   bankFullName:'',
                   uuidsList:JSON.parse(sessionStorage.getItem('bankNames')),
                   latinos_echart:1,
                   replaceName:'',
                   liIndex:0,
                   daterange:[JSON.parse(sessionStorage.getItem('loginList')).bankCreateTime,stringify(new Date())]
               }
           },
           methods:{
               date_multi_picker_change(val){
                   this.searchData.startTime=val[0];
                   this.searchData.endTime=val[1];
               },
               searchList(){
                   if(this.showList){
                       this.searchData.favorName=this.activityList[this.liIndex].couponName;
                       this.searchData.activityID=this.activityList[this.liIndex].couponID;
                   }
                   this.showList=false;
                   this.getList();
               },
               getActivity: _.debounce(function(e){
                   if(e.keyCode == 38 || e.keyCode == 40|| e.keyCode == 13){  //向上向下
                       console.log(e.keyCode);
                       return ;
                   }
                   let vm=this;
                   vm.replaceName=(vm.searchData.favorName).replace(/(^\s+)|(\s+$)/g, "");
                   let data={
                       favorName:vm.replaceName,
                       maxResult:10,
                       uuidsStr:vm.searchData.uuidsStr,
                       favorTypesStr:'cash,discount',
                       sorts:'id|desc'
                   }
                   this.model.getLatinosCumulative(data).then((res)=>{
                       if (res.data.code==0&&res.data.data!=vm.searchData.favorName) {
                           this.liIndex=0;
                           vm.$set('activityList',res.data.data);
                           vm.showList=true;
                       }

                   })
               },300),
               changeLiIndex(type){
                   if(!this.activityList.length)return;
                   switch (type){
                       case 'up':
                           this.liIndex==0?this.liIndex=this.activityList.length-1:this.liIndex--;
                           break;
                       case 'down':
                           this.liIndex==this.activityList.length-1?this.liIndex=0:this.liIndex++;
                           break;
                       default:
                           break;
                   }
               },
               getId({couponID,couponName}){
                   this.showList=false;
                   this.searchData.favorName=couponName;
                   this.searchData.activityID=couponID;
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
                   this.searchList();
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
                           this.$set('dataList',res.data.data);
                           this.searchData.total=res.data.total;
                       }
                   })
                   this.model.getLationsTotal(this.searchData).then((res)=>{
                       if (res.data.code==0 && !_.isEmpty(res.data.data)) {
                           this.$set('searchTotal',res.data.data);
                           this.latinosEchart('all-echart',this.searchTotal.circulation,'权益总数量','#10B283');
                           this.latinosEchart('use-echart',this.searchTotal.usedAmount,'权益使用量','#FF573A',this.searchTotal.circulation-this.searchTotal.usedAmount,'#D1D0CE');
                           this.latinosEchart('unuse-echart',this.searchTotal.unusedAmount,'权益未使用量','#62cca4',this.searchTotal.circulation-this.searchTotal.unusedAmount,'#D1D0CE');
                           this.latinosEchart('expired-echart',this.searchTotal.expiredAmount,'权益逾期量','#007EFF',this.searchTotal.circulation-this.searchTotal.expiredAmount,'#D1D0CE');
                       }else{
                         this.latinos_echart=0;
                       }
                   })
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
               latinosOff(id){
                  this.model.getOnOff(id,'OFF').then((res)=>{
                    if (res.data.code==0) {
                      this.getList();
                    }
                  })
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
               this.getBankList();
               this.getList();
           },
      }
  </script>