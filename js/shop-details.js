var shop = (function(){
    return {
        init:function(ele){
            this.$shop = $(ele);
            this.$bigImg = this.$shop.find(".big-img");
            this.$minImgWrap = this.$shop.find(".img-list-wrap");
            this.$minImg = this.$minImgWrap.find(".img-list");
            this.$bigBox = this.$shop.find(".big-box");
            this.$minBox = this.$shop.find(".min-box");
            this.$addCountBtn = this.$shop.find(".count .add");
            this.$reduceCountBtn = this.$shop.find(".count .reduce");
            this.$countInp = $(".shop .count input");
            this.$addToCar = $(".add-to-car");
            this.$tipBox = $(".tip-box");
            this.$goToCar = $(".tip-box .go-to-car");
            this.$goOnBuy = $(".tip-box .go-on-buy");
            this.shopId = location.search.split("=")[1];
            if(localStorage.shopList){
                $(".shop-car em").text(JSON.parse(localStorage.shopList).length);
            }
            this.insertData();
            this.event();
        },
        event:function(){
            var _this = this;
            this.$minImg.on("click",".img-slide",function(){
                _this.$minImg.find(".img-slide").removeClass("show");
                $(this).addClass("show");
                var reg = /url.+["']\)/g;
                var imgUrl = $(this).css("background");
                _this.$bigImg.css("background-image",imgUrl.match(reg));
                _this.$bigBox.css("background-image",imgUrl.match(reg));
            });
            this.$minImg.on("mousedown",function(){
                _this.$minImgWrap.on("mousemove",function(){

                });
            });
            this.$bigImg.on("mouseenter",function(e){
                _this.$minBox.animate({"opacity":"1"},200);
                _this.$bigBox.animate(
                    {"width":"300px","height":"300px","left":"305px","top":"0"},500);
                var _x = _this.$bigImg[0].offsetLeft + _this.$bigImg[0].clientLeft
                    + _this.$minBox[0].offsetWidth/2;
                var _y = _this.$bigImg[0].offsetTop;
                var maxX = _this.$bigImg[0].clientWidth - _this.$minBox[0].offsetWidth;
                var maxY = _this.$bigImg[0].clientHeight - _this.$minBox[0].offsetHeight;
                $(this).on("mousemove",function(e){
                    e = e || window.event;
                    var x = e.clientX - _x;
                    var y = e.clientY - _y;
                    if(x<0){
                        x = 0;
                    }else if(x>maxX){
                        x = maxX;
                    }
                    if(y<0){
                        y = 0;
                    }else if(y>maxY){
                        y = maxY;
                    }
                    _this.$bigBox.css("backgroundPosition",(-3 * x) + "px " + (-3 * y) + "px");
                    _this.$minBox.css({"left":x+"px","top":y+"px"});
                });
                $(document).on("mousewheel DOMMouseScroll", function (e) {
                    if(e.preventDefault){
                        e.preventDefault();
                    }else{
                        e.returnValue = false;
                    }
                });
            });
            this.$bigImg[0].onmousewheel = function (event) {
                event = event || window.event;
                var speed = event.wheelDelta > 0 ? 5 : -5;
                var w = parseInt(_this.$minBox.css("width")) + speed;
                var h = parseInt(_this.$minBox.css("height")) + speed;
                _this.$minBox.css({"width": w + "px","height": h + "px"});
            };
            this.$bigImg.on("mouseleave",function(e){
                _this.$minBox.animate({"opacity":"0"},200);
                _this.$bigBox.animate(
                    {"width":"0","height":"0","left":"50%","top":"50%"},500);
            });
            // this.$minImg.on("click",".img-slide",function(){
            //     // _this.$bigBox.css
            // });
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
                    var $shopImg = _this.$shop.find(".shop-img .img-list");
                    var imgs = data["imgs"].split(",");
                    _this.$minImg.css("width",imgs.length * 65 + "px");
                    _this.$bigImg.css("background-image",`url(${imgs[0]}`);
                    _this.$bigBox.css("background-image",`url(${imgs[0]}`);
                    for(var i = 0; i < imgs.length; i++){
                        var $div = $(`<li class="img-slide")"></li>`);
                        $div.css("background-image",`url(${imgs[i]}`);
                        _this.$minImg.append($div);
                    }
                    _this.$minImg.find(".img-slide:first").addClass("show");
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
// var galleryThumbs = new Swiper('.gallery-thumbs', {
//     spaceBetween: 10,
//     slidesPerView: 4,
//     freeMode: true,
//     watchSlidesVisibility: true,
//     watchSlidesProgress: true,
//   });
//   var galleryTop = new Swiper('.gallery-top', {
//     spaceBetween: 10,
//     thumbs: {
//       swiper: galleryThumbs
//     }
//   });
