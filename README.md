# FantasyChestShop
一款BDS(基岩专用服务器)箱子商店插件，基于[LiteXLoader](https://github.com/LiteLDev/LiteXLoader)加载器平台开发。
### 安装和使用：
要使用此插件，你需要先安装[LiteLoader](https://www.minebbs.com/resources/liteloader.2059/)和[LiteXLoader](https://github.com/LiteLDev/LiteXLoader)，然后启动BDS，将`FantasyChestShop.min.js`粘贴到./plugins目录下即可。此时你可以重启BDS或者使用`lxl load ./plugins/FantasyChestShop.min.js`加载此插件。
- `/playershop`：打开玩家商店列表。（对于具体某个商店，也可以直接点击箱子打开）
- `/playershop add`：添加箱子商店，非OP玩家只能在自己的领地内创建商店。商店添加后会出现在玩家商店列表。（不支持大箱子，理论上支持木桶但无法提供保护，因为无法拦截木桶被打开）
- `/playershop remove`：管理员指令。强制删除脚下的商店。（以后可能会改成点击）
- `/playershop list`：列出所有商店。
- `/playershop mgr`：GUI设置页面。

### 实验性功能：
op可在商店后台设置无库存限制，设置后的商店将出现在op商店列表。
`/opshop`可打开OP商店列表。
OP商店基于商品上架时的nbt进行计算，所以假如你上架了64个铁，卖掉了10个，“购买数量”滑块最大值就与库存同步就变为了54，然后开启无限库存，那么在OP商店中结算时“购买数量”滑块最大值任是64，即使箱子中只有54个铁。

### 配置文件（以后会支持游戏内更改）：
- `Money`：Money 种类，默认为“LLMoney”，设置其他值（必须和你的经济计分板名称一致）即可使用计分板模式，如：“money”。
- `Reg`：即Registration fee，注册费用，注册商店时向玩家收取的手续费。
- `TaxRate`：税率，购买时从总金额中收取税收的税率，取值范围（区间）：[0, 1)（0 为不收税，0.5为50%）。

### 编译源码
`tsc -p ./src/tsconfig.json`