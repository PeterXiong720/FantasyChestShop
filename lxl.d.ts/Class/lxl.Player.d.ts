/// <reference path = "./lxl.Container.d.ts" />
/// <reference path = "./lxl.Device.d.ts" />
/// <reference path = "./lxl.FloatPos.d.ts" />
/// <reference path = "./lxl.Form.d.ts" />
/// <reference path = "./lxl.IntPos.d.ts" />
/// <reference path = "./lxl.Item.d.ts" />
/// <reference path = "./lxl.NbtCompound.d.ts" />

declare class Player {
    /**
    * 玩家名
    */
    get name(): string;
    /**
     * 玩家所在坐标
     */
    get pos(): FloatPos;
    /**
     * 玩家所在方块坐标
     */
    get blockPos(): IntPos;
    /**
     * 玩家的真实名字
     */
    get realName(): string;
    /**
     * 玩家Xuid字符串
     */
    get xuid(): string;
    /**
     * 玩家Uuid字符串
     */
    get uuid(): string;
    /**
     * 玩家的操作权限等级（0 - 4）
     */
    get permLevel(): number;
    /**
     * 玩家的游戏模式（0 - 3）
     */
    get gameMode(): number;
    /**
     * 玩家最大生命值
     */
    get maxHealth(): number;
    /**
     * 玩家当前生命值
     */
    get health(): number;
    /**
     * 玩家当前是否悬空
     */
    get inAir(): boolean;
    /**
     * 玩家当前是否在水中
     */
    get inWater(): boolean;
    /**
     * 玩家当前是否正在潜行
     */
    get sneaking(): boolean;
    /**
     * 玩家当前速度
     */
    get speed(): number;
    /**
     * 玩家当前朝向（0 - 4）
     */
    get direction(): number;

    isOP(): boolean;

    kick(msg?: string);

    disconnect(msg?: string): boolean;

    tell(msg: string, type?: number): void;

    sendText(msg: string, type?: number): void;

    runcmd(cmd: string): boolean;

    teleport(pos): boolean;
    teleport(x, y, z, dimid): boolean;

    kill(): boolean;
    hurt(damage: number): boolean;

    setOnFire(time: number): boolean;

    rename(newName: string): boolean;

    getDevice(): Device;

    getHand(): Item;
    getOffHand(): Item;

    getInventory(): Container;
    getArmor(): Container;
    getEnderChest(): Container;

    giveItem(item: Item): boolean;
    clearItem(type: string): number;

    refreshItems(): boolean;

    refreshChunks(): boolean;

    setPermLevel(level: number): number;

    setGameMode(mode: number): boolean;

    addLevel(count: number): boolean;

    transServer(server: string, port: number): boolean;

    crash(): boolean;

    setSidebar(title: string, data, sortOrder?: number): boolean;
    removeSidebar(): boolean;

    setBossBar(title: string, percent: number): boolean;
    removeBossBar(): boolean;

    getNbt(): NbtCompound;
    setNbt(nbt: NbtCompound): boolean;

    addTag(tag: string): boolean;
    removeTag(tag: string): boolean;
    hasTag(tag: string): boolean;

    getAllTags(): Array<string>;

    getAbilities(): any;

    getAttributes(): Array<any>;

    //ScoreboardObjective
    getScore(name: string): number;

    setScore(name: string, value: number): boolean;

    addScore(name: string, value: number): boolean;

    reduceScore(name: string, value: number): boolean;

    deleteScore(name: string): boolean;

    //Forms
    sendModalForm(
        title: string,
        content: string,
        button1: string,
        button2: string,
        callback: (pl: Player, id: number) => void
    ): number;

    /**
     * pl.sendSimpleForm(title,content,buttons,images,callback)
     * @param title 
     * @param content 
     * @param buttons 
     * @param images 
     * @param callback 
     * 图片路径参数 images 使用材质包路径或者URL来标识按钮对应的图标。
     * 对于表单上的每个按钮，如下设置对应的图标
     * 1. 如果使用材质包路径，图片路径应该形如 textures/items/apple
     * 2. 如果使用URL路径，那么在这里放入完整的URL即可，形如 https://www.baidu.com/img/flexible/logo/pc/result.png
     * 3. 如果这个按钮你不需要显示图片，那将对应的图片路径设置为空字符串即可
     */
    sendSimpleForm(
        title: string,
        content: string,
        buttons: Array<string>,
        images: Array<string>,
        callback: (pl: Player, id: number) => void
    ): number;

    sendCustomForm(
        json: string,
        callback: (player: Player, data: Array<any>) => void
    );

    sendForm(
        form: SimpleForm,
        callback: (pl: Player, id: number) => void
    ): number;

    sendForm(
        form: CustomForm,
        callback: (pl: Player, data: Array<any>) => void
    ): number;

    //ExtraData
    setExtraData(data_name: string, data): boolean;

    getExtraData(data_name: string);

    delExtraData(data_name: string);
}