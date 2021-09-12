var ILAPI_PosGetLand: Function;
var ILAPI_GetOwer: Function;
mc.listen("onServerStarted", () => {
    ILAPI_PosGetLand = lxl.import("ILAPI_PosGetLand");
    ILAPI_GetOwer = lxl.import("ILAPI_GetOwner");
    init();
    updateShopList();
});

var DEBUG: boolean = false;

var Version = "0.1.2";

var Dir = "./Plugins/PlayerShop/"

var Config: Configuration;

var ShopPosList = new Array<IntPos>();

function init() {
    log("[FantasyChestShop] =========================");
    log("[FantasyChestShop] FantasyChestShop v" + Version);
    log("[FantasyChestShop] Plugin loaded");
    log("[FantasyChestShop] 作者：PeterXiong720");

    if (!file.exists(Dir)) {
        file.mkdir(Dir);
    }
    if (!file.exists(Dir + "Config.json")) {
        log("[FantasyChestShop] 未找到配置文件，正在创建...");
        Config = new Configuration();
        DataHelper.SaveData();
        log("[FantasyChestShop] 已创建配置文件：" + Dir + "Config.json");
    } else {
        Config = new Configuration(JSON.parse(file.readFrom(Dir + "Config.json")));
        log("[FantasyChestShop] 已加载配置文件：" + Dir + "Config.json");
    }

    log("[FantasyChestShop] =========================");
}

function updateShopList() {
    ShopPosList = new Array<IntPos>();
    Config.ShopData.forEach(shop => {
        if (shop != null) {
            let pos = mc.newIntPos(
                shop.Pos.x,
                shop.Pos.y,
                shop.Pos.z,
                shop.Pos.dimid
            );
            ShopPosList.push(pos);
        }
    });
}

function RemoveShop(pos: IntPos): boolean {
    let tempPos = {
        x: pos.x,
        y: pos.y,
        z: pos.z,
        dimid: pos.dimid,
    };

    let removeStrShopPos = function (shop: PlayerShopData) {
        let Shopkeeper = Config.ShopKeepers.get(shop.Shopkeeper);
        if (Shopkeeper != undefined) {
            let str_blkPos = pos.x + " " +
                pos.y + " " +
                pos.z + " " +
                pos.dimid;
            for (let j = 0; j < Shopkeeper.length; j++) {
                let str_shopPos = Shopkeeper[j];
                if (str_blkPos == str_shopPos) {
                    Shopkeeper.splice(j, 1);
                }
            }
        }
    }

    for (let index = 0; index < Config.ShopData.length; index++) {
        let shop = Config.ShopData[index];
        if (shop != null) {
            if (JSON.stringify(shop.Pos) == JSON.stringify(tempPos)) {
                removeStrShopPos(shop);
                Config.ShopData.splice(index, 1);

                DataHelper.SaveData();
                return true;
            }
        }
    }
    return false;
}

function AddMoney(xuid: string, _money: number): boolean {
    if (_money < 0) {
        return false;
    }
    if (Config.Money == "LLMoney") {
        return money.add(xuid, _money);
    } else {
        let player = mc.getPlayer(xuid);
        if (player != undefined) {
            return player.addScore(Config.Money, _money);
        } else {
            return false;
        }
    }
}

function ReduceMoney(player: Player, _money: number): boolean {
    if (Config.Money == "LLMoney") {
        if (money.get(player.xuid) >= _money) {
            return money.reduce(player.xuid, _money);
        } else {
            return false;
        }
    } else {
        if (player.getScore(Config.Money) >= _money) {
            return player.setScore(Config.Money, player.getScore(Config.Money) - _money);
        } else {
            return false;
        }
    }
}

function GetMoney(player: Player): number {
    if (Config.Money == "LLMoney") {
        return money.get(player.xuid);
    } else {
        return player.getScore(Config.Money);
    }
}

/**
 * 注册指令 
 * ============================================================
 */

mc.regPlayerCmd("playershop add", "添加一个玩家商店", (player, args) => {
    let blockPos = mc.newIntPos(
        player.blockPos.x,
        player.blockPos.y - 1,
        player.blockPos.z,
        player.blockPos.dimid
    );
    let block = mc.getBlock(blockPos);
    if (!block.hasContainer()) {
        player.tell("请站在一个容器方块上执行这条指令");
        //mc.sendCmdOutput("请站在一个容器方块上执行这条指令");
        return;
    }
    let chest = block.getContainer();
    if (chest.size > 27) {
        player.tell("目前暂不支持大箱子");
        //mc.sendCmdOutput("目前暂不支持大箱子");
        return;
    }

    /*
    log(chest.size);
    //*/

    let land = ILAPI_PosGetLand({
        x: blockPos.x,
        y: blockPos.y,
        z: blockPos.z,
        dimid: blockPos.dimid
    });
    if (ILAPI_GetOwer(land) != player.xuid && !player.isOP()) {
        player.tell("只能在你拥有的领地内创建商店，若没有领地可以使用 /land new 新建一个");
        //mc.sendCmdOutput("只能在你拥有的领地内创建商店");
        return;
    }
    let shop = new AddShopForm(player, chest);
    shop.Display();
});

mc.regPlayerCmd("playershop", "打开玩家商店", (player, args) => {
    if (Config.ShopData.length > 0) {
        let form = mc.newSimpleForm();
        form = form.setTitle(Format.Bold + Format.DarkAqua + "所有玩家商店");
        form = form.setContent(Format.Aqua + "注： 排名不分先后");
        Config.ShopData.forEach((value: PlayerShopData) => {
            let shopkeeper = mc.getPlayer(value.Shopkeeper).name;
            let shopName = value.Name;
            let pos = value.Pos.x + "-" +
                value.Pos.y + "-" +
                value.Pos.z + "-" +
                value.Pos.dimid;
            form = form.addButton(
                "§f[" + Format.DarkAqua + shopkeeper + "§f]" +
                Format.Yellow + shopName +
                "§r(" + Format.Red + Format.Italics + pos + "§r)"
            );
        });

        let CallBack = function (pl: Player, id: number) {
            /*
            log(id);
            //*/
            if (id != undefined) {
                let shop = Config.ShopData[id];
                let pos = mc.newIntPos(shop.Pos.x, shop.Pos.y, shop.Pos.z, shop.Pos.dimid);
                let MainForm = new ShopMain(pl, pos);
                MainForm.Display();
            }
        }

        player.sendForm(form, CallBack);
    }
});

mc.regPlayerCmd("playershop remove", "管理员强制移除一个玩家商店", (player, args) => {

    if (player.isOP()) { //确保万无一失

        let blockPos = mc.newIntPos(
            player.blockPos.x,
            player.blockPos.y - 1,
            player.blockPos.z,
            player.blockPos.dimid
        );
        if (RemoveShop(blockPos)) { //执行移除
            player.tell("移除成功");
        } else {
            player.tell("移除失败");
        }
    }
}, 1);

mc.regPlayerCmd("playershop list", "列出所有玩家商店", (player, args) => {

    player.tell("商店列表如下：");
    Config.ShopKeepers.forEach((shops, pl) => {

        player.tell(mc.getPlayer(pl).name + "：");
        shops?.forEach(_pos => {
            player.tell("    " + _pos + "，");
        });
    });
}, 1);

/**
 * 监听事件
 * ============================================================
 */
mc.listen("onOpenContainer", (player, block) => {
    let result: boolean = true;
    if (Config.ShopKeepers.has(player.xuid)) {
        let blkPos = block.pos.x + " " +
            block.pos.y + " " +
            block.pos.z + " " +
            block.pos.dimid;
        let shopkeeper = Config.ShopKeepers.get(player.xuid);
        if (shopkeeper != undefined) {
            for (let index = 0; index < shopkeeper.length; index++) {
                let shopPos = shopkeeper[index];
                if (shopPos == blkPos) {
                    /*
                    player.tell("店主");
                    //*/
                    let backstage = new ShopBackstageManagementForm(player, block);
                    backstage.Display();
                    return false;
                }
            }
        }
    }
    let tempPos = {
        x: block.pos.x,
        y: block.pos.y,
        z: block.pos.z,
        dimid: block.pos.dimid,
    };
    Config.ShopData.forEach((_shop) => {
        /*
        log(tempPos,"\t",_shop.Pos)
        //*/
        if (JSON.stringify(_shop.Pos) == JSON.stringify(tempPos)) {
            // let MainForm = new ShopMain(player, block.pos);
            // MainForm.Display();
            if (player.isOP()) {
                player.sendSimpleForm(
                    Format.Bold + Format.DarkAqua + "箱子商店",
                    "Choose...",
                    ["进入商店", "进入后台"],
                    ["", ""],
                    (pl: Player, id: number) => {
                        if (id != undefined) {
                            switch (id) {
                                case 0:
                                    let MainForm = new ShopMain(player, block.pos);
                                    MainForm.Display();
                                    break;
                                case 1:
                                    let Backstage = new ShopBackstageManagementForm(player, block);
                                    Backstage.Display();
                                    break;
                            }
                        }
                    }
                )
            } else {
                let MainForm = new ShopMain(player, block.pos);
                MainForm.Display();
            }
            result = false;
        }
    });
    return result;
});

mc.listen("onDestroyBlock", (player: Player, block: Block) => {
    let result: boolean = true;
    let tempPos = {
        x: block.pos.x,
        y: block.pos.y,
        z: block.pos.z,
        dimid: block.pos.dimid,
    };
    Config.ShopData.forEach((_shop) => {
        if (JSON.stringify(_shop.Pos) == JSON.stringify(tempPos)) {
            player.sendModalForm("警告", "请不要破坏一个未删除的箱子商店，如果需要破坏请先删除它！", "确定", "取消", (pl, id) => { });
            result = false;
        }
    });
    return result;
});
/*
log(ShopPosList);
//*/
mc.listen("onHopperSearchItem", (pos: FloatPos) => {
    let result = true;
    for (let index = 0; index < ShopPosList.length; index++) {
        let shopPos = ShopPosList[index];
        /*
        log("pos: ", pos, "\tshopPos: ", shopPos);
        //*/
        if (
            pos.x > (shopPos.x - 1) && pos.x < (shopPos.x + 1) &&
            pos.y > (shopPos.y - 2) && pos.y < (shopPos.y + 2) &&
            pos.z > (shopPos.z - 1) && pos.z < (shopPos.z + 1) &&
            pos.dimid == shopPos.dimid
        ) {
            result = false;
        }
    }
    return result;
});

mc.listen("onPistonPush", (pistonPos: IntPos, block: Block) => {
    for (let index = 0; index < ShopPosList.length; index++) {
        let shopPos = ShopPosList[index];
        if (
            block.pos.x == shopPos.x &&
            block.pos.y == shopPos.y &&
            block.pos.z == shopPos.z &&
            block.pos.dimid == shopPos.dimid
        ) {
            return false;
        }
    }
});


/**
 * 类
 * ============================================================
 */

/**
 * Config
 */
class Configuration {
    private dataHelper = new DataHelper();

    ShopData: Array<PlayerShopData>;
    Money: string;
    Reg: number;
    TaxRate: number;
    ShopKeepers: Map<string, Array<string>>;

    constructor(config?: any) {
        if (config == undefined) {
            this.Money = "LLMoney";
            this.Reg = 0;
            this.TaxRate = 0;
            this.ShopKeepers = new Map<string, Array<string>>();
        } else {
            this.Money = (config.Money == undefined) ? "LLMoney" : config.Money;
            this.Reg = (config.Reg == undefined) ? 0 : config.Reg;
            this.TaxRate = (config.TaxRate == undefined) ? 0.1 : config.TaxRate;
            if (this.TaxRate < 0 || this.TaxRate >= 1) {
                this.TaxRate = 0.1;
            }
            if (config.ShopKeepers != undefined) {
                this.ShopKeepers = new Map<string, Array<string>>(Object.entries(config.ShopKeepers));
            } else {
                this.ShopKeepers = new Map<string, Array<string>>();
            }
        }
        this.ShopData = this.dataHelper.ShopData;
    }
}

/**
 * DataHlper
 */
class DataHelper {
    private path = Dir + "data.json";

    public ShopData: Array<PlayerShopData>;

    static SaveData() {
        let temp: { [k: string]: any } = {};
        Config.ShopKeepers.forEach((plshop, xuid) => {
            temp[xuid] = plshop;
        });
        let data = {
            Money: Config.Money,
            Reg: Config.Reg,
            TaxRate: Config.TaxRate,
            ShopKeepers: temp

        };
        file.writeTo(Dir + "Config.json", JSON.stringify(data, undefined, 4));
        file.writeTo(Dir + "data.json", JSON.stringify(Config.ShopData, undefined, (DEBUG) ? 4 : 0));
        updateShopList();
    }

    constructor() {
        if (!file.exists(this.path)) {
            this.ShopData = new Array();
        } else {
            this.ShopData = JSON.parse(file.readFrom(this.path));
        }
    }
}

/**
 * 商品
 */
class Commodity {
    constructor(name: string, index: number, price: number, nbt: any, snbt: string) {
        this.DisplayName = name;
        this.Index = index;
        this.Price = price;
        this.Nbt = nbt;
        this.Snbt = snbt;
    }

    public DisplayName!: string;
    public Index: number;
    public Price: number;
    public Nbt: any;
    public Snbt: string;
}

/**
 * 玩家商店数据结构
 */
class PlayerShopData {

    public Name!: string;

    public Shopkeeper!: string;

    public Turnover!: number;

    public TotalSales!: number;

    public Pos!: {
        x: number,
        y: number,
        z: number,
        dimid: number
    };

    public Goods = new Array<Commodity>();
}

/**
 * 购买主页
 */
class ShopMain {
    private Player: Player;
    private Form: SimpleForm;
    private Shop: PlayerShopData | undefined;

    public static Shops: Map<string, PlayerShopData> = new Map<string, PlayerShopData>();

    constructor(player: Player, shopPos: IntPos) {
        this.Player = player;
        this.Form = mc.newSimpleForm();
        let tempPos = {
            x: shopPos.x,
            y: shopPos.y,
            z: shopPos.z,
            dimid: shopPos.dimid,
        };
        Config.ShopData.forEach((_shop) => {
            /*
            log(_shop.Pos, "，", tempPos);
            //*/
            if (JSON.stringify(_shop.Pos) == JSON.stringify(tempPos)) {
                this.Shop = _shop;
                ShopMain.Shops.set(this.Player.xuid, this.Shop);
            }
        });
    }

    private GuiHelper(): boolean {
        if (this.Shop != undefined) {
            this.Form = this.Form.setTitle(this.Shop.Name);
            if (this.Shop.Goods.length > 0) {
                this.Form = this.Form.setContent(
                    Format.Bold + Format.Aqua + "欢迎光临！" +
                    /*"\n您当前余额为：" + Format.MinecoinGold + money.get(this.Player.xuid)*/
                    "\n您当前余额为：" + Format.MinecoinGold + GetMoney(this.Player)
                );
                this.Shop.Goods.forEach((comm: Commodity) => {
                    let name = comm.DisplayName;
                    this.Form = this.Form.addButton(Format.Bold + name);
                });
                return true;
            } else {
                this.Form = this.Form.setContent(
                    Format.Bold + Format.Aqua + "欢迎光临！" +
                    "\n您当前余额为：" + Format.MinecoinGold + GetMoney(this.Player) +
                    Format.Bold + Format.Red + "\n全部商品已售罄，赶快提醒店主补货吧！"
                );
                this.Form = this.Form.addButton(
                    "I just wanna tell you how I felling",
                    "https://img.wenhairu.com/images/2021/09/12/G4sGd.th.jpg"
                );
                this.Form = this.Form.addButton(
                    "Gotta make you understand",
                    "https://img.wenhairu.com/images/2021/09/12/G424H.th.jpg"
                );
                this.Form = this.Form.addButton(
                    "Never gonna give you up\nNaver gonna let you down",
                    "https://img.wenhairu.com/images/2021/09/11/G4geA.th.jpg"
                );
                this.Form = this.Form.addButton(
                    "Never gonna run around and desert you",
                    "https://img.wenhairu.com/images/2021/09/12/G4iAf.th.jpg"
                );
                return false;
            }
        }
        return false;
    }

    public static GuiCallBack(player: Player, id: number) {
        /*
        log(id);
        //*/
        if (id != null) {
            let checkout = new CheckoutForm(player, id);
            checkout.Display();
        }
    }

    public Display() {
        if (this.GuiHelper()) {
            this.Player.sendForm(this.Form, ShopMain.GuiCallBack);
        } else {
            if (this.Shop != undefined) {
                let pl = this.Player;
                setTimeout(() => {
                    pl.sendForm(this.Form, (pl, id) => { });
                }, 200);
            }
        }
    }
}

/**
 * 结算页面
 */
class CheckoutForm {
    private Player: Player;
    private PlayerChoose: number;
    private Form: CustomForm;

    private static Commodity: Map<string, Commodity> = new Map<string, Commodity>();

    constructor(player: Player, cho: number) {
        this.Player = player;
        this.PlayerChoose = cho;
        this.Form = mc.newCustomForm();
    }

    private GuiHelper(): boolean {
        let shop = ShopMain.Shops.get(this.Player.xuid);
        if (shop != undefined) {
            let conta = mc.getBlock(mc.newIntPos(
                shop.Pos.x,
                shop.Pos.y,
                shop.Pos.z,
                shop.Pos.dimid,
            )).getContainer();
            let commodity: Commodity = shop.Goods[this.PlayerChoose];
            let item = conta.getItem(commodity.Index);
            if (item.isNull()) {
                this.Player.sendSimpleForm(
                    "错误", "呜呜~ 商品不存在，可能已经售罄了。\n赶快提醒店主补货吧！",
                    ["确定"],
                    ["https://img.wenhairu.com/images/2021/09/11/G4geA.th.jpg"],
                    (pl, id) => { }
                );
                return false;
            }
            CheckoutForm.Commodity.set(this.Player.xuid, commodity);

            this.Form = this.Form.setTitle(Format.DarkAqua + "结账");
            this.Form = this.Form.addLabel(
                Format.Aqua + "当前余额§r：" +
                Format.MinecoinGold +
                /*money.get(this.Player.xuid) + "金币"*/
                GetMoney(this.Player) + "金币"
            );
            this.Form = this.Form.addLabel(
                "商品名称：" + commodity.DisplayName +
                "\n商品单价：" + commodity.Price +
                "\n商品库存：" + item.getNbt().getData("Count") +
                "\n商品NBT：" + item.getNbt().toString()
            );
            this.Form = this.Form.addSlider(
                "购买数量",
                0,
                item.getNbt().getData("Count"),
                1,
                1
            );
            return true;
        } else {
            return false;
        }
    }

    public static GuiCallback(player: Player, data: Array<any>) {
        /*
        log(data);
        //*/
        let shop = ShopMain.Shops.get(player.xuid);
        let commodity = CheckoutForm.Commodity.get(player.xuid);
        if (shop != undefined && commodity != undefined && data != null) {
            let conta = mc.getBlock(mc.newIntPos(
                shop.Pos.x,
                shop.Pos.y,
                shop.Pos.z,
                shop.Pos.dimid,
            )).getContainer();
            let item = conta.getItem(commodity.Index);
            let total_price = commodity.Price * Number(data[2]);

            //if (money.get(player.xuid) < total_price) {
            if (GetMoney(player) < total_price) {
                player.sendModalForm("错误", "余额不足，交易失败。", "确定", "取消", (pl, id) => { });
                return;
            }
            /*收付款*/
            let after_tax_money = (total_price * (1 - Config.TaxRate));//税后款
            after_tax_money = Math.round(after_tax_money);//四舍五入取整
            let rdMoney = ReduceMoney(player, total_price);
            let addMoney = AddMoney(shop.Shopkeeper, after_tax_money);
            if (!addMoney && player.xuid != shop.Shopkeeper) {//加钱失败，退还买主
                AddMoney(player.xuid, total_price);
                if (Config.Money == "LLMoney") {
                    player.sendModalForm("错误", "店主收款失败，交易无法继续。", "确定", "取消", (pl, id) => { });
                } else {
                    player.sendModalForm("错误", "店主收款失败，或者店主不在线，交易无法继续。", "确定", "取消", (pl, id) => { });
                }
                return;
            }
            let result: boolean = (rdMoney == true && addMoney == true) ? true : false;
            if (result) {
                let newNbt = item.getNbt();
                // let newNbt = NBT.createTag(NBT.Compound, item.getNbt());
                newNbt = newNbt.setByte("Count", Number(data[2]));
                let newItem = mc.newItem(newNbt);
                player.giveItem(newItem);
                newNbt.destroy();

                item.setNbt(item.getNbt().setByte("Count", item.getNbt().getData("Count") - Number(data[2])));
                //如果商品售罄就删除
                if (item.getNbt().getData("Count") == 0) {
                    item.setNull();
                    let delIndex: number | undefined;
                    shop.Goods.forEach((value: Commodity, index: number) => {
                        if (value.Index === commodity?.Index) {
                            delIndex = index;
                        }
                    });
                    if (delIndex != undefined) {
                        //log(delIndex, "    ", shop.Goods[delIndex]);
                        shop.Goods.splice(delIndex, 1);
                    }
                }
                //更新商店和商品信息
                shop.Turnover += after_tax_money;
                shop.TotalSales += 1;
                commodity.Nbt.Count -= Number(data[2]);
                //保存数据
                DataHelper.SaveData();
                //发送“交易成功”对话框
                player.sendSimpleForm("成功", "交易完成。", ["确定"], [""], (pl, id) => { });
            }
        }
        ShopMain.Shops.delete(player.xuid);
        CheckoutForm.Commodity.delete(player.xuid);
    }

    public Display() {
        if (this.GuiHelper()) {
            this.Player.sendForm(this.Form, CheckoutForm.GuiCallback);
        }
    }
}

/**
 * 添加玩家商店
 */
class AddShopForm {
    private Player: Player;
    private Form: CustomForm;
    private Items: Map<number, Item>;
    //private Chest: Container;

    private static FormData = new Map<string, any>();

    constructor(player: Player, chest: Container) {
        this.Player = player;
        //this.Chest = chest;
        this.Form = mc.newCustomForm();

        this.Items = new Map<number, Item>();
        for (let i = 0; i < chest.size; i++) {
            if (!chest.getItem(i).isNull()) {
                //this.Items.push(chest.getItem(i));
                this.Items.set(i, chest.getItem(i));
            }
        }
    }

    private GuiHelper() {
        this.Form = this.Form.setTitle("设置玩家商店");
        this.Form = this.Form.addLabel(
            "注册这个小店您需要支付" +
            Config.Reg + "金币。\n当前存款：" +
            // money.get(this.Player.xuid) + "金币"
            GetMoney(this.Player) + "金币"
        );

        this.Items.forEach((item) => {
            this.Form = this.Form.addLabel(
                "\n物品名称：" + item.name +
                "\n物品数量：" + item.count +
                "\n物品数据：" + item.getNbt().toString()
            );
            this.Form = this.Form.addInput("输入单价：", "物品单价");
        });
        AddShopForm.FormData.set(this.Player.xuid, this.Items);
    }

    private static GuiCallback(player: Player, data: Array<any>) {
        /*
        log(data);
        //*/
        if (data != null) {
            let shop = new PlayerShopData();
            shop.Name = Format.Bold + Format.Yellow + player.name + Format.Clear + "的小店";
            shop.Shopkeeper = player.xuid;
            shop.Turnover = 0;
            shop.TotalSales = 0;
            shop.Pos = {
                x: player.blockPos.x,
                y: player.blockPos.y - 1,
                z: player.blockPos.z,
                dimid: player.blockPos.dimid,
            };
            Config.ShopData.forEach((_Shop) => {
                if (_Shop.Pos == shop.Pos) {
                    player.sendModalForm("错误", "商店已存在", "确定", "取消", (pl, id) => { });
                    return;
                }
            });

            let Items: Map<number, Item> = AddShopForm.FormData.get(player.xuid);
            AddShopForm.FormData.delete(player.xuid);
            let index = 0;

            for (let i = 2; i < data.length; i += 2) {
                let input = data[i];
                /*
                log(i);
                log(input);
                //*/
                let price: number;
                if (input == "") {
                    player.sendModalForm("错误", "价格不能留空", "确定", "取消", (pl, id) => { });
                    return;
                }
                try {
                    price = Number(input);
                } catch {
                    player.sendModalForm("错误", "价格只允许整数", "确定", "取消", (pl, id) => { });
                    return;
                }
                /*
                log(price);
                //*/

                if (price == undefined || price < 0 || !Number.isInteger(price)) {
                    player.sendModalForm("错误", "价格不能留空，且只允许大于零的整数", "确定", "取消", (pl, id) => { });
                    return;
                }
                let item = Items.get(index);
                let commodity = new Commodity(
                    item!.name,
                    index,
                    price,
                    item!.getNbt().toObject(),
                    item!.getNbt().toSNBT()
                );
                shop.Goods.push(commodity);
                index++;
            }

            if (!ReduceMoney(player, Config.Reg)) {
                player.sendModalForm("错误", "创建失败", "确定", "取消", (pl, id) => { });
                return;
            }
            Config.ShopData.push(shop);
            if (Config.ShopKeepers.has(player.xuid)) {
                Config.ShopKeepers.get(player.xuid)?.push(
                    shop.Pos.x + " " +
                    shop.Pos.y + " " +
                    shop.Pos.z + " " +
                    shop.Pos.dimid
                );
            } else {
                Config.ShopKeepers.set(player.xuid, new Array<string>());
                Config.ShopKeepers.get(player.xuid)?.push(
                    shop.Pos.x + " " +
                    shop.Pos.y + " " +
                    shop.Pos.z + " " +
                    shop.Pos.dimid
                );
            }
            /*
            log(Config.ShopKeepers.toString());
            //*/
            DataHelper.SaveData();
            player.sendModalForm("成功", "您的新商店已成功注册", "确定", "取消", (pl, id) => { });
        }
    }

    public Display() {
        let isExist: boolean = false;
        if (Config.ShopKeepers.has(this.Player.xuid)) {
            let blkPos = this.Player.blockPos.x + " " +
                (this.Player.blockPos.y - 1) + " " +
                this.Player.blockPos.z + " " +
                this.Player.blockPos.dimid;

            Config.ShopKeepers.get(this.Player.xuid)?.forEach((shopPos) => {
                if (shopPos == blkPos) {
                    this.Player.sendModalForm("错误", "不能重复注册", "确定", "取消", (pl, id) => { });
                    isExist = true;
                }
            });
        }
        if (!isExist) {
            this.GuiHelper();
            if (this.Form != null) {
                this.Player.sendForm(this.Form, AddShopForm.GuiCallback);
            }
        }
    }
}

/**
 * 玩家商店后台页面
 */
class ShopBackstageManagementForm {
    public Player: Player;
    private Chest: Block;
    private Shop!: PlayerShopData;

    private static Instances: Map<string, ShopBackstageManagementForm> = new Map();
    private static FormData: Map<string, any> = new Map();

    constructor(player: Player, block: Block) {
        this.Player = player;
        this.Chest = block;

        let tempPos = {
            x: block.pos.x,
            y: block.pos.y,
            z: block.pos.z,
            dimid: block.pos.dimid,
        };
        Config.ShopData.forEach((_shop) => {
            if (JSON.stringify(_shop.Pos) == JSON.stringify(tempPos)) {
                this.Shop = _shop;
            }
        });

        ShopBackstageManagementForm.Instances.set(this.Player.xuid, this);
    }

    private MainForm(): SimpleForm {
        let form = mc.newSimpleForm();
        form = form.setTitle(Format.Green + "§l商店后台");
        form = form.setContent(
            "§l§b商店信息§r：" +
            "\n§l店主：  §e" + mc.getPlayer(this.Shop.Shopkeeper).name +
            "\n§r§l商店名称：  §e" + this.Shop.Name +
            "\n§r§l税后营收：  §e" + this.Shop.Turnover + "§f(税率：" + Config.TaxRate + ")" +
            "\n§r§l总成交数：  §e" + this.Shop.TotalSales +
            "\n"
        );
        form = form.addButton("进入商店", "textures/items/apple_golden");
        form = form.addButton("上架商品", "textures/ui/share_apple");
        form = form.addButton("编辑商品", "textures/ui/debug_glyph_color");
        form = form.addButton("编辑商店信息", "textures/ui/creative_icon.png");
        form = form.addButton("卷款跑路", "textures/ui/crossout");

        return form;
    }

    private static Main(player: Player, id: number) {
        let Instance = ShopBackstageManagementForm.Instances.get(player.xuid);
        switch (id) {
            case 0:
                //进入商店
                let chest = Instance?.Chest;
                if (chest != undefined) {
                    let MainForm = new ShopMain(player, chest.pos);
                    MainForm.Display();
                }
                break;
            case 1:
                //上架商品
                if (Instance != undefined) {
                    Instance.Player = player;
                    let form = Instance.AddItemForm();
                    if (form != undefined) {
                        player.sendForm(form, ShopBackstageManagementForm.AddItem);
                    } else {
                        player.sendModalForm("错误", "手上没有物品物品！", "返回", "取消", (pl, id) => {
                            if (id != null && id == 1) {
                                Instance?.Display();
                            }
                        });
                    }
                }
                break;
            case 2:
                //编辑商品
                if (Instance != undefined) {
                    Instance.Player = player;
                    player.sendForm(Instance.EditItemMainForm(), ShopBackstageManagementForm.EditItemMain);
                    /*
                    player.sendModalForm("阿巴阿巴阿巴阿巴", "尽情期待", "返回", "取消", (pl, id) => {
                        if (id != null && id == 1) {
                            Instance?.Display();
                        }
                    });
                    //*/
                }
                break;
            case 3:
                //编辑商店信息
                if (Instance != undefined) {
                    Instance.Player = player;
                    player.sendForm(Instance.EditShopInfoForm(), ShopBackstageManagementForm.EditShopInfo);
                    /*
                    player.sendModalForm("阿巴阿巴阿巴阿巴", "尽情期待", "返回", "取消", (pl, id) => {
                        if (id != null && id == 1) {
                            Instance?.Display();
                        }
                    });
                    //*/
                }
                break;
            case 4:
                //卷款跑路
                player.sendModalForm(
                    "删除商店",
                    "您确定要删除这个商店的所有数据吗？（不可恢复）\n温馨提醒：商店注册费用将不会退还，箱子中剩余物品不会清除。",
                    "确定跑路",
                    "我点错了",
                    (pl: Player, id: number) => {
                        let chest = Instance?.Chest;
                        if (id != null && chest != undefined) {
                            if (id == 1) {
                                if (RemoveShop(chest.pos)) {
                                    pl.tell("删除成功");
                                }
                            } else {
                                pl.tell("已取消");
                            }
                        }
                    }
                );
                break;
        }
    }

    private AddItemForm(): CustomForm | undefined {
        let form = mc.newCustomForm();
        let container = this.Chest.getContainer();
        let item = this.Player.getHand();

        if (item.isNull()) {
            return;
        }

        form = form.setTitle("§l上架商品");
        form = form.addLabel(Format.Gray + "=================" + "§r§l上架手中的物品§r" + Format.Gray + "================");
        form = form.addLabel(
            "物品名称： " + item.name +
            "\n物品数量： " + item.count +
            "\n物品数据： " + item.getNbt().toString()
        );
        form = form.addInput("商品显示名称：", "购买页面显示的名称", item.name);
        form = form.addInput("商品价格：", "输入商品价格");

        let items: Array<string> = new Array();
        let _data: { [k: number]: number } = {};
        for (let index = 0; index < container.size; index++) {
            let it = container.getItem(index);
            if (it.isNull()) {
                let temp = items.push("格子" + (index + 1));
                let key = temp - 1;
                _data[key] = index;
            }
        }
        form = form.addDropdown("选择一个空的格子", items);
        ShopBackstageManagementForm.FormData.set(this.Player.xuid, _data);

        return form;
    }

    private static AddItem(player: Player, data: Array<any>) {
        /*
        player.tell(data.toString());
        log(data);
        //*/
        let Instance = ShopBackstageManagementForm.Instances.get(player.xuid);
        if (Instance != undefined && data != null) {
            let Item = player.getHand();
            let temp: { [k: number]: number } = ShopBackstageManagementForm.FormData.get(player.xuid);

            let index = temp[Number(data[4])];
            let name = data[2];
            let price = Number(data[3]);
            let nbt = Item.getNbt();
            let snbt = nbt.toSNBT();
            if (data[3] == undefined || price <= 0 || !Number.isInteger(price)) {
                player.sendModalForm("错误", "价格不能留空，且只允许大于零的整数", "确定", "取消", (pl, id) => { });
                return;
            }

            let commodity = new Commodity(name, index, price, nbt, snbt);
            let container = Instance.Chest.getContainer();

            if (container.hasRoomFor(Item)) {
                let tempItem = container.getItem(index);
                if (tempItem.set(Item)) {
                    Instance.Shop.Goods.push(commodity);
                    Item.setNull();
                    player.refreshItems();

                    player.sendModalForm("成功", "商品添加成功！", "返回", "取消", (pl, id) => {
                        if (id != null && id == 1) {
                            Instance?.Display();
                        }
                    });
                    DataHelper.SaveData();
                } else {
                    player.sendModalForm("错误", "商品添加失败！\n未知原因", "返回", "取消", (pl, id) => {
                        if (id != null && id == 1) {
                            Instance?.Display();
                        }
                    });
                }
            } else {
                player.sendModalForm("错误", "商品添加失败！\n当前箱子没有足够的空间", "确定", "取消", (pl, id) => {
                    if (id != null && id == 1) {
                        Instance?.Display();
                    }
                });
            }
        }
    }

    private EditItemMainForm(): SimpleForm {
        let form = mc.newSimpleForm();
        if (this.Shop != undefined && this.Shop.Goods.length > 0) {
            form = form.setTitle("§l编辑商品");
            form = form.setContent(
                Format.Bold + Format.Aqua + "全部商品："
            );
            this.Shop.Goods.forEach((comm: Commodity) => {
                let name = comm.DisplayName;
                form = form.addButton(Format.Bold + name);
            });
        } else {
            form = form.setTitle("§l编辑商品");
            form = form.setContent(
                Format.Bold + Format.Aqua + "欢迎光临！" +
                Format.Bold + Format.Red + "\n全部商品已售罄，赶快补货吧！"
            );
            let instance = this;
            setTimeout(() => {
                instance.Display();
            }, 1000);
        }

        return form;
    }

    private static EditItemMain(player: Player, id: number) {
        let Instance = ShopBackstageManagementForm.Instances.get(player.xuid);
        let Index: number;
        let Item: Commodity;

        let EditForm = function (): CustomForm {
            let form = mc.newCustomForm();
            form = form.setTitle("§l编辑商品");
            form = form.addLabel(
                Format.Gray + "=================" + "§r§l编辑商品信息§r" + Format.Gray + "================\n" +
                Format.Aqua + "勾选\"下架\"后，需将价格设置为小于零的值（防止误操作）"
            );
            form = form.addInput("商品显示名称：", "商品显示的名称", Item.DisplayName);
            form = form.addInput("商品价格：", "价格", Item.Price.toString());
            form = form.addSwitch("下架该商品", false);
            return form;
        }
        let Edit = function (pl: Player, data: Array<any>) {
            if (data != undefined && Instance != undefined) {
                let name = data[1];
                let price = Number(data[2]);
                if (data[3] == true && price < 0) {//下架
                    let chest = Instance.Chest.getContainer();
                    let _ietm = chest.getItem(Item.Index);
                    if (pl.giveItem(_ietm)) {
                        _ietm.setNull();
                        Instance.Shop.Goods.splice(Index, 1);

                        player.sendModalForm("成功", "商品已下架", "返回", "取消", (pl, id) => {
                            if (id != null && id == 1) {
                                Instance?.Display();
                            }
                        });
                    }
                } else if (Number.isInteger(price) && price > 0) {//修改
                    if (Item.DisplayName != name) { Item.DisplayName = name }
                    if (Item.Price != price) { Item.Price = price }

                    player.sendModalForm("成功", "商品信息已更新", "返回", "取消", (pl, id) => {
                        if (id != null && id == 1) {
                            Instance?.Display();
                        }
                    });
                } else {
                    pl.sendModalForm("错误", "输入的信息有误！", "返回", "取消", (pl, id) => {
                        if (id != null && id == 1) {
                            Instance?.Display();
                        }
                    });
                    return;
                }
                DataHelper.SaveData();
            }
        }

        if (id != undefined && Instance != undefined) {
            Index = id;
            Item = Instance.Shop.Goods[Index];
            player.sendForm(EditForm(), Edit);
        }
    }

    private EditShopInfoForm(): CustomForm {
        let form = mc.newCustomForm();
        form = form.setTitle("§l编辑商店信息");
        form = form.addInput("商店名称", "填入商店名称", this.Shop.Name);
        if (this.Player.isOP()) {
            form = form.addInput("营业额", "", this.Shop.Turnover.toString());
            form = form.addInput("成交数", "", this.Shop.TotalSales.toString());
        }

        return form;
    }

    private static EditShopInfo(player: Player, data: Array<any>) {
        let Instance = ShopBackstageManagementForm.Instances.get(player.xuid);
        if (data != undefined && Instance != undefined) {
            log(data);
            let name = String(data[0]).trim();
            if (name != "") {
                if (player.isOP() && data[1] != undefined && data[2] != undefined) {
                    let turnover = Number(data[1]);
                    let total_sales = Number(data[2]);
                    if (turnover > 0 && total_sales > 0) {
                        Instance.Shop.Turnover = turnover;
                        Instance.Shop.TotalSales = total_sales;
                    } else {
                        player.sendModalForm("错误", "输入的信息有误", "返回", "取消", (pl, id) => {
                            if (id != null && id == 1) {
                                Instance?.Display();
                            }
                        });
                        return;
                    }
                }
                Instance.Shop.Name = name;

                player.sendModalForm("成功", "商店信息已更新", "返回", "取消", (pl, id) => {
                    if (id != null && id == 1) {
                        Instance?.Display();
                    }
                });
            } else {
                player.sendModalForm("错误", "输入的信息有误", "返回", "取消", (pl, id) => {
                    if (id != null && id == 1) {
                        Instance?.Display();
                    }
                });
            }
        }
    }

    public Display() {
        this.Player.sendForm(this.MainForm(), ShopBackstageManagementForm.Main);
    }
}