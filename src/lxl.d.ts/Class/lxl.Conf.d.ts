declare class Conf {
    reload();

    close();

    getPath(): string;

    read(): string;

    write(content: string): boolean;

    //json
    set(name: string, data: number | boolean | Array | object): boolean;
    
    get(name: string, default_cfg?: any);

    delete(name: string): boolean;

    //ini
    set(section: string, name: string, data: number | string | boolean);

    getInt(section: string, name: string, default_cfg?: number): number;

    getStr(section: string, name: string, default_cfg?: string): string;

    getFloat(section: string, name: string, default_cfg?: number): number;

    getBool(section: string, name: string, default_cfg?: boolean): boolean;

    delete(section: string, name: string): boolean;
}