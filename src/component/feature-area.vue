<template>
	<div>
		<div>
			<textarea type="text" v-model="feature" readonly="readonly"></textarea>
		</div>
		<div>
			<button @click="download">
				Download
			</button>
			<button @click="clear">
				Clear
			</button>
		</div>
	</div>
</template>

<script lang="ts">
 import Vue from 'vue';
 import axios from 'axios';
 import Component from 'vue-class-component';
 import {bus} from '../ts/main.ts';

 @Component
 export default class featuerAreaComponent extends Vue {
	 feature: string = "";

	 mounted() {
		 bus.$on('feature', (tmp: string) => {
			 this.feature += tmp;
			 this.feature += '\n';
		 });
	 }

	 private download() {
		 let file = new Blob([this.feature], {type: 'text/plain'});
		 let element = document.createElement("a");
		 element.href = URL.createObjectURL(file);
		 element.download = "data.csv";
		 element.click();
		 console.log("download");
	 }

	 private clear() {
		 this.feature = "";
	 }
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
