/// <reference path = "../Class/lxl.BLock.d.ts" />
/// <reference path = "../Class/lxl.NbtCompound.d.ts" />
/// <reference path = "../Class/lxl.Player.d.ts" />
/// <reference path = "../Class/lxl.Objective.d.ts" />
/// <reference path = "../Class/lxl.Item.d.ts" />
/// <reference path = "../Class/lxl.IntPos.d.ts" />
/// <reference path = "../Class/lxl.Form.d.ts" />
/// <reference path = "../Class/lxl.Form.d.ts" />
/// <reference path = "../Class/lxl.Entity.d.ts" />

/**
 * mc通用接口
 */
declare class mc {
    //Pos
    /**
    * 生成一个整数类型坐标对象
    * @param {number} x x 坐标
    * @param {number} y y 坐标
    * @param {number} z z 坐标
    * @param {number} dimid  维度ID：0 代表主世界，1 代表下界，2 代表末地
    * @returns {IntPos} 整数坐标对象
    */
    static newIntPos(x: number, y: number, z: number, dimid: number): IntPos;
    /**
    * 生成一个浮点数坐标对象
    * @param {Float} x x 坐标
    * @param {Float} y y 坐标
    * @param {Float} z z 坐标
    * @param {number} dimid  维度ID：0 代表主世界，1 代表下界，2 代表末地
    * @returns {FloatPos} 一个浮点数坐标对象
    */
    static newFloatPos(x: number, y: number, z: number, dimid: number): FloatPos;


    //Player
    /**
    * 获取一个玩家对象
    * @param {string} info 玩家的名字或者Xuid
    * @returns {Player} 生成的玩家对象
    */
    static getPlayer(player: string): Player;
    /**
    * 获取所有在线玩家的列表
    * @returns {Array<Player>} 在线的玩家对象列表
    */
    static getOnlinePlayers(): Array<Player>;

    /**
    * 广播一个文本消息给所有玩家
    * @param {string} msg 待发送的文本
    * @param {number} type? 发送的文本消息类型，默认为0
    * @returns {boolean} 是否成功发送
    */
    static broadcast(msg: string, type?: number): boolean;

    //Item
    /**
    * 生成物品对象  
    * @param {string} name 物品的标准类型名，如`minecraft:bread`
    * @param {number} count 物品堆叠数量
    * @returns {Item} 生成的物品对象。如返回值为 `null` 则表示生成失败
    */
    static newItem(name: string, count: number): Item;
    /**
    * 生成物品对象  
    * @param {NbtCompound} nbt 生成物品对象所使用的物品NBT
    * @returns {Item} 生成的物品对象。如返回值为 `null` 则表示生成失败
    */
    static newItem(nbt: NbtCompound): Item;

    /**
     * 生成该物品对象对应的掉落物
     * @param {Item} item 要生成凋落物的物品对象
     * @param pos 生成的位置
     * @returns {Entity}
     */
    static spawnItem(item: Item, pos: FloatPos | IntPos): Entity;
    /**
     * 生成该物品对象对应的掉落物
     * @param item 要生成凋落物的物品对象
     * @param {number} x x坐标
     * @param {number} y y坐标
     * @param {number} z z坐标
     * @param {number} dimid 维度id
     */
    static spawnItem(item: Item, x: number, y: number, z: number, dimid: number): Entity;

    //Entity
    /**
    * 生成新生物并获取
    * @param {string} name 生物的命名空间名称，如 minectaft:creeper
    * @param {FloatPos} pos 生成生物的位置的坐标对象（或者使用x, y, z, dimid来确定生成位置）
    * @returns {Entity} 生成的实体对象，如返回值为 null 则表示生成失败
    */
    static spawnMob(name: string, pos: FloatPos | IntPos): Entity;
    /**
    * 生成新生物并获取
    * @param {string} name 
    * @param {Float} x 
    * @param {Float} y 
    * @param {Float} z 
    * @param {number} dimid 
    * @returns {Entity} 生成的实体对象，如返回值为 null 则表示生成失败
    */
    static spawnMob(name: string, x: number, y: number, z: number, dimid: number): Entity;

    /**
    * 在指定位置制造一次爆炸
    * @param {IntPos|FloatPos} pos 目标生成位置（或者使用x, y, z, dimid来确定方块位置）
    * @param {Entity} source 设置爆炸来源的实体对象，可以为`null
    * @param {Float} power 爆炸的威力值，影响爆炸的伤害大小和破坏范围
    * @param {Float} range 爆炸的范围半径，影响爆炸的波及范围
    * @param {boolean} isDestroy 爆炸是否破坏方块
    * @param {boolean} isFire 爆炸结束后是否留下燃烧的火焰
    * @returns {boolean} 是否成功制造爆炸
    */
    static explode(
        pos: FloatPos | IntPos,
        source: Entity,
        power: number,
        range: number,
        isDestroy: boolean,
        isFire: boolean
    ): boolean;
    /**
* 在指定位置制造一次爆炸
* @param {number} x x
* @param {number} y y
* @param {number} z z
* @param {number} dimid dimid
* @param {Entity} source 设置爆炸来源的实体对象，可以为`null
* @param {Float} power 爆炸的威力值，影响爆炸的伤害大小和破坏范围
* @param {Float} range 爆炸的范围半径，影响爆炸的波及范围
* @param {boolean} isDestroy 爆炸是否破坏方块
* @param {boolean} isFire 爆炸结束后是否留下燃烧的火焰
* @returns {boolean} 是否成功制造爆炸
*/
    static explode(
        x: number, y: number, z: number, dimid: number,
        source: Entity,
        power: number,
        range: number,
        isDestroy: boolean,
        isFire: boolean
    ): boolean;

    //Command
    /**
    * 执行一条后台命令
    * @param {string} cmd 待执行的命令
    * @returns {boolean} 是否执行成功
    */
    static runcmd(cmd: string): boolean;
    /**
    * 执行一条后台命令（强化版）
    * @param {string} cmd 指令内容
    * @returns {Object} 命令执行结果Object
    */
    static runcmdEx(cmd: string): {
        success: boolean,
        output: string
    };

    /**
    * 注册一个新的玩家命令
    * @param {string} cmd 待注册的命令
    * @param {string} description 命令描述文本
    * @param {(player:Player,args:Array@string)boolean} callback 注册的这个命令被执行时，接口自动调用的回调函数
    * @param {number} level （可选参数）命令的注册等级，默认为 0 ，即所有人都可以执行，如果设置命令注册等级为1，则只有OP可以执行此命令
    * @returns {boolean} 是否成功注册
    */
    static regPlayerCmd(
        cmd: string,
        description: string,
        callback: (pl: Player, args: Array<string>) => void,
        level?: number
    ): boolean;
    /**
    * 注册一个新的后台控制台命令
    * @param {string} cmd 待注册的命令
    * @param {string} description 命令描述文本
    * @param {(args:Array@string)boolean} callback 注册的这个命令被执行时，接口自动调用的回调函数
    * @returns {boolean} 是否成功注册
    */
    static regConsoleCmd(
        cmd: string,
        description: string,
        callback: (arg: Array<string>) => void
    ): boolean;
    /**
    * 模拟产生一个控制台命令输出
    * @param {string} output 模拟产生的命令输出
    * @returns {boolean} 是否成功执行
    */
    static sendCmdOutput(output: string): boolean;

    //Block
    /**
    * 通过方块坐标手动生成方块对象
    * 通过此函数来手动生成对象，注意，你要获取的方块必须处于已被加载的范围中，否则会出现问题
    * @param {IntPos} pos 方块坐标对象（或者使用x, y, z, dimid来确定方块位置）
    * @returns {Block|null} 如返回值为 null 则表示获取方块失败
    * 注意：不要长期保存一个方块对象
    * 当方块对象对应的方块被销毁时，对应的方块对象将变得无效。因此，如果有长期操作某个方块的需要，请通过上述途径获取实时的方块对象
    */
    static getBlock(pos: IntPos): Block;
    /**
    * 通过方块坐标手动生成方块对象
    * 通过此函数来手动生成对象，注意，你要获取的方块必须处于已被加载的范围中，否则会出现问题
    * @param {number} x 方块x坐标
    * @param {number} y 方块y坐标
    * @param {number} z 方块z坐标
    * @param {number} dimid 方块维度
    * @returns {Block|null} 如返回值为 null 则表示获取方块失败
    * 注意：不要长期保存一个方块对象
    * 当方块对象对应的方块被销毁时，对应的方块对象将变得无效。因此，如果有长期操作某个方块的需要，请通过上述途径获取实时的方块对象
    */
    static getBlock(x: number, y: number, z: number, dimid: number): Block;

    /**
    * 设置指定位置的方块
    * @param {IntPos} pos 目标方块位置
    * @param {Block|string} block 要设置成的方块对象或者方块名
    * @returns {boolean} 是否成功设置
    */
    static setBlock(pos: IntPos, block: Block | string): boolean;
    /**
    * 设置指定位置的方块
    * 通过此函数，将一个坐标对应的方块设置成另一个，类似于命令 /setblock
    * 如果使用方块名称，则方块名称须为标准类型名，且首字母大写，类似于 Stone
    * 否则，函数将执行失败
    * @param {number} x 方块x坐标
    * @param {number} y 方块y坐标
    * @param {number} z 方块z坐标
    * @param {number} dimid 方块维度
    * @param {Block|string} block 要设置成的方块对象或者方块名
    * @returns {boolean} 是否成功设置
    */
    static setBlock(
        x: number, y: number, z: number, dimid: number,
        block: Block | string
    ): boolean;

    //Particle
    /**
    * 在指定位置生成粒子效果
    * @param {FloatPos|IntPos} pos 目标方块位置
    * @param {string} type 要生成的粒子效果名称（可查阅wiki得知）
    * @returns {boolean} 是否成功生成
    */
    static spawnParticle(pos: IntPos | FloatPos, type: string): boolean;
    /**
    * 在指定位置生成粒子效果
    * @param {number} x 方块x坐标
    * @param {number} y 方块y坐标
    * @param {number} z 方块z坐标
    * @param {string} type 要生成的粒子效果名称（可查阅wiki得知）
    * @returns {boolean} 是否成功生成
    */
    static spawnParticle(
        x: number, y: number, z: number, dimid: number,
        type: string
    ): boolean;

    //Objective
    /**
     获取某个已存在的计分项
    * @param {string} name 要获取的计分项名称
    * @returns {Objective} 对应的计分项对象，如果返回null，则代表计分项不存在
    */
    static newScoreObjective(name: string, displayName: string): Objective;
    /**
    * 移除一个已存在的计分项
    * @param {string} name 计分项名称
    * @returns {boolean} 是否移除成功
    */
    static removeScoreObjective(name: string): boolean;

    /**
    * 获取某个已存在的计分项
    * @param {string} name 要获取的计分项名称
    * @returns {Objective} 对应的计分项对象，如果返回null，则代表计分项不存在
    */
    static getScoreObjective(name: string): Objective;
    /**
    * 获取所有计分项
    * @returns {Array<Objective>} 计分板系统记录的所有计分项的对象数组
    */
    static getAllScoreObjectives(): Array<Objective>;

    /**
     * mc.getDisplayObjectives(slot)
     * @param slot  String  待查询的显示槽位名称，可以为"sidebar"/"belowname"/"list"
     */
    static getDisplayObjectives(slot: string): Objective;

    /**
     * mc.clearDisplayObjective(slot)
     * @param slot  String  显示槽位名称字符串，可以为"sidebar"/"belowname"/"list"
     */
    static clearDisplayObjective(slot: string): boolean;

    //BDS

    /**
     * 获取BDS版本
     * @returns {string} 服务端版本号字符串，格式形如："v1.17.10"
     */
    static getBDSVersion(): string;

    /**
     * 设置服务器的显示名称
     * @param motd 你要设置的服务器显示名
     */
    static setMotd(motd: string): boolean;

    //Events
    static listen(event: string, callback): boolean;

    /**
    * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
    * @param {"onPreJoin"} event 玩家开始连接服务器
    * @param {(player:Player)function} callback 事件回调
    * @returns {boolean} 是否添加成功
    */
    static listen(
        event: "onPreJoin",
        callback: (player: Player) => void
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onJoin"} event 玩家进入游戏（加载世界完成）
     * @param {(player:Player)function} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onJoin",
        callback: (player: Player) => void
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onLeft"} event 玩家离开游戏
     * @param {(player:Player)function} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onLeft",
        callback: (player: Player) => void
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onRespawn"} event 玩家重生
     * @param {(player:Player)function} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onRespawn",
        callback: (player: Player) => void
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onPlayerDie"} event 玩家死亡
     * @param {(player:Player)function} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onPlayerDie",
        callback: (player: Player) => void
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onPlayerCmd"} event 玩家执行命令
     * @param {(player:Player,cmd:string)boolean} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onPlayerCmd",
        callback: (player: Player, cmd: string) => boolean
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onChat"} event 玩家发送聊天信息
     * @param {(player:Player,msg:string)boolean} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onChat",
        callback: (player: Player, msg: string) => boolean
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onChangeDim"} event 玩家切换维度
     * @param {(player:Player)function} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onChangeDim",
        callback: (player: Player) => void
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onJump"} event 玩家跳跃
     * @param {(player:Player)function} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onJump",
        callback: (player: Player) => void
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onSneak"} event 玩家切换潜行状态
     * @param {(player:Player,isSneaking:boolean)function} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onSneak",
        callback: (player: Player, isSneaking: boolean) => void
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onAttack"} event 玩家攻击实体
     * @param {(player:Player,entity:Entity)boolean} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onAttack",
        callback: (player: Player, entity: Entity) => boolean
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onUseItem"} event 玩家使用物品
     * @param {(player:Player,item:Item)boolean} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onUseItem",
        callback: (player: Player, item: Item) => boolean
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onUseItemOn"} event 玩家对方块使用物品（点击右键）
     * @param {(player:Player,item:Item,block:Block)boolean} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onUseItemOn",
        callback: (player: Player, item: Item, block: Block) => boolean
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onTakeItem"} event 玩家捡起物品
     * @param {(player:Player,entity:Entity)boolean} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event:"onTakeItem",
        callback:(player:Player,entity:Entity)=>boolean
    ): boolean

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onDropItem"} event 玩家丢出物品
     * @param {(player:Player,item:Item)boolean} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onDropItem",
        callback: (player: Player, item: Item) => boolean
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onEat"} event 玩家食用食物
     * @param {(player:Player,item:Item)function} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onEat",
        callback: (player: Player, item: Item) => void
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onStartDestroyBlock"} event 玩家开始破坏方块 / 点击左键
     * @param {(player:Player,block:Block)function} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onStartDestroyBlock",
        callback: (player: Player, block: Block) => void
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onDestroyBlock"} event 玩家破坏方块完成
     * @param {(player:Player,block:Block)boolean} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onDestroyBlock",
        callback: (player: Player, block: Block) => boolean
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onPlaceBlock"} event 玩家放置方块
     * @param {(player:Player,block:Block)boolean} callback 事件回调
     * @returns {boolean} 是否添加成功
     */
    static listen(
        event: "onPlaceBlock",
        allback: (player: Player, block: Block) => boolean
    ): boolean;

    /**
     * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
     * @param {"onOpenContainer"} event 玩家打开容器方块
     * @param {(player:Player,block:Block)boolean} callback 事件回调
     * @returns {boolean} 是否添加成功
       */
    static listen(
        event: "onOpenContainer",
        callback: (player: Player, block: Block) => boolean
    ): boolean;

    /**
    * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
    * @param {"onCloseContainer"} event 玩家关闭容器方块
    * @param {(player:Player,block:Block)boolean} callback 事件回调
    * @returns {boolean} 是否添加成功
    */
    static listen(
        event: "onCloseContainer",
        callback: (player: Player, block: Block) => boolean
    ): boolean;

    /**
    * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
    * @param {"onInventoryChange"} event 玩家物品栏变化
    * @param {(player:Player,slotNum:number,oldItem:Item,newItem:Item)function} callback 事件回调
    * @returns {boolean} 是否添加成功
    */
    static listen(
        event: "onInventoryChange",
        callback: (player: Player, slotNum: number, oldItem: Item, newItem: Item) => void
    ): boolean;

    /**
    * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
    * @param {"onMove"} event 玩家移动
    * @param {(player:Player,pos:FloatPos)function} callback 事件回调
    * @returns {boolean} 是否添加成功
    */
    static listen(
        event: "onMove",
        callback: (player: Player, pos: FloatPos) => void
    ): boolean;

    /**
    * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
    * @param {"onSetArmor"} event 玩家改变盔甲栏
    * @param {(player:Player,slotNum:number,item:Item)function} callback 事件回调
    * @returns {boolean} 是否添加成功
    */
    static listen(
        event: "onSetArmor",
        callback: (player: Player, slotNum: number, item: Item) => void
    ): boolean;

    /**
    * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
    * @param {"onUseRespawnAnchor"} event 玩家使用重生锚
    * @param {(player:Player,pos:IntPos)boolean} callback 事件回调
    * @returns {boolean} 是否添加成功
    */
    static listen(
        event: "onUseRespawnAnchor",
        callback: (player: Player, pos: IntPos) => boolean
    ): boolean;

    /**
    * 新增监听器
    拦截事件
    在LXL的事件监听系统中，一般你可以通过return false来拦截某个可以被拦截的事件。拦截事件意味着在脚本拦截之后BDS将不再处理这个事件，就像他从没发生过一样。
    举例：拦截某条聊天事件，会造成所有人都看不到这条聊天消息
    不过，拦截事件仅对BDS有效。
    也就是说，拦截事件并不影响其他有对应监听的LXL脚本处理这个事件，只是BDS无法再接收到它。
    避开误区
    有些时候，在某些事件监听内部调用特定的API会造成死循环崩服，请务必避免这些情况的发生
    举例：在onConsoleCmd事件监听中调用mc.runcmd(Ex)系列函数执行后台指令，将导致死循环
    * @param {"onOpenContainerScreen"} event 玩家打开容器类GUI
    * @param {(player:Player)boolean} callback 事件回调
    * @returns {boolean} 是否添加成功
    */
    static listen(
        event: "onOpenContainerScreen",
        callback: (player: Player) => boolean
    ): boolean;

    //Forms
    /**
     * 创建一个简单表单对象
     * @returns {SimpleForm}
     */
    static newSimpleForm(): SimpleForm;
    /**
     * 创建一个自定义表单对象
     * @returns {CustomForm}
     */
    static newCustomForm(): CustomForm;
}