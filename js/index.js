
var index = (function(){
    return {
        init:function(){
            this.$shops = $(".shop a");
            this.$fixedTar = $(".fixed-target");
            this.$tarList = $(".target-list li");
            this.$tarTitle = $(".target-title");
            this.$toTop = $(".fixed-right .toTop");
            this.$toCar = $(".fixed-right .car");
            this.$tab = $(".tab-box");
            this.$con = $(".con");
            // 图片懒加载
            this.$img = $(".shop-wrap img")
            this.tarPos = [];
            for(var i = 0; i < this.$tarTitle.length; i++){
                this.tarPos.push(this.$tarTitle[i].offsetTop-60);
            }
            this.swiper = this.startSwiper();
            loadHtml(this.localToDb,this);
            this.event();
        },
        event:function(){
            var _this = this;
            this.$shops.on("click",function(){
                var shopId = $(this).parent(".shop").attr("data-shop-id");
                window.open("shop-details.html?id=" + shopId);
            });
            // 页面滚动到相应位置时让顶部锚点显示，并给对应的锚点添加类show
            window.onscroll=function(){
                for(var i = 0; i < _this.$img.length; i++){
                    if(_this.$img[i].offsetTop-document.documentElement.scrollTop-window.innerHeight<100){
                        _this.$img[i].src=_this.$img[i].getAttribute("attr-src");
                    }
                }
                var top = document.documentElement.scrollTop;
                if(top>=_this.tarPos[0]-300){
                    if(_this.$fixedTar.css("display") == "none"){
                        _this.$fixedTar.show();
                    }
                    for(var i = 0; i < _this.tarPos.length; i++){
                        if(top<_this.tarPos[i]+300&&top>_this.tarPos[i]-300){
                            $(_this.$tarList[i]).addClass("show");
                        }else{
                            $(_this.$tarList[i]).removeClass("show");
                        }
                    }
                }else{
                    if(_this.$fixedTar.css("display") == "block"){
                        _this.$fixedTar.hide();
                    }
                }
            }
            this.$tarList.on("click",function(){
                var index = _this.$tarList.index($(this));
                $(document.documentElement).animate({scrollTop:_this.tarPos[index]},500);
            });
            this.$toTop.on("click",function(){
                $(document.documentElement).animate({scrollTop:0},500);
            });
            this.$toCar.on("click",function(){
                location.assign("shop-car.html");
            });
            this.$tab.on("mouseenter",".tabs li",function(){
                $(".tabs li").removeClass("select");
                $(this).addClass("select");
                _this.$tab.find(".tab-con-wrap ul").hide().eq(_this.$tab.find(".tabs li").index($(this))).show();
            });
            this.$con.on("mouseenter",".recom li",function(){
                $(this).parent(".recom").find("li").removeClass("show-recom");
                $(this).addClass("show-recom");
                $(this).parents(".con").find(".list").hide().eq($(this).parents(".con").find(".recom li").index($(this))).show();
            });
        },
        // 开启轮播图
        startSwiper:function(){
            return new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 100,
                effect: 'fade',
                autoplay: 3000
            });
        },
        localToDb:function(){
            // 如果未登录，直接终止函数
            if(!loginStatus) return;
            // 如果已登录，并且本地存储购物车存在商品数据，询问是否将商品数据添加到用户的数据库，最后清空
            var shopList = JSON.parse(localStorage.shopList || "[]");
            if(shopList.length>0){
                if(confirm("检测到有商品未添加到您的购物车，是否添加?")){
                    var options = {
                        method:"POST",
                        data:{
                            shop:JSON.stringify(shopList),
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
                localStorage.shopList = "";
            }
        }
    }
}());
index.init();
