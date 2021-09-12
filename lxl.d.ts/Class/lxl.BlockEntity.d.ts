/// <reference path = "./lxl.Block.d.ts" />
/// <reference path = "./lxl.IntPos.d.ts" />
/// <reference path = "./lxl.NbtCompound.d.ts" />

declare class BlockEntity {
    get pos(): IntPos;
    get type(): number;

    getNbt(): NbtCompound;
    setNbt(nbt: NbtCompound);

    getBlock(): Block;
}