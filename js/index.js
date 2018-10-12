
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
            loadHtml();
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
