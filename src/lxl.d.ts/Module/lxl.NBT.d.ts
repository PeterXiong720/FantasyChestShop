/// <reference path = "../Class/lxl.NbtCompound.d.ts" />
/// <reference path = "../Class/lxl.NbtList.d.ts" />

declare class NBT {
    static get End(): NbtValue;
    static get Byte(): NbtValue;
    static get Short(): NbtValue;
    static get Int(): NbtValue;
    static get Long(): NbtValue;
    static get Float(): NbtValue;
    static get Double(): NbtValue;
    static get ByteArray(): NbtValue;
    static get String(): NbtValue;
    static get List(): NbtList;
    static get Compound(): NbtCompound;

    static createTag(type: NbtValue, data?: any): NbtValue;
    static createTag(type: NbtList, data?: any): NbtList;
    static createTag(type: NbtCompound, data?: any): NbtCompound;

    static parseSNBT(snbt: string): NbtCompound;

    static parseBinaryNBT(nbt): NbtCompound;
}

declare class NbtValue {
    getType();
    toString(space?: number): string;
    destroy(): boolean;

    set(data): boolean;
    get();
}