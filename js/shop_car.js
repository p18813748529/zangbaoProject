var shopCar = (function(){
    return {
        init: function(ele) {
            this.$ele = document.querySelector(ele);
            this.event();
            this.getShopList();
        },
        event: function() {
            var _this = this;
            this.$ele.oninput = function(e) {
                if(e.target.className == 'shop-count') {
                    // 获取商品总价
                    var _parent =  e.target.parentNode
                    _parent.querySelector('.shop-total').innerHTML = e.target.value * _parent.querySelector('.shop-price').innerHTML;

                }
            }
            $(this.$ele).on("click",".shop-check",function(){
                _this.total();
            });
            $(this.$ele).on("click",".shop-btn-del",function(){
                var shopId = this.getAttribute("attr-id");
                for(var j = 0; j < _this.carShopList.length; j++) {
                    if(_this.carShopList[j].id == shopId) {
                        // 获取商品信息
                        _this.carShopList.splice(j,1);
                        break;
                    }
                }
                localStorage.setItem("shopList",JSON.stringify(_this.carShopList));
                this.parentNode.parentNode.remove();
            });
            $(".total .select-all").on("click",function(){
                if($(this).prop("checked")){
                    $(".main").find(".shop-box .shop-check").prop("checked",true);
                    _this.total();
                }else{
                    $(".main").find(".shop-box .shop-check").prop("checked",false);
                    $(".total .total-price em").text(0);
                }
            });
        },
        total:function(){
            var checkShop = $(this.$ele).find(".shop-box").has("input:checkbox:checked");
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
            $(".total .total-price em").text(totalPrice+"元");
        },
        // 获取商品数据
        getShopList: function() {
            var _this = this;
            var params = {
                // url: 'php/getShop2.php',
                success: function (data){
                    // 把商品数据放到实例的属性上
                   _this.shopList = JSON.parse(data.data);
                   _this.getData();
                }
            }
            sendAjax("php/getShop2.php",params);
        },
        // 获取购物车数据
        getData: function() {
            this.carShopList = JSON.parse(localStorage.shopList || '[]');
            this.insertData(this.carShopList);
        },
        // 把购物车数据添加到页面中
        insertData: function(data) {
            var _this = this;
            var arr = [];
            // [{id: 1, count: 2}]
            for(var i = 0; i < data.length; i++) {
                // 通过id获取商品信息
                var shop;
                for(var j = 0; j < this.shopList.length; j++) {
                    if(this.shopList[j].id == data[i].id) {
                        // 获取商品信息
                        shop = this.shopList[j];
                        break;
                    }
                }
                arr.push(`<div class="shop-box">
                            <input type="checkbox" class="shop-check"/>
                            <img src="${shop.imgs}"/>
                            <div>
                            商品名称:<span class="shop-name">${shop.shopName}</span><br />
                            数量: <input class="shop-count" type="number" min=1 value="${data[i].count}" /><br />
                            价格: <span class="shop-price">${shop.price}</span><br />
                            商品总价: <span class="shop-total">${shop.price * data[i].count}</span>
                            <button class="btn shop-btn-del" attr-id="${data[i].id}">删除</button>
                            </div>
                        </div>`);
            }
            this.$ele.innerHTML = arr.join('');
        }
    }
}())
shopCar.init(".main");