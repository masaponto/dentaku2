import './index.html';
import { Parser } from "./parser";
import { Canvas } from "./canvas";
import Vue from "vue";

const vm: Vue = new Vue({
    el: '#app',
    data: { input_text: "" },
    computed: {
        output: function(): string {
            return new Parser(this.input_text).expr().toString();
        }
    }
});

const canvas = new Canvas();

const clearButton: Vue = new Vue({
    el: '#clear',
    methods: {
        clear: function(event: MouseEvent): void {
            canvas.initialize();
        }
    }
});
