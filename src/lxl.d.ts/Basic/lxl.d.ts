// /// <reference path = "../Class/lxl.Player.d.ts" />

declare class lxl {
    static version(): {
        major: number,
        minor: number,
        revision: number
        isBeta: boolean
    };

    static requireVersion(
        major: number,
        minor?: number,
        revision?: number
    ): boolean;

    static listPlugins(): Array<string>;

    /**
     * 
     * @param func 
     * @param name 
     */
    static export(func, name): boolean;

    /**
     * 
     * @param name 
     */
    static import(name): Function;

    static require(path, remotePath?: string): boolean;

    static eval(str: string);

    static loadLangPack(path: string): number;
}

declare function log(...msg: Array<any>) : void;
declare function colorLog(color: string, ...msg: Array<any>): void;

declare function setTimeout(func: () => void, msec: number): number;
declare function setTimeout(code: string, msec: number): number;

declare function setInterval(func: () => void, msec: number): number;
declare function setInterval(code: string, msec: number): number;

declare function clearInterval(taskid: number): boolean;