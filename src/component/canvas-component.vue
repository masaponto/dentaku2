<template>
	<div>
		<canvas ref="canvas"
				@mousedown="onMouceDown"
				@mouseup="onMouceUp"
				@mousemove="onMouceMove">
		</canvas>
	</div>
</template>

<script>
 export default {
	 data: function() {
		 return {
			 canvas: {},
			 ctx: {},
			 prev: {},
			 drawing: false
		 };
	 },

	 mounted: function() {
		 this.canvas = this.$refs.canvas;
		 this.canvas.width = 449;
		 this.canvas.height = 449;
		 this.ctx = this.canvas.getContext('2d');
		 this.initialize();
	 },

	 methods: {

		 initialize: function() {
			 this.ctx.fillStyle = '#FFFFFF';
			 this.ctx.fillRect(0, 0, 449, 449);
			 this.ctx.lineWidth = 1;
			 this.ctx.strokeStyle = '#000000';
			 this.ctx.strokeRect(0, 0, 449, 449);
			 this.ctx.lineWidth = 0.05;
		 },

		 onMouceDown: function(e) {
			 console.log("moucedown");
			 this.canvas.style.cursor = 'default';
			 this.drawing = true;
			 this.prev = this.getPosition(e.clientX, e.clientY);
		 },

		 getPosition: function(clientX, clientY) {
			 const rect = this.canvas.getBoundingClientRect();
			 return {
				 x: clientX - rect.left,
				 y: clientY - rect.top
			 };
		 },
		 onMouceMove: function(e) {
			 console.log("moucemove");
			 if (this.drawing) {
				 const curr = this.getPosition(e.clientX, e.clientY);
				 this.ctx.lineWidth = 16;
				 this.ctx.lineCap = 'round';
				 this.ctx.beginPath();
				 this.ctx.moveTo(this.prev.x, this.prev.y);
				 this.ctx.lineTo(curr.x, curr.y);
				 this.ctx.stroke();
				 this.ctx.closePath();
				 this.prev = curr;
			 }
		 },

		 onMouceUp: function(e) {
			 console.log("mouceup");
			 this.drawing = false;
		 }
	 }
 }
</script>
