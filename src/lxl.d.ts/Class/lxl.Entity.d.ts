/// <reference path = "./lxl.Container.d.ts" />
/// <reference path = "./lxl.FloatPos.d.ts" />
/// <reference path = "./lxl.IntPos.d.ts" />
/// <reference path = "./lxl.NbtCompound.d.ts" />
/// <reference path = "./lxl.Player.d.ts" />

declare class Entity {
    get name(): string;
    get type(): string;
    get id(): number;
    get pos(): FloatPos;
    get blockPos(): IntPos;
    get maxHealth(): number;
    get health(): number;
    get inAir(): boolean;
    get inWater(): boolean;
    get speed(): number;

    teleport(pos: FloatPos): boolean;
    teleport(pos: IntPos): boolean;
    teleport(x: number, y: number, z: number, dimid: number): boolean;

    kill(): boolean;
    hurt(damage: number): boolean;

    setOnFire(time: number): boolean;

    isPlayer(): boolean;
    toPlayer(): Player;

    getArmor(): Container;

    hasContainer(): boolean;
    getContainer(): Container;

    addTag(tag: string): boolean;
    removeTag(tag: string): boolean;
    hasTag(tag: string): boolean;
    getAllTags(): Array<string>;

    getNbt(): NbtCompound;
    setNbt(nbt: NbtCompound): boolean;
    
}