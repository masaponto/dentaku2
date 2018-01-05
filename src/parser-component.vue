<template>
	<div>
		<h2>Dentaku2</h2>
		<input v-model="input_text" placeholder="expression">
		<p>output: {{output}}</p>
	</div>
</template>

<script>
 import { Parser } from "./parser";

 export default {
     data: function() {
         return { input_text: "" }
     },
     computed: {
         output: function() {
             return new Parser(this.input_text).expr().toString();
         }
     }
 }
</script>
