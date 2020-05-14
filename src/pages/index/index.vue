
<template>
	<div class="content">
		
		<clHeader :choseType.sync="tripTypeSel" :isActive="'1'"></clHeader>
		<navigator url="/pages/index/index2" hover-class="navigator-hover">
			<button type="default">跳转到新页面</button>
		</navigator>
		<u-button @click="goJP">机票首页-伪</u-button>
		<p>
			<span>store当前值为：{{storeData.testData}}</span>
		</p>
		<button @click="changeTestData">修改</button>
		<p>
			moment生成的 {{momentDate}}
		</p>
		<calendar :chooseDay="day" @changeFirstDay="changeFirstDay" style="width:100%">
			<u-button>日期组件</u-button>
		</calendar>
		
		<!-- <u-picker v-model="show" mode="time"></u-picker> -->
	</div>
</template>

<script>
import calendar from '../../components/calendar';
import moment from "moment";
import {
	getUserInfo,
	queryFlight
} from "../../utils/index.js"
export default {
	data(){
		return {
			tripTypeSel: "2",
			day: [2020,5,13],
			storeData: this.$store.state,
			show: true
		}
	},
	components: {
		calendar
	},
	computed: {
		momentDate(){
			return moment(new Date()).format("MM月DD日")
		}
	},
	mounted(){
		// this.$u.route("/pages/index/index2")
	},
	methods: {
		changeTestData(){
			this.$store.commit("changeTestData", new Date().getTime())
		},
		changeFirstDay(arg){
			console.log(arg);
			this.day= arg;
		},
		goJP(){
			this.$u.route("/pages/index/search")
		}
	}
}
</script>

<style lang="scss" scoped>
	.content{
		height: 100%;
		overflow: hidden;
	}
</style>