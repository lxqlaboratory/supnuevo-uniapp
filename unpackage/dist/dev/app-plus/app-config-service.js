
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/price/modifyPrice","pages/sale/sale","pages/stock/stock","pages/my/my","pages/notice/notice","pages/price/MaintainCommInfo","pages/price/compute","pages/price/AddCommInfo","pages/price/Group","pages/my/myUnion","pages/my/Myinfo","pages/my/unionRule","pages/my/commodityCategory","pages/my/commodityPrice","pages/my/pricePromotion","pages/my/PricePublicity","pages/my/MemberList","pages/my/unionOrder","pages/my/LackCommodity","pages/my/IncompleteCommodity","pages/my/CodigoRelation","pages/my/ModifyTime","pages/my/CommoditybytaxId","pages/my/CommodityDetail","pages/my/OrderDiscount","pages/my/FreeDiscount","pages/my/OrderDetail","pages/stock/VentasInfoModal","pages/my/MySuggestion","pages/my/MyShop","pages/stock/Unionlist","pages/sale/PriceModal","pages/my/relMyShop","pages/stock/VentasDetail","pages/stock/CompanyInfo","pages/stock/CommodityInfo","pages/my/DiscountPic","pages/chumen/chumen","pages/chumen/chumen1"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#7A7E83","selectedColor":"#3a6eff","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/price/modifyPrice","iconPath":"static/image/tabBar/chang1.png","selectedIconPath":"static/image/tabBar/chang2.png","text":"改价"},{"pagePath":"pages/sale/sale","iconPath":"static/image/tabBar/price2.png","selectedIconPath":"static/image/tabBar/price1.png","text":"收银"},{"pagePath":"pages/stock/stock","iconPath":"static/image/tabBar/stock1.png","selectedIconPath":"static/image/tabBar/stock2.png","text":"进货"},{"pagePath":"pages/my/my","iconPath":"static/image/tabBar/my1.png","selectedIconPath":"static/image/tabBar/my2.png","text":"我的"},{"pagePath":"pages/notice/notice","iconPath":"static/image/tabBar/notice1.png","selectedIconPath":"static/image/tabBar/notice2.png","text":"公告"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"supnuevo-uniapp","compilerVersion":"3.1.4","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":"supnuevo","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/price/modifyPrice","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"supnuevo","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff","titleNView":{"buttons":[{"text":"","fontSrc":"/static/iconfont.ttf","fontSize":"30px","float":"right"}]}}},{"path":"/pages/sale/sale","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"supnuevo","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/stock/stock","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"supnuevo","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"supnuevo","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/notice/notice","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"supnuevo","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff","titleNView":{"buttons":[{"text":"","fontSrc":"/static/iconfont.ttf","fontSize":"30px","float":"left"}]}}},{"path":"/pages/price/MaintainCommInfo","meta":{},"window":{"navigationBarTitleText":"修改商品","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/price/compute","meta":{},"window":{"navigationBarTitleText":"设置计算键","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/price/AddCommInfo","meta":{},"window":{"navigationBarTitleText":"添加商品","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/price/Group","meta":{},"window":{"navigationBarTitleText":"组改价","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/myUnion","meta":{},"window":{"navigationBarTitleText":"我的超市联盟","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/Myinfo","meta":{},"window":{"navigationBarTitleText":"我的信息","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/unionRule","meta":{},"window":{"navigationBarTitleText":"本联盟规定","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/commodityCategory","meta":{},"window":{"navigationBarTitleText":"我们的商品种类","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/commodityPrice","meta":{},"window":{"navigationBarTitleText":"我们的商品价格","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/pricePromotion","meta":{},"window":{"navigationBarTitleText":"我们的促销策略","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/PricePublicity","meta":{},"window":{"navigationBarTitleText":"我们的促销宣传单","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/MemberList","meta":{},"window":{"navigationBarTitleText":"我们的成员","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/unionOrder","meta":{},"window":{"navigationBarTitleText":"我的超市联盟订单","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/LackCommodity","meta":{},"window":{"navigationBarTitleText":"缺货商品","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/IncompleteCommodity","meta":{},"window":{"navigationBarTitleText":"信息不完整商品","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/CodigoRelation","meta":{},"window":{"navigationBarTitleText":"条码级联","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff","titleNView":{"buttons":[{"text":"","fontSrc":"/static/iconfont.ttf","fontSize":"30px","float":"right"}]}}},{"path":"/pages/my/ModifyTime","meta":{},"window":{"navigationBarTitleText":"商品改价时间","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/CommoditybytaxId","meta":{},"window":{"navigationBarTitleText":"supnuevo","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/CommodityDetail","meta":{},"window":{"navigationBarTitleText":"supnuevo","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/OrderDiscount","meta":{},"window":{"navigationBarTitleText":"总量百分比折扣","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/FreeDiscount","meta":{},"window":{"navigationBarTitleText":"免量折扣","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/OrderDetail","meta":{},"window":{"navigationBarTitleText":"订单信息","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/stock/VentasInfoModal","meta":{},"window":{"navigationBarTitleText":"选择联盟","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/MySuggestion","meta":{},"window":{"navigationBarTitleText":"我的建议","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/MyShop","meta":{},"window":{"navigationBarTitleText":"我替他们改价","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff","titleNView":{"buttons":[{"text":"","fontSrc":"/static/iconfont.ttf","fontSize":"30px","float":"right"}]}}},{"path":"/pages/stock/Unionlist","meta":{},"window":{"navigationBarTitleText":"联盟列表","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/sale/PriceModal","meta":{},"window":{"navigationBarTitleText":"分类","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/relMyShop","meta":{},"window":{"navigationBarTitleText":"他们替我改价","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff","titleNView":{"buttons":[{"text":"","fontSrc":"/static/iconfont.ttf","fontSize":"30px","float":"right"}]}}},{"path":"/pages/stock/VentasDetail","meta":{},"window":{"navigationBarTitleText":"","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/stock/CompanyInfo","meta":{},"window":{"navigationBarTitleText":"供应商详情","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/stock/CommodityInfo","meta":{},"window":{"navigationBarTitleText":"","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/my/DiscountPic","meta":{},"window":{"navigationBarTitleText":"折扣图片","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/chumen/chumen","meta":{},"window":{"navigationBarTitleText":"山大校园通","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}},{"path":"/pages/chumen/chumen1","meta":{},"window":{"navigationBarTitleText":"山大校园通","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3a6eff","backgroundColor":"#3a6eff"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
