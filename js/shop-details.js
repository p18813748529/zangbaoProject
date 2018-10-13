var shop = (function(){
    return {
        init:function(ele){
            this.$shop = $(ele);
            this.$bigImg = this.$shop.find(".big-img");
            this.$minImgWrap = this.$shop.find(".img-list-wrap");
            this.$minImg = this.$minImgWrap.find(".img-list");
            this.$bigBox = this.$shop.find(".big-box");
            this.$minBox = this.$shop.find(".min-box");
            this.$bigImgSize = 360;;
            this.$minBoxMin = 90;
            this.$minBoxMax = 358;
            this.$multiple = 2;
            this.$shopData = this.$shop.find(".shop-data");
            this.$countInp = $(".shop .count input");
            this.$tipBox = $(".tip-box");
            this.shopId = location.search.split("=")[1];
            if(localStorage.shopList){
                $(".shop-car em").text(JSON.parse(localStorage.shopList).length);
            }
            // this.loadHtml();
            loadHtml();
            this.insertData();
            this.event();
        },
        event:function(){
            var _this = this;
            // 点击图片列表的图片，给对应的li加类show，使其边框变红
            // 同时让显示大图片的盒子和放大镜的大盒子都更换背景图片
            this.$minImg.on("mouseenter",".img-slide",function(){
                _this.$minImg.find(".img-slide").removeClass("show");
                $(this).addClass("show");
                var reg = /url.+["']\)/g;
                var imgUrl = $(this).css("background");
                _this.$bigImg.css("background-image",imgUrl.match(reg));
                _this.$bigBox.css("background-image",imgUrl.match(reg));
            });
            // 鼠标按下时给图片列表的盒子添加拖动功能
            this.$minImg.on("mousedown",function(e){
                e = e || window.event;
                target = e.target || e.srcElement;
                var _x = e.offsetX + target.offsetLeft + _this.$minImgWrap[0].offsetLeft;
                var minX = _this.$minImg[0].offsetWidth > _this.$minImgWrap[0].offsetWidth 
                    ? _this.$minImgWrap[0].offsetWidth - _this.$minImg[0].offsetWidth : 0;
                _this.$minImgWrap[0].onmousemove = move;
                function move(e){
                    e = e || window.event;
                    var x = e.clientX - _x;
                    x = x > 0 ? 0 : x;
                    x = x < minX ? minX : x;
                    _this.$minImg.css("left",x + "px");
                }
            });
            // 鼠标抬起时取消拖动效果
            this.$minImg.on("mouseup",function(e){
                _this.$minImgWrap[0].onmousemove = null;
            });
            // 放大镜功能
            this.$bigImg.on("mouseenter",function(e){
                // 进入显示大图片的盒子时让放大镜的两个盒子显示
                _this.$minBox.stop(true);
                _this.$minBox.animate({"opacity":"1"},200);
                _this.$bigBox.stop(true);
                _this.$bigBox.animate(
                    {"width": _this.$bigImgSize + "px","height":_this.$bigImgSize + "px","left": _this.$bigImgSize + 5 + "px","top":"0"},500);
                // 滑动时让放大镜小盒子跟随，放大镜大盒子背景图偏移
                $(this).on("mousemove",function(e){
                    var _x = _this.$bigImg[0].offsetLeft + _this.$bigImg.parent()[0].offsetLeft 
                        + _this.$bigImg[0].clientLeft + _this.$minBox[0].offsetWidth/2;
                    var _y = _this.$bigImg[0].offsetTop + _this.$bigImg.parent()[0].offsetTop 
                        + _this.$minBox[0].offsetHeight/2;
                    var maxX = _this.$bigImg[0].clientWidth - _this.$minBox[0].offsetWidth;
                    var maxY = _this.$bigImg[0].clientHeight - _this.$minBox[0].offsetHeight;
                    e = e || window.event;
                    var x = e.pageX - _x;
                    var y = e.pageY - _y;
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
                    _this.$bigBox.css("backgroundPosition",(-_this.$multiple * x) + "px " 
                        + (-_this.$multiple * y) + "px");
                    _this.$minBox.css({"left":x+"px","top":y+"px"});
                });
                // 进入时阻止浏览器鼠标滚轮事件的默认行为
                document.onmousewheel= function (e) {
                    if(e.preventDefault){
                        e.preventDefault();
                    }else{
                        e.returnValue = false;
                    }
                };
            });
            this.$bigImg.on("mouseleave",function(e){
                _this.$minBox.animate({"opacity":"0"},200);
                _this.$bigBox.animate(
                    {"width":"0","height":"0","left":"50%","top":"50%"},500);
                // 离开时取消阻止浏览器鼠标滚轮事件的默认行为
                document.onmousewheel = null;
            });
            // 给显示大图片的盒子添加鼠标滚动事件，
            // 向上滑时让放大镜小盒子缩小，放大镜大盒子背景图放大
            // 向下滑时让放大镜小盒子放大，放大镜大盒子背景图缩小
            this.$bigImg[0].onmousewheel = function (event) {
                event = event || window.event;
                var speed = event.wheelDelta > 0 ? 6 : -6;
                var w = parseInt(_this.$minBox.css("width")) + speed;
                var h = parseInt(_this.$minBox.css("height")) + speed;
                var l = parseInt(_this.$minBox.css("left"));
                var t = parseInt(_this.$minBox.css("top"));
                if(w < _this.$minBoxMin){
                    w = _this.$minBoxMin;
                }else if(w > _this.$minBoxMax){
                    w = _this.$minBoxMax;
                }else{
                    l -= speed / 2;
                    l = l < 0 ? 0 : l;
                    l = l > _this.$minBoxMax - w ? _this.$minBoxMax - w : l;
                }
                if(h < _this.$minBoxMin){
                    h = _this.$minBoxMin;
                }else if(h > _this.$minBoxMax){
                    h = _this.$minBoxMax;
                }else{
                    t -= speed / 2;
                    t = t < 0 ? 0 : t;
                    t = t > _this.$minBoxMax - w ? _this.$minBoxMax - w : t;
                }
                _this.$minBox.css({"width": w + "px","height": h + "px",
                    "left": l + "px", "top": t + "px"});
                _this.$multiple = _this.$bigImgSize / w;
                _this.$bigBox.stop();
                _this.$bigBox.css({"backgroundSize":`${_this.$multiple * _this.$bigImgSize}px`
                ,"backgroundPosition":(-_this.$multiple * l) + "px " + (-_this.$multiple * t) + "px"});
                
            };
            // 使用时间委托监听 增加/减少商品数量、加入购物车、立即购买、查看购物车、继续购物
            this.$shopData.on("click",function(e){
                e = e || window.event;
                var target = e.target || e. srcElement;
                switch(target.className){
                    case "add":
                        _this.$countInp.val(_this.$countInp.val() - 0 + 1);
                        break;
                    case "reduce":
                        if (_this.$countInp.val() > 1) {
                            _this.$countInp.val(_this.$countInp.val() - 1);
                        }
                        break;
                    case "add-to-car":
                        _this.addCar(_this.shopId, _this.$countInp.val() - 0);
                        _this.$tipBox.css("display","block");
                        break;
                    case "buy":
                        break;
                    case "go-to-car":
                        location.assign("shop-car.html");
                        break;
                    case "go-on-buy":
                        _this.$tipBox.css("display","none");
                        break;
                }
            });
        },
        // 获取商品数据
        insertData:function(){
            var _this = this;
            function success(data) {
                if (data["code"] === "200") {
                    data = JSON.parse(data["data"])[0];
                    var imgs = data["imgs"].split(",");
                    _this.$minImg.css("width",imgs.length * 65 + "px");
                    _this.$bigImg.css("backgroundImage",`url(${imgs[0]})`);
                    _this.$bigBox.css("backgroundImage",`url(${imgs[0]})`);
                    _this.$bigBox.css("backgroundImage",`url(${imgs[0]})`);
                    _this.$bigBox.css("backgroundSize",`${_this.$multiple * _this.$bigImgSize}px`);
                    for(var i = 0; i < imgs.length; i++){
                        var $div = $(`<li class="img-slide"></li>`);
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
            sendAjax("php/getShop.php", { data: { shopId: `[${_this.shopId}]` }, success: success });
        },
        // 添加到购物车
        addCar:function(id, count) {
            var _this = this;
            // loginStatus为true说明是登录状态，此时将商品添加到数据库购物车
            // 不为true则是未登录，将商品添加到本地存储购物车
            if(loginStatus){
                _this.addDbCar({id:id,count:count});
            }else{
                _this.addLocalCar(id,count);
            }
        },
        // 添加到本地存储购物车
        addLocalCar:function(id,count){
            var shopList = JSON.parse(localStorage.shopList || '[]');
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
        },
        // 添加商品到用户的数据库购物车
        addDbCar:function(shop){
            var options = {
                method:"POST",
                data:{
                    shop:shop,
                    type:"add"
                },
                success:function(data){
                    if(data.code==200){
                        // 添加成功让页面的购物车数目更新
                        var shopList = JSON.parse(data.shopCar || "[]")
                        if(shopList.length>0){
                            $(".shop-car em").text(shopList.length);
                        }
                    }
                }
            };
            sendAjax("php/car.php",options);
        }
    }
}());
shop.init(".shop");

