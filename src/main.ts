import './index.html';
import { Parser } from "./parser";
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
