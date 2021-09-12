/// <reference path = "../Class/lxl.File.d.ts" />

declare class file {
    static get readMode();
    static get writeMode();
    static get appendMode();

    static readFrom(path: string): string;

    static writeTo(path: string, text: string): boolean;

    static writeLine(path: string, text: string): boolean;

    static open(path: string, mode, isBinary?: boolean): LXLFile;

    static createDir(dir: string): boolean;
    static mkdir(dir: string): boolean;

    static delete(path: string): boolean;

    static exists(path: string): boolean;

    static copy(from: string, to: string): boolean;

    static move(from: string, to: string): boolean;

    static rename(old_name: string, new_name: string): boolean;

    static getFileSize(path: string): number;

    static checkIsDir(path: string): boolean;

    static getFilesList(dir: string): Array<string>;
}

