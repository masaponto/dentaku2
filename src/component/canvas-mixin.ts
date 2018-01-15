import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class CanvasMixin extends Vue {
    canvas;
    tmpCanvas;
    ctx: CanvasRenderingContext2D;
    prev: { x: number; y: number; };
    drawing: boolean = false;

    mounted() {
        this.canvas = this.$refs.canvas;
        this.canvas.width = 449;
        this.canvas.height = 449;
        this.ctx = this.canvas.getContext('2d');
        this.initialize();
    }

    initialize() {
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

    getPosition(clientX: number, clientY: number): { x: number; y: number; } {
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

    getImageBuffer(width: number, height: number): number[] {
        this.tmpCanvas.width = width;
        this.tmpCanvas.height = height;

        let tmpCtx = this.tmpCanvas.getContext('2d');
        tmpCtx.drawImage(this.ctx.canvas, 0, 0, width, height);

        let img: ImageData = tmpCtx.getImageData(0, 0, width, height);

        let inputs: number[] = [];
        for (let i = 0; i < img.data.length; i += 4) {
            let sum = (img.data[i + 0] + img.data[i + 1] + img.data[i + 2]) / 3;
            inputs.push(Math.min(sum, 255));
        }

        return inputs;
    }

    clear(): void {
        this.initialize();
    }
}
