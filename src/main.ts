import * as parser from "./parser";
import './index.html';

const p: parser.Parser = new parser.Parser("34+24");
console.log(p.expr());
