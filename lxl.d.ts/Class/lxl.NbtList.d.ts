declare class NbtList {
    getType();
    toString(space?: number): string;
    destroy(): boolean;

    getSize(): number;

    getTypeOf(index: number);

    setTag(index: number, tag: NbtValue): NbtList;
    setTag(index: number, tag: NbtList): NbtList;
    setTag(index: number, tag: NbtCompound): NbtList;

    getTag(index: number);

    addTag(tag: NbtValue): NbtList;
    addTag(tag: NbtList): NbtList;
    addTag(tag: NbtCompound): NbtList;

    removeTag(index: number): NbtList;

    setEnd(index): NbtList;
    setByte(index: number, data: NbtValue): NbtList;
    setShort(index: number, data: NbtValue): NbtList;
    setInt(index: number, data: NbtValue): NbtList;
    setLong(index: number, data: NbtValue): NbtList;
    setFloat(index: number, data: NbtValue): NbtList;
    setDouble(index: number, data: NbtValue): NbtList;
    setString(index: number, data: NbtValue): NbtList;

    getData(index: number);

    toArray(): Array<any>;
}