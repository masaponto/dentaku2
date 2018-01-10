import '../index.html';
import Vue from "vue";
import ParserComponent from "../component/parser-component.vue";
import CanvasComponent from "../component/canvas-component.vue";

export const bus: Vue = new Vue();

const vm: Vue = new Vue({
    el: '#app',
    components: {
        'parser': ParserComponent,
        'dcanvas': CanvasComponent
    }
});
