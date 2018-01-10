<template>
    <div>
		<p>This is ?: {{y_conv}}</p>
		<canvas ref="canvas"
				@mousedown="onMouseDown" @touchstart="onMouseDown"
				@mousemove="onMouseMove" @touchmove="onMouseMove"
				@mouseup="onMouseUp" @touchend="onMouseUp" @mouseleave="onMouseUp"
		>
		</canvas>
		<button @click="clear">
			Clear
		</button>
		<button @click="accept">
			Accept
		</button>
    </div>
</template>

<script lang="ts">
 import Vue from 'vue';
 import Component from 'vue-class-component';
 import axios from 'axios';
 import {bus} from '../ts/main.ts';

 @Component
 export default class CanvasComponent extends Vue {

	 private ENDPOINT = '/estimate'
     private canvas;
	 private tmpCanvas = document.createElement('canvas');
	 private ctx;
	 private prev: { x: number; y: number; };
	 private drawing: boolean = false;

	 y_conv = null;

	 mounted() {
		 this.canvas = this.$refs.canvas;
		 this.canvas.width = 449;
		 this.canvas.height = 449;
		 this.ctx = this.canvas.getContext('2d');
		 this.initialize();
	 }

	 private initialize() {
		 this.ctx.fillStyle = '#FFFFFF';
		 this.ctx.fillRect(0, 0, 449, 449);
		 this.ctx.lineWidth = 1;
		 this.ctx.strokeStyle = '#000000';
		 this.ctx.strokeRect(0, 0, 449, 449);
		 this.ctx.lineWidth = 0.05;
	 }

	 onMouseDown(e: MouseEvent): void {
		 this.canvas.style.cursor = 'default';
		 this.drawing = true;
		 this.prev = this.getPosition(e.clientX, e.clientY);
	 }

	 private getPosition(clientX: number, clientY: number): { x: number; y: number; } {
		 let rect = this.canvas.getBoundingClientRect();
		 return {
			 x: clientX - rect.left,
			 y: clientY - rect.top
		 };
	 }

	 onMouseMove(e: MouseEvent): void {
		 if (this.drawing) {
			 let curr: { x: number; y: number; }
			 = this.getPosition(e.clientX, e.clientY);
			 this.ctx.lineWidth = 16;
			 this.ctx.lineCap = 'round';
			 this.ctx.beginPath();
			 this.ctx.moveTo(this.prev.x, this.prev.y);
			 this.ctx.lineTo(curr.x, curr.y);
			 this.ctx.stroke();
			 this.ctx.closePath();
			 this.prev = curr;
		 }
	 }

	 onMouseUp(e: MouseEvent): void {
		 this.drawing = false;
		 this.estimate();
	 }

	 clear(): void {
		 this.initialize();
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

	 private getImageBuffer(width: number, height: number): number[] {
		 this.tmpCanvas.width = width;
		 this.tmpCanvas.height = height;

		 let tmpCtx = this.tmpCanvas.getContext('2d');
		 tmpCtx.drawImage(this.ctx.canvas, 0, 0, width, height);

		 let img: ImageData = tmpCtx.getImageData(0, 0, width, height);

		 let inputs: number[] = [];
		 for (let i = 0; i < img.data.length; i += 4 ) {
			 let sum = (img.data[i+0] + img.data[i+1] + img.data[i+2])/3;
			 inputs.push(Math.min(sum, 255));
		 }

		 return inputs;
	 }

	 accept(): void {
		 bus.$emit('y_conv', this.y_conv);
	 }

 }
</script>
