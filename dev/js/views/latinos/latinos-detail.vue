 <template>
	 <div class="latinos-detail">
         <div class="detailInfo">
             <span class="activity-name">活动名称：<strong>{{showTitle.activityName}}</strong></span>
             <span class="infor-num">权益名称：<strong>{{showTitle.couponName}}</strong></span>
             <span class="infor-num">面额/折扣：
                <strong v-if="showTitle.couponType=='cash'">{{showTitle.couponFaceValue}}元</strong>
                <strong v-if="showTitle.couponType=='discount'">{{showTitle.couponFaceValue}}折</strong>
            </span>
             <span class="infor-num">活动时间：<strong>{{showTitle.startTime}}~{{showTitle.endTime}}</strong></span>
         </div>
         <div class="search-div">
             <input class="input" type="text" v-model="searchData.mobileNumber" placeholder="输入手机号码"/>
             <select class="select" v-model="searchData.usedFlag">
                 <option value="">请选择状态</option>
                 <option value="true">已使用</option>
                 <option value="false">未使用</option>
             </select>
             <input type="button" class="btn btn-primary searchBtn" @click="doSearch" value="搜 索">
         </div>
         <div class="flex-chart" v-show="latinos_echart==1">
            <div class="flex">
                <div class="echart-div" id="all-echart"></div>
                <div class="flex-title">{{latinosDetailTotal.circulation}}</div>
                <div class="border-right"></div>
            </div>
            <div class="flex">
                <div class="echart-div" id="use-echart"></div>
                <div class="flex-title">{{latinosDetailTotal.usedAmount}}</div>
                <div class="border-right"></div>
            </div>
            <div class="flex">
                <div class="echart-div" id="unuse-echart"></div>
                <div class="flex-title">{{latinosDetailTotal.unusedAmount}}</div>
                <div class="border-right"></div>
            </div>
            <div class="flex">
                <div class="echart-div" id="expired-echart"></div>
                <div class="flex-title">{{latinosDetailTotal.expiredAmount}}</div>
                <div class="2"></div>
            </div>
          </div>
          <div class="flex-chart text" v-show="latinos_echart==0">未查询到数据</div>
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
         <div class="showInfo">
            <div class="outPDF" @click="getExcel"><a>导出excel表格</a></div>
             <pagegroup class="pagegroup"
                 :page_current.sync="searchData.page"
                 :total="searchData.total"
                 :page_size.sync="searchData.maxResult"
                  v-on:current_change="getfirstResult"
                          v-on:size_change="getfirstResult"
                 ></pagegroup>
        </div>
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
                     sorts:'id|desc',
                 },
                 latinosDetailTotal:'',
                 latinosDetailList:[],
                 showTitle:{
                    couponName:'',
                    activityName:'',
                    startTime:'',
                    endTime:'',
                    couponFaceValue:'',
                    couponType:'',
                 },
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
            getList(){
               this.model.getLationsTotal(this.searchData).then((res)=>{
                   if (res.data.code==0 && !_.isEmpty(res.data.data)) {
                       this.$set('latinosDetailTotal',res.data.data);
                       this.latinosEchart('all-echart',this.latinosDetailTotal.circulation,'权益总数量',0,'#e76b5f','#e76b5f');
                       this.latinosEchart('use-echart',this.latinosDetailTotal.usedAmount,'权益使用量',this.latinosDetailTotal.circulation-this.latinosDetailTotal.usedAmount,'#e76b5f','#f0f0f0');
                       this.latinosEchart('unuse-echart',this.latinosDetailTotal.unusedAmount,'权益未使用量',this.latinosDetailTotal.circulation-this.latinosDetailTotal.unusedAmount,'#e76b5f','#f0f0f0');
                       this.latinosEchart('expired-echart',this.latinosDetailTotal.expiredAmount,'权益逾期量',this.latinosDetailTotal.circulation-this.latinosDetailTotal.expiredAmount,'#e76b5f','#f0f0f0');
                   }else{
                     this.latinos_echart=0;
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
                this.searchData.sorts = 'id%7Cdesc';
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
           this.showTitle.couponType=this.$route.params.couponType;
        },
     }
 </script>
