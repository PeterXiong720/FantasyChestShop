declare class LXLFile {
    get path(): string;
    get size(): number;

    seekTo(pos: number, isRelative: boolean): boolean;

    setSize(size: number): boolean;

    close(): boolean;

    isEOF(): boolean;

    flush(): boolean;

    errorCode(): number;

    clear(): boolean;

    //Sync
    readSync(cnt: number);

    readLineSync(): string;

    readAllSync();

    writeSync(data): boolean;

    writeLineSync(str: string): boolean;

    //Async
    read(cnt: number, callback: (result: any) => void): boolean;

    readLine(callback: (result: string) => void): boolean;

    readAll(callback: (result: any) => void): boolean;

    write(data, callback?: (result) => void): boolean;

    writeLine(str: string, callback?: (result) => void): boolean;
}