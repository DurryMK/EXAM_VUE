<template>
	<el-button style="opacity: 0;" type="primary" v-loading.fullscreen.lock="fullscreenLoading">
	</el-button>
</template>

<script>
	export default {
		name: 'Loading',
		data() {
			return {
				fullscreenLoading: true
			}
		},
	}
</script>

<style>
</style>
