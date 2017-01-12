  <template>
	  <div class="latinos-search">
		  <div class="search-div">
              <span>权益名称</span>
              <input class="input" type="text" v-model="" placeholder="输入权益名称"/>
              <div class="showList" v-show="showList">
                  <ul>
                      <li v-for="n in activityList | filterBy .activityName in 'name'" @click="getId(n)">{{n.name}}</li>
                      <li v-if="!activityList.length">未查询到{{searchDate.activityName}}活动</li>
                  </ul>
              </div>
              <span>结算方（银行）</span>
              <select class="select" v-model="">
                  <option value="">11</option>
                  <option value="">22</option>
                  <option value="">33</option>
              </select>
              <span>开始时间</span>
              <ks-date-picker value="2016-10-12"></ks-date-picker>
              <span>到</span>
              <ks-date-picker value="2016-10-12"></ks-date-picker>
              <span>权益类型</span>
              <select class="select" v-model="">
                  <option value="">11</option>
                  <option value="">22</option>
                  <option value="">33</option>
              </select>
              <span>权益种类</span>
              <select class="select" v-model="">
                  <option value="">11</option>
                  <option value="">22</option>
                  <option value="">33</option>
              </select>
              <a class="btn btn-primary searchBtn" @click="latinosSearch">搜索</a>
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
                      <td>{{latinosCumulative.latinosNum}}</td>
                      <td>{{latinosCumulative.latinosReceive}}</td>
                      <td>{{latinosCumulative.latinosAlreadyUse}}</td>
                      <td>{{latinosCumulative.latinosNotUse}}</td>
                      <td>{{latinosCumulative.latinosOverdue}}</td>
                  </tr>
              </table>
          </div>
          <div class="showInfo">
              <span class="infor-num">共{{pagegroupInfor.total}}条数据</span>
              <span class="out-excel"><i class="icon-file-excel"></i>导出excel表格</span>
          </div>
          <div class="table">
              <table>
                  <tr>
                      <th>权益名称</th>
                      <th>结算方</th>
                      <th>权益种类</th>
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
                  <tr v-for="n in latinosTotalList">
                      <td>{{n.latinosName }}</td><!-- 权益名称-->
                      <td>{{n.settlementParty }}</td><!-- 结算方-->
                      <td>{{n.latinosKinds }}</td><!-- 权益种类-->
                      <td>{{n.latinosTypes }}</td><!-- 权益类型-->
                      <td>{{n.denomination }}</td><!-- 权益面值-->
                      <td>{{n.latinosStatues }}</td><!-- 状态-->
                      <td>{{n.latinosCirculation }}</td><!-- 发行量-->
                      <td>{{n.latinosUsage  }} </td><!-- 使用量-->
                      <td>{{n.overdueNum }}</td><!-- 过期-->
                      <td>{{n.startDate }}</td><!-- 开始时间-->
                      <td>{{n.endDate }}</td><!-- 结束时间-->
                      <td><a v-link="{name:'latinos-detail'}">查看明细</a></td><!--操作-->
                  </tr>
              </table>
          </div>
          <pagegroup class="pagegroup"
              :page_current.sync="pagegroupInfor.page" 
              :total="pagegroupInfor.total" 
              :page_size.sync="pagegroupInfor.maxResult"
              :pages="pagegroupInfor.allPages"
              &gt;</pagegroup>
	  </div>
  </template>
  <script>
      // import model from '../../ajax/latinos/latinos_search_model'
      export default{
           data(){
               return{
             	  pagegroupInfor:{
                       page:1,//当前选中的分页值
                       total:5,//数据总条数
                       maxResult:1,//每页展示多少条数
                       allPages:1,//总页数
                   },
                   latinosCumulative:{     //权益汇总
                       latinosNum:'50',    //权益总数量
                       latinosReceive:'20',    //权益领取量
                       latinosAlreadyUse:'15',    //权益使用量
                       latinosNotUse:'5',    //权益未使用量
                       latinosOverdue:'5',    //权益逾期量
                   },
                   latinosTotalList:[
                       {'latinosName':'权益名称'},// 权益名称
                       {'settlementParty':'结算方'},// 结算方
                       {'latinosKinds':'权益种类'},// 权益种类
                       {'latinosTypes':'权益类型'},// 权益类型
                       {'denomination':'权益面值'},// 权益面值
                       {'latinosStatues':'状态'},// 状态
                       {'latinosCirculation':'发行量'},// 发行量
                       {'latinosUsage ':'使用量'},// 使用量
                       {'overdueNum':'过期'},// 过期
                       {'startDate':'开始时间'},// 开始时间
                       {'endDate':'结束时间'},// 结束时间
                   ],
                   searchDate:{
                       latinosName:'',
                       latinosSettlement:'',
                       startDate:'',
                       endDate:'',
                       latinosKinds:'',
                       latinosTypes:''
                   },
                    activityList:[],
               }
           },
           methods:{
               getLatinosCumulative(){
                   let data={
                       activityID:''
                   };
                   this.model.getLatinosCumulative(data).then((res)=>{
                       if (res.data.code==0) {
                           console.log("getLatinosCumulative"+"success")
                       }
                   })
               },
               getLatinosTotalList(){
                   let data={
                   };
                   this.model.getLatinosTotalList(data).then((res)=>{
                       if (res.data.code==0) {
                           console.log("getLatinosTotalList"+"success")
                       }
                   })
               },
               latinosSearch(){
                   let data={
                       latinosName:this.searchDate.latinosName,
                       latinosSettlement:this.searchDate.latinosSettlement,
                       startDate:this.searchDate.startDate,
                       endDate:this.searchDate.endDate,
                       latinosKinds:this.searchDate.latinosKinds,
                       latinosTypes:this.searchDate.latinosTypes,
                   };
                   // this.model.getSearchLatinos(data).then((res)=>{
                       // if (res.data.code==0){
                           console.log("success");
                       // }
                   // })
               }
           },
           ready(){
               // this.getLatinosCumulative();
               // this.getLatinosTotalList();
           }
      } 
  </script>