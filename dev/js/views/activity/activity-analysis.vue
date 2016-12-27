<template>
	<div class="activity-analysis">
		<div class="activity-search">
			<div class="search-left">
				<label>活动名称</label>
				<input class="input" type="text" name="" placeholder="请输入活动名称">
			</div>
			<div class="search-right">
				<span class="search-time">活动进行中，数据截止到16:00，2016-06-16 </span>
				<a class="view-report">查看分析报告</a>
			</div>
		</div>
		<div class="transaction-data border">
			<div class="data-title"><span>交易数据分析</span><span>收起</span></div>
			<div class="data-today-table">
				<span class="title"><i></i>今日关键数据</span>
				<table>
					<tr>
						<td>
							<span>交易总金额(元)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>补贴总金额(元)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>交易总笔数(笔)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>参与活动卡数量(个)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>单笔平均交易金额(元)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>单笔平均补贴金额(元)</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="data-cumulative-table">
				<span class="title"><i></i>累计关键数据</span>
				<table>
					<tr>
						<td>
							<span>交易总金额(元)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>补贴总金额(元)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>交易总笔数(笔)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>参与活动卡数量(个)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>单笔平均交易金额(元)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>单笔平均补贴金额(元)</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="data-detail">
				<span class="title"><i></i>7日/30日关键数据详解</span>
				<div>
					<span>交易总金额</span>
					<span>补贴总金额</span>
					<span>交易总笔数</span>
				</div>
				<div class="data-echart"></div>
			</div>
		</div>
		<div class="transaction-region border">
			<div class="region-title"><span>交易区域分析</span><span>收起</span></div>
			<div class="region-table">
				<span class="title"><i></i>关键数据</span>
				<table>
					<tr>
						<td>
							<span>产生交易区域（个）</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>区域平均交易笔数(笔)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>最高交易区域</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>最高交易区域交易笔数(笔)</span>
							<strong>123456</strong>
						</td>
					 	<td>
							<span>最高交易区域交易额（元）</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="region-detail">
				<span class="title"><i></i>交易区域关键数据排行</span>
				<div>
					<span>交易金额</span>
					<span>交易笔数</span>
				</div>
				<div class="region-echart"></div>
			</div>
		</div>
		<div class="transaction-time border">
			<div class="time-title"><span>交易时段分析</span><span>收起</span></div>
			<div class="time-show">
				<div class="time-echart"></div>
			</div>
		</div>
		<div class="merchant-data border">
			<div class="merchant-title"><span>商户数据分析</span><span>收起</span></div>
			<div class="merchant-table">
				<span class="title"><i></i>关键数据</span>
				<table>
					<tr>
						<td>
							<span>参与门店数（个）</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>产生交易门店数(个)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>店均交易笔数(个)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>店均补贴金额(元)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>店均交易金额（元）</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="merchant-detail">
				<span class="title"><i></i>商户关键数据排行</span>
				<div>
					<span>交易金额</span>
					<span>交易笔数</span>
				</div>
				<div class="Merchant-echart"></div>
			</div>
		</div>
		<div class="cardBIN-data border">
			<div class="cardBIN-title"><span>卡BIN数据分析</span><span>收起</span></div>
			<div class="cardBIN-ranking">
				<span class="title"><i></i>关键数据</span>
				<table>
					<tr>
						<td>
							<span>卡BIN个数（个）</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>卡BIN平均交易笔数(个)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>卡BIN平均交易金额（元）</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>卡BIN平均补贴金额(元)</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="cardBIN-detail">
				<span class="title"><i></i>卡BIN关键数据排行</span>
				<div>
					<span>交易金额</span>
					<span>交易笔数</span>
				</div>
				<div class="cardBIN-echart"></div>
			</div>
		</div>
		<div class="one-card border">
			<div class="one-title"><span>单卡交易分析</span><span>收起</span></div>
			<div class="one-ranking">
				<span class="title"><i></i>关键数据</span>
				<table>
					<tr>
						<td>
							<span>参与卡数量（个）</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>卡均参与次数(次)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>单卡最高参与次数（次）</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="one-detail">
				<span class="title"><i></i>单卡最高参与次数（次）</span>
				<div class="one-echart"></div>
			</div>
		</div>
		<div class="wechat-data border">
			<div class="wechat-title"><span>微信数据分析</span><span>收起</span></div>
			<div class="wechat-cumulative">
				<span class="title"><i></i>昨日关键数据</span>
				<table>
					<tr>
						<td>
							<span>新关注人数</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>取消关注人数</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>净关注人数</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>累计关注人数</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="wechat-detail">
				<span class="title"><i></i>7日/30日关键数据详解</span>
				<div>
					<span>新关注人数</span>
					<span>取消关注人数</span>
					<span>净关注人数</span>
					<span>累计关注人数</span>
				</div>
				<div class="wechat-echart"></div>
			</div>
		</div>
		<div class="apply-card border">
			<div class="apply-title"><span>申卡数据分析</span><span>收起</span></div>
			<div class="apply-cumulative">
				<span class="title"><i></i>关键数据</span>
				<table>
					<tr>
						<td>
							<span>今日申卡数量</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>累计申卡数量</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>今日申卡最多区域</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>累计申卡最多区域</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="apply-detail">
				<span class="title"><i></i>申卡数据排行</span>
				<div>
					<span>今日申卡数量</span>
					<span>累计申卡数量</span>
				</div>
				<div class="apply-echart"></div>
			</div>
		</div>
		<div class="latinos-data border">
			<div class="latinos-title"><span>权益数据分析</span><span>收起</span></div>
			<div class="">
				<span class="title"><i></i>累计关键数据</span>
				<table>
					<tr>
						<td>
							<span>总权益数量</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>领取权益数量</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>未领取权益数量</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>权益领取率</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
				<table>
					<tr>
						<td>
							<span>权益使用量</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>权益未使用量</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>权益核销率</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="latinos-probability border">
			<div class="latinos-title"><span>权益数据分析</span><span>收起</span></div>
			<div class="probability-table">
				<span class="title"><i></i>今日关键数据</span>
				<table>
					<tr>
						<td>
							<span>中奖率</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>参与次数</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>参与人数</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>权益中出数量</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
				<span class="title"><i></i>累计关键数据</span>
				<table>
					<tr>
						<td>
							<span>中奖率</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>参与次数</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>参与人数</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>权益中出数量</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="probability-detail">
				<span><i></i>累计关键数据</span>
				<div class="probability-echart"></div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{

			}
		},
		methods:{

		},
		ready(){

		}
	}
</script>