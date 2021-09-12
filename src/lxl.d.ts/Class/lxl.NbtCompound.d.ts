/// <reference path = "../Module/lxl.NBT.d.ts" />
/// <reference path = "./lxl.NbtList.d.ts" />

declare class NbtCompound {
    getType();
    toString(space?: number): string;
    destroy(): boolean;

    toSNBT(): string;
    toBinaryNBT();

    getKeys(): Array<string>;

    getTypeOf(key: string);

    setTag(key: string, tag: NbtValue | NbtList | NbtCompound): boolean;

    getTag(key: string);

    removeTag(key: string): NbtCompound;

    setEnd(key: string): NbtCompound;
    setByte(key: string, data): NbtCompound;
    setShort(key: string, data): NbtCompound;
    setInt(key: string, data): NbtCompound;
    setLong(key: string, data): NbtCompound;
    setFloat(key: string, data): NbtCompound;
    setDouble(key: string, data): NbtCompound;
    setString(key: string, data): NbtCompound;

    getData(key: string);

    toObject(): object;
}