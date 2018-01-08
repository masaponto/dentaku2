<template>
	<div>
		<input v-model="input_text" placeholder="expression">
		<p>output: {{output}}</p>
	</div>
</template>

<script lang="ts">
 import { Parser } from "../ts/parser";
 import Vue from 'vue'
 import Component from 'vue-class-component'

 @Component
 export default class ParserComponent extends Vue {
	 input_text: string = "";

	 get output(): string {
		 return new Parser(this.input_text).expr().toString();
	 }
 }
</script>
