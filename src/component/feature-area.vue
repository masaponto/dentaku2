<template>
	<div>
		<div>
			<textarea ref="feature" type="text">hogehoge</textarea>
		</div>
		<div>
			<button>
				Download
			</button>
		</div>
	</div>
</template>

<script lang="ts">
 import Vue from 'vue';
 import Component from 'vue-class-component';

 @Component
 export default class featuerAreaComponent extends Vue {

 }
</script>

<style scoped>
 div {
	 text-align: center;
 }

 textarea {
	 resize: false;
	 margin-top: 50px;
	 width: 500px;
	 height: 150px;
 }
</style>
