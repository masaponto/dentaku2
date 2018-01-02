export const hello = (message: string): void => {
    document.body.innerHTML = (`${message}`);
    console.log(`${message}を出力しました`);
};

export const echo = (message: string): string => {
    return message;
};

class Parser {
    private str: string;
    private pos: number;

    constructor(str: string) {
        this.str = str;
    }

    number = (): string => {
        return "test";
    }
}
