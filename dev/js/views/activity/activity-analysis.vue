<template>
	<div class="activity-analysis">
		<div class="activity-search border">
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
			<div class="data-title">交易数据分析</div>
			<div class="data-today">
				<span><i></i>今日关键数据</span>
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
			<div class="data-cumulative">
				<span><i></i>累计关键数据</span>
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
			<div>
				<span><i></i>7日/30日关键数据详解</span>
				<div>
					<span>交易总金额</span>
					<span>补贴总金额</span>
					<span>交易总笔数</span>
				</div>
				<div class="transaction-echart"></div>
			</div>
		</div>
		<div class="transaction- border">
			
		</div>
		<div class="transaction-time border"></div>
		<div class="Merchant-data border"></div>
		<div class="cardBIN-data border"></div>
		<div class="one-card border"></div>
		<div class="latinos-data border"></div>
		<div class="latinos-probability border"></div>
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