
export class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private prev: { x: number; y: number; };
    private drawing: boolean = false;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("draw_canvas");
        this.canvas.width = 449;
        this.canvas.height = 449;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.initialize();
    }

    public initialize = () => {
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, 449, 449);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#000000';
        this.ctx.strokeRect(0, 0, 449, 449);
        this.ctx.lineWidth = 0.05;
    }

    private onMouseDown = (e: MouseEvent) => {
        this.canvas.style.cursor = 'default';
        this.drawing = true;
        this.prev = this.getPosition(e.clientX, e.clientY);
    }

    private getPosition = (clientX: number, clientY: number): { x: number; y: number; } => {
        let rect = this.canvas.getBoundingClientRect();
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    private onMouseMove = (e: MouseEvent) => {
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

    private onMouseUp = () => {
        this.drawing = false;
        //this.drawInput();
    }

    // private drawInput = () => {

    // }
}
