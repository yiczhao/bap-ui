<template>
	<div class="create-activity">
		<div class="activity-list">
			<template v-for="(index,value) in activityName">
				<div class="show-activity" @click="(value.show)?value.show=false:value.show=true">
					<div class="bg-show" :class="value.type">
						<div class="activity-name">
							<h4><a>{{value.name}}</a></h4>
						</div>
						<div class="activity-intru">{{value.text}}</div>
					</div>
					<div class="hover-bg" v-show="value.show"></div>
					<a v-show="value.show" class="btn btn-primary"  @click="setProp('online')" v-link="{'name':'basic-rule',params:{'rulename':value.link}}">创建线上活动</a>
					<a v-show="value.show" class="btn btn-danger" @click="setProp('offline')" v-link="{'name':'basic-rule',params:{'rulename':value.link}}">创建线下活动</a>
				</div>
				<div class="block" v-if="index==3"></div>
			</template>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				activityName:
				[{
					'name':'满减',
					'text':'特定持卡人享受消费满减优惠。',
					'link':'MeetMinus',
					'show':false,
					'type':'manjian'
				},{
					'name':'立减',
					'text':'特定持卡人享受消费立减优惠。',
					'link':'MeetMinus',
					'show':false,
					'type':'zhekou'
				},{
					'name':'随机立减',
					'text':'特定持卡人享有每单消费随机立减的优惠资格',
					'link':'RandomMinus',
					'show':false,
					'type':'suijilijian'
				},{
					'name':'每满减',
					'text':'特定持卡人享受消费每满减优惠',
					'link':'MeetMinus',
					'show':false,
					'type':'meimanjian'
				},{
					'name':'折扣',
					'text':'特定持卡人享有每单消费打折优惠',
					'link':'MeetMinus',
					'show':false,
					'type':'zhekou'
				},{
					'name':'随机折扣',
					'text':'特定持卡人享有每单消费随机折扣的优惠资格',
					'link':'MeetMinus',
					'show':false,
					'type':'suijizhekou'
				},{
					'name':'连环折扣',
					'text':'特定持卡人享有多次消费连环折扣的优惠资格',
					'link':'MeetMinus',
					'show':false,
					'type':'lianhuanzhekou'
				},{
					'name':'几号几折',
					'text':'特定持卡人享有根据消费日期尾数打折的优惠资格。',
					'link':'MeetMinus',
					'show':false,
					'type':'jihaojizhe'
				},{
					'name':'周几几折',
					'text':'特定持卡人享有根据消费的周尾数打的优惠资格。',
					'link':'MeetMinus',
					'show':false,
					'type':'zhoujijizhe'
				},{
					'name':'票务类活动',
					'text':'特定持卡人享有以优惠价购票的资格',
					'link':'MeetMinus',
					'show':false,
					'type':'piaowu'
				},{
					'name':'权益',
					'text':'特定持卡人享有根据消费的周尾数打的优惠资格。',
					'link':'MeetMinus',
					'show':false,
					'type':'quanyi'
				}]
			}
		},
		methods:{
			setProp(val){
				debugger
				sessionStorage.setItem('props',val);
			}
		},
		ready(){}
	}
</script>
