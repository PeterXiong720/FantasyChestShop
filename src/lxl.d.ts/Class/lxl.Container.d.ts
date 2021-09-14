/// <reference path = "./lxl.Item.d.ts" />

//import { Item } from "./lxl.Item";

declare class Container {
    get size(): number;

    addItem(item: Item): boolean;
    addItemToFirstEmptySlot(item: Item): boolean;

    hasRoomFor(item: Item): boolean;

    removeItem(index: number, count: number): boolean;

    setItem(index: number, item: Item): Boolean;

    getItem(index: number): Item;
    getAllItems(): Array<Item>;

    removeAllItems(): boolean;

    isEmpty(): boolean;
}