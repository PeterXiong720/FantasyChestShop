/// <reference path = "./lxl.FloatPos.d.ts" />
/// <reference path = "./lxl.NbtCompound.d.ts" />

declare class Item {
    get name(): string;
    get type(): string;
    get id(): number;
    get count(): number;
    get aux(): number;

    isNull(): boolean;
    setNull(): boolean;

    clone(): Item;

    set(item: Item): boolean;
    setAux(item: Item, aux: number): boolean;

    getNbt(): NbtCompound;
    setNbt(nbt: NbtCompound): boolean;

    setLore(names: Array<string>): boolean;
}