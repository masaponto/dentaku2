<template>
    <div>
		<div>
			<p>This is ?: {{y_conv}}</p>
			<canvas ref="canvas"
						 @mousedown="onMouseDown" @touchstart="onMouseDown"
						 @mousemove="onMouseMove" @touchmove="onMouseMove"
						 @mouseup="onMouseUp" @touchend="onMouseUp" @mouseleave="onMouseUp"
			>
			</canvas>
		</div>
		<div>
			<button @click="accept">
				Accept
			</button>
			<button @click="clear">
				Clear
			</button>
			<button>
				Feature
			</button>
		</div>
		<feature></feature>
    </div>
</template>

<script lang="ts">
 import Vue from 'vue';
 import Component from 'vue-class-component';
 import axios from 'axios';
 import {bus} from '../ts/main.ts';
 import {CanvasMixin} from './canvas-mixin.ts';
 import FeatureAreaComponent from "./feature-area.vue";

 @Component({
	 mixins: [CanvasMixin],
	 components: {'feature': FeatureAreaComponent}
 })
 export default class CanvasComponent extends Vue implements CanvasMixin {

	 private ENDPOINT = '/estimate';
	 private y_conv = null;

	 canvas;
	 ctx: CanvasRenderingContext2D;
	 prev: { x: number; y: number; };
	 drawing: boolean = false;
	 tmpCanvas = document.createElement('canvas');

	 mounted: () => void;
	 initialize: () => void;
	 onMouseDown: (e: MouseEvent) => void;
	 onMouseMove: (e: MouseEvent) => void;
	 getPosition: (clientX: number, clientY: number) => { x: number; y: number; };
	 getImageBuffer: (width: number, height: number) => number[];
	 clear: () => void;


	 onMouseUp(e: MouseEvent): void {
		 this.drawing = false;
		 this.estimate();
	 }

	 private estimate() {
		 const inputs: number[] = this.getImageBuffer(28, 28);

		 axios.post(this.ENDPOINT, {input: inputs})
			  .then((response) => {
				  this.y_conv = response.data.estimated;
			  })
			  .catch((error) => {
				  console.error(error);
			  });
	 }

	 accept(): void {
		 this.initialize();
		 bus.$emit('y_conv', this.y_conv);
	 }

 }
</script>

<style scoped>
 div {
	 text-align: center;
 }
</style>
