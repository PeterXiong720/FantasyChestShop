/// <reference path = "./lxl.BlockEntity.d.ts" />
/// <reference path = "./lxl.IntPos.d.ts" />
/// <reference path = "./lxl.NbtCompound.d.ts" />

declare class Block {
    get name(): string;
    get type(): string;
    get id(): number;
    get pos(): IntPos;

    getNbt(): NbtCompound;
    setNbt(nbt: NbtCompound): boolean;

    getBlockState(): any;

    hasContainer(): boolean;
    getContainer(): Container;

    hasBlockEntity(): boolean;
    getBlockEntity(): BlockEntity;
    removeBlockEntity(): boolean;
}