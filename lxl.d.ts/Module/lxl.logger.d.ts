declare class logger {
    static setConsole(isOpen: boolean, logLevel?: number): void;

    static setFile(filepath: string, logLevel?: number): void;

    static setPlayer(player: Player, logLevel?: number);

    static setTitle(title: string): void;

    static setLogLevel(level: number): void;

    static log(...data: Array<any>): void;
    static debug(...data: Array<any>): void;
    static info(...data: Array<any>): void;
    static warn(...data: Array<any>): void;
    static error(...data: Array<any>): void;
    static fatal(...data: Array<any>): void;
}