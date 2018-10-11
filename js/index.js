
var index = (function(){
    return {
        init:function(){
            this.$shops = $(".shop a");
            this.$fixedTar = $(".fixed-target");
            this.$tarList = $(".target-list li");
            this.$tarTitle = $(".target-title");
            this.$toTop = $(".fixed-right .toTop");
            this.$toCar = $(".fixed-right .car");
            this.tarPos = [];
            for(var i = 0; i < this.$tarTitle.length; i++){
                this.tarPos.push(this.$tarTitle[i].offsetTop-60);
            }
            this.swiper = this.startSwiper();
            this.loadHtml();
            this.event();
        },
        event:function(){
            var _this = this;
            this.$shops.on("click",function(){
                var shopId = $(this).parent(".shop").attr("data-shop-id");
                window.open("shop-details.html?id=" + shopId);
            });
            window.onscroll=function(){
                var top = document.documentElement.scrollTop;
                if(top>=_this.tarPos[0]-300){
                    if(_this.$fixedTar.css("display") == "none"){
                        _this.$fixedTar.css("display","block");
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
                        _this.$fixedTar.css("display","none");
                    }
                }
            }
            this.$tarList.on("click",function(){
                var index = _this.$tarList.index($(_this));
                $(document.documentElement).animate({scrollTop:tarPos[index]},500);
            });
            this.$toTop.on("click",function(){
                $(document.documentElement).animate({scrollTop:0},500);
            });
            this.$toCar.on("click",function(){
                location.assign("shop-car.html");
            });
        },
        loadHtml:function(){
            $(".h-contain").load("common.html .h-contain",function(){
                if(localStorage.shopList){
                    $(".shop-car em").text(JSON.parse(localStorage.shopList).length);
                }
            });
            $(".footer").load("common.html .f-contain");
        },
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
        }
    }
}());
index.init();
