
<template>
	<div class="content">
		<clHeader :choseType.sync="tripTypeSel" :isActive="'1'"></clHeader>
		<navigator url="/pages/index/index2" hover-class="navigator-hover">
			<button type="default">跳转到新页面</button>
		</navigator>
		<p>
			<span>store当前值为：{{storeData.testData}}</span>
		</p>
	</div>
</template>

<script>
export default {
	data(){
		return {
			tripTypeSel: "2",
			storeData: this.$store.state,
		}
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>

</style>