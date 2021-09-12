/// <reference path = "./lxl.Player.d.ts" />

declare class Objective {
    get name(): string;
    get displayName(): string;

    getScore(target: Player): number;
    getScore(target: string): number;

    setScore(target: Player, score: number): number;
    setScore(target: string, score: number): number;
    
    addScore(target: Player, score: number): number;
    addScore(target: string, score: number): number;
    
    reduceScore(target: Player, score: number): number;
    reduceScore(target: string, score: number): number;

    deleteScore(target: Player): boolean;
    deleteScore(target: string): boolean;

    /**
     * ob.setDisplay(slot[,sortOrder=0])
     * @param slot  String  显示槽位名称字符串，可以为"sidebar"/"belowname"/"list"
     * @param sortOrder  Integer  （可选参数）排序方式，可以为0(升序)或1(降序)，默认值为0
     */
    setDisplay(slot: string, sortOrder?: number = 0): boolean;
    
}