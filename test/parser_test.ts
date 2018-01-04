import * as parser from "../src/parser";
import * as assert from "assert";

describe("parser", function() {

    it("test num", function() {
        const p: parser.Parser = new parser.Parser("7");
        assert(p.num() === 7);
    });

    it("test num", function() {
        const p: parser.Parser = new parser.Parser("12+24");
        assert(p.num() === 12);
    });

    it("test sum", function() {
        const p: parser.Parser = new parser.Parser("12+24");
        assert(p.expr() === 36);
    });

    it("test sum", function() {
        const p: parser.Parser = new parser.Parser("12+24+10");
        assert(p.expr() === 46);
    });

    it("test sub", function() {
        const p: parser.Parser = new parser.Parser("24-13");
        assert(p.expr() === 11);
    });

    it("test sub", function() {
        const p: parser.Parser = new parser.Parser("1-2-3");
        assert(p.expr() === -4);
    });

    it("test times", function() {
        const p: parser.Parser = new parser.Parser("1-2*3");
        assert(p.expr() === -5);
    });

    it("test times", function() {
        const p: parser.Parser = new parser.Parser("10/2*3");
        assert(p.expr() === 15);
    });

    it("test brackets", function() {
        const p: parser.Parser = new parser.Parser("(10+2)*3");
        assert(p.expr() === 36);
    });

    it("test spaces", function() {
        const p: parser.Parser = new parser.Parser("10 +2 *3");
        assert(p.expr() === 16);
    });

    it("test spaces and brackets", function() {
        const p: parser.Parser = new parser.Parser("(    10      + (2  -4) ) * 3");
        assert(p.expr() === 24);
    });

});
