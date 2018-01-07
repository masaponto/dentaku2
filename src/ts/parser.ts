const isDigit = (ch: string): boolean => {
    return ch.charCodeAt(0) >= 48 && ch.charCodeAt(0) <= 57;
}

class Source {
    private pos: number = 0;

    constructor(private str: string) {
        this.str = str;
    }

    public peek = (): number => {
        if (this.pos < this.str.length) {
            let ind: string = this.str.charAt(this.pos);
            return ind.charCodeAt(0);
        }
        return -1;
    }

    public next = () => {
        ++this.pos;
    }

}

export class Parser extends Source {

    constructor(str: string) {
        super(str);
    }

    public num = (): number => {
        let output: string = "";
        let ch: number = this.peek();

        while (ch >= 0 && isDigit(String.fromCharCode(ch))) {
            output = output.concat(String.fromCharCode(ch));
            this.next();
            ch = this.peek();
        }

        return parseInt(output);
    }

    public expr = (): number => {
        let x: number = this.term();

        for (; ;) {
            switch (this.peek()) {
                case ('+'.charCodeAt(0)):
                    this.next();
                    x += this.term();
                    continue;
                case ('-'.charCodeAt(0)):
                    this.next();
                    x -= this.term();
                    continue;
            }
            break;
        }

        return x;
    }

    public term = (): number => {
        let x: number = this.factor();
        for (; ;) {
            switch (this.peek()) {
                case ('*'.charCodeAt(0)):
                    this.next();
                    x *= this.factor();
                    continue;
                case ('/'.charCodeAt(0)):
                    this.next();
                    x /= this.factor();
                    continue;
            }
            break;
        }
        return x;
    }

    public factor = (): number => {
        let ret: number;
        this.spaces();
        if (this.peek() == '('.charCodeAt(0)) {
            this.next();
            ret = this.expr();
            if (this.peek() == ')'.charCodeAt(0)) {
                this.next();
            }
        } else {
            ret = this.num();
        }
        this.spaces();
        return ret;
    }

    public spaces = () => {
        while (this.peek() == ' '.charCodeAt(0)) {
            this.next();
        }
    }

}
