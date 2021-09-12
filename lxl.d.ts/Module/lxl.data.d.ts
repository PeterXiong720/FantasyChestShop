/// <reference path = "../Class/lxl.Conf.d.ts" />
/// <reference path = "../Class/lxl.DB.d.ts" />

declare class data {
    static openConfig(path: string, format?: string, default_cfg?: string): Conf;

    static openDB(dir: string): DB;

    static name2xuid(player_name: string): string;

    static xuid2name(xuid: string): string;

    static toJson(data: number | boolean | Array | object, space?: number): string;

    static parseJson(json: string);

    static toMD5(str: string): string;

    static toSHA1(str: string): string;
}