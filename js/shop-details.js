var shop = (function(){
    return {
        init:function(ele){
            this.$shop = $(ele);
            this.$addCountBtn = this.$shop.find(".count .add");
            this.$reduceCountBtn = this.$shop.find(".count .reduce");
            this.$countInp = $(".shop .count input");
            this.$addToCar = $(".add-to-car");
            this.$tipBox = $(".tip-box");
            this.$goToCar = $(".tip-box .go-to-car");
            this.$goOnBuy = $(".tip-box .go-on-buy");
            this.shopId = location.search.split("=")[1];
            $(".shop-car em").text(JSON.parse(localStorage.shopList).length);
            this.insertData();
            this.event();
        },
        event:function(){
            var _this = this;
            this.$addCountBtn.on("click", function () {
                _this.$countInp.val(_this.$countInp.val() - 0 + 1);
            });
            this.$reduceCountBtn.on("click", function () {
                if (_this.$countInp.val() > 1) {
                    _this.$countInp.val(_this.$countInp.val() - 1);
                }
            });
            this.$addToCar.on("click", function () {
                _this.addCar(_this.shopId, _this.$countInp.val() - 0);
                _this.$tipBox.css("display","block");
            });
            this.$goToCar.on("click",function(){
                location.assign("shop-car.html");
            });
            this.$goOnBuy.on("click",function(){
                _this.$tipBox.css("display","none");
            });
        },
        // 获取商品数据
        insertData:function(){
            var _this = this;
            function success(data) {
                if (data["code"] === "200") {
                    data = JSON.parse(data["data"]);
                    _this.$shop.find("img").attr("src", data["imgs"]);
                    _this.$shop.find(".shop-name").text(data["shopName"]);
                    _this.$shop.find(".shop-market-price").text("￥" + data["marketPrice"]);
                    _this.$shop.find(".shop-price").text("￥" + data["price"]);
                    _this.$shop.find(".shop-count").text(data["count"]);
                } else {
                    _this.$shop.find(".shop-name").text(data["msg"]);
                }
            }
            sendAjax("php/getShop.php", { data: { shopId: _this.shopId }, success: success });
        },
        // 添加到购物车
        addCar:function(id, count) {
            var shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(shopList);
            for (var j = 0; j < shopList.length; j++) {
                if (shopList[j].id === id) {
                    // 证明商品已经存在
                    shopList[j].count = Number(shopList[j].count) + Number(count);
                    break;
                }
            }
            if (j === shopList.length) {
                // 商品不存在, 添加一条新数据
                shopList.push({ id: id, count: count });
        
            }
            localStorage.shopList = JSON.stringify(shopList);
            // 购物车图标显示商品数目
            $(".shop-car em").text(JSON.parse(localStorage.shopList).length);
        }
    }
}());
shop.init(".shop");