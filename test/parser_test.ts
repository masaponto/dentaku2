import * as parser from "../src/parser";
import * as assert from "assert";

describe("parser", function() {
    it("parser_test", function() {
        assert(['a', 'b', 'c'].join(':') === 'a:b:c');
    });

    it("parser_test2", function() {
        assert(parser.echo("hoge") === "hoge");
    });
});
