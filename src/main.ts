import './index.html';
import Vue from "vue";
import ParserComponent from "./parser-component.vue";
import CanvasComponent from "./canvas-component.vue";

const vm: Vue = new Vue({
    el: '#app',
    components: {
        'parser': ParserComponent,
        'dcanvas': CanvasComponent
    }
});


//const canvas = new Canvas();
// const canvasModel: Vue = new Vue(
//     el: '#canvas',
//     methods: {
//         onMoucedown: function(event: MouseEvent): void {
//             canvas.
//         }
//     }
// );

// const clearButton: Vue = new Vue({
//     el: '#clear',
//     methods: {
//         clear: function(event: MouseEvent): void {
//             canvas.initialize();
//         }
//     }
// });
