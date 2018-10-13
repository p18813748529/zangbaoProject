
var shopCar = (function(){
    return {
        init: function(ele) {
            this.$ele = $(ele);
            this.$main = this.$ele.find(".main");
            this.$total = this.$ele.find(".total");
            loadHtml();
            this.event();
            this.getData();
        },
        event: function() {
            var _this = this;
            this.$main.on("input",".shop-count",function(e) {
                // 获取商品总价
                $(this).siblings(".shop-total").text(this.value * $(this).siblings('.shop-price').text());
            });
            this.$main.on("click",".shop-check",function(){
                _this.total();
            });
            this.$main.on("click",".shop-btn-del",function(){
                var shopId = this.getAttribute("attr-id");
                for(var j = 0; j < _this.shopList.length; j++) {
                    if(_this.shopList[j].id == shopId) {
                        // 获取商品信息
                        _this.shopList.splice(j,1);
                        break;
                    }
                }
                localStorage.setItem("shopList",JSON.stringify(_this.shopList));
                this.parentNode.parentNode.remove();
            });
            this.$total.find(".select-all").on("click",function(){
                if($(this).prop("checked")){
                    _this.$main.find(".shop-box .shop-check").prop("checked",true);
                    _this.total();
                }else{
                    _this.$main.find(".shop-box .shop-check").prop("checked",false);
                    _this.$total.find(".total-price em").text(0);
                }
            });
        },
        total:function(){
            var checkShop = this.$main.find(".shop-box").has("input:checkbox:checked");
            var shopList = JSON.parse(localStorage.shopList);
            var totalPrice = 0;
            for(var i = 0; i < checkShop.length; i++){
                var shopId = $(checkShop[i]).find(".shop-btn-del").attr("attr-id");
                for(var j = 0; j < shopList.length; j++){
                    if(shopId == shopList[j].id){
                        totalPrice+=$(checkShop[i]).find(".shop-price").text() * $(checkShop[i]).find(".shop-count").val();
                    }
                }
            }
            this.$total.find(".total-price em").text(totalPrice+"元");
        },
        // 获取购物车数据,并通过id获取数据库的商品数据
        getData: function() {
            // 已登录获取数据库的购物车，未登录获取本地购物车
            if(loginStatus){
                this.getDbCar();
            }else{
                this.getLocalCar();
            }
        },
        getLocalCar:function(){
            this.shopList = JSON.parse(localStorage.shopList || '[]');
            if(this.shopList.length == 0) return;
            var _this = this;
            var params = {
                data:{
                    shopId:[]
                },
                success: function (data){
                    data = JSON.parse(data.data);
                    var arr = [];
                    // [{id: 1, count: 2}]
                    for(var i = 0; i < data.length; i++) {
                        // 通过id获取商品信息
                        for(var j = 0; j < _this.shopList.length; j++) {
                            if(_this.shopList[j].id == data[i].id) {
                                // 获取商品信息
                                data[i]["count"] = _this.shopList[j].count;
                                arr.push(data[i]);
                                break;
                            }
                        }
                    }
                    // 把商品数据放到实例的属性上
                    _this.insertData(arr);
                }
            }
            for(var shop of this.shopList){
                params.data.shopId.push(shop.id);
            }
            params.data.shopId = `[${params.data.shopId}]`;
            sendAjax("php/getShop.php",params);
        },
        getDbCar:function(){
            var _this = this;
            var options = {
                method:"POST",
                data:{
                    shop:"",
                    type:"get"
                },
                success:function(data){
                    if(data.code==200){
                        _this.insertData(JSON.parse(data.data));
                    }
                }
            };
            sendAjax("php/car.php",options);
        },
        // 把购物车数据添加到页面中
        insertData: function(data) {
            var arr = [];
            for(var i = 0; i < data.length; i++) {
                var shop = data[i];
                shop.imgs = shop.imgs.split(",");
                arr.push(`<div class="shop-box">
                            <input type="checkbox" class="shop-check"/>
                            <img src="${shop.imgs[0]}"/>
                            <div>
                            商品名称:<span class="shop-name">${shop.shopName}</span><br />
                            数量: <input class="shop-count" type="number" min=1 value="${shop.count}" /><br />
                            价格: <span class="shop-price">${shop.price}</span><br />
                            商品总价: <span class="shop-total">${shop.price * shop.count}</span>
                            <button class="btn shop-btn-del" attr-id="${shop.id}">删除</button>
                            </div>
                        </div>`);
            }
            this.$main.html(arr.join(''));
        }
    }
}())
shopCar.init(".car-wrap");