<template>
	<div class="create-activity">
		<div class="activity-list">
			<div v-for="value in activityName" class="show-activity">
				<div><!-- <img :src="value.image+'.png'"> -->
					<img src="../../../img/manjian.png">
					<div class="activity-name">
						<h4><a>{{value.name}}</a></h4>
					</div>
					<div class="activity-intru">{{value.text}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				activityName:
				[{
					'name':'满减（含立减）',
					'text':'特定持卡人享受消费满减/立减优惠',
					'link':'activity',
					'image':'manjian'
				},{
					'name':'折扣',
					'text':'特定持卡人享受消费打折优惠。',
					'link':'activity',
					'image':'zhekou'
				},{
					'name':'随机立减',
					'text':'特定持卡人享有每单消费随机立减的优惠资格',
					'link':'activity',
					'image':'suijilijian'
				},{
					'name':'随机折扣',
					'text':'特定持卡人享有每单消费随机折扣的优惠资格',
					'link':'activity',
					'image':'suijizhekou'
				},{
					'name':'票务类活动',
					'text':'特定持卡人享有以优惠价购票的资格',
					'link':'activity',
					'image':'piaowu'
				},{
					'name':'连环折扣',
					'text':'特定持卡人享有多次消费连环折扣的优惠资格',
					'link':'activity',
					'image':'lianhuazhekou'
				},{
					'name':'几号几折',
					'text':'特定持卡人享有根据消费日期尾数打折的优惠资格。',
					'link':'activity',
					'image':'jihaojizhe'
				},{
					'name':'周几几折',
					'text':'特定持卡人享有根据消费的周尾数打的优惠资格。',
					'link':'activity',
					'image':'zhoujijizhe'
				},{
					'name':'每满减',
					'text':'特定持卡人享受消费每满减优惠',
					'link':'activity',
					'image':'meimanjian'
				}],
			}
		},
		methods:{},
		ready(){}
	}
</script>
