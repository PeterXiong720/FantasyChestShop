xcopy .\FantasyChestShop.lxl.ts ..\Release\src
xcopy .\tsconfig.json ..\Release\src
uglifyjs FantasyChestShop.lxl.js -m -c -o ../Release/FantasyChestShop.min.js
