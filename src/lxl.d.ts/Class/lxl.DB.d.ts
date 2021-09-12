declare class DB {
    set(name: string, data: number | string | boolean | Array | object): boolean;

    get(name: string);

    delete(name: string);

    listKey(): Array<string>;

    close();
}