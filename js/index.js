var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 100,
    effect: 'fade',
    autoplay: 3000
});
$(".shop-car em").text(JSON.parse(localStorage.shopList).length);
var shops = $(".shop a");
shops.on("click",function(){
    var shopId = $(this).parent(".shop").attr("data-shop-id");
    location.assign("shop-details.html?id=" + shopId);
});
var fixedTar = $(".fixed-target");
var tarList = $(".target-list li");
var tarTitle = $(".target-title");
var tarPos = [];
for(var i = 0; i < tarTitle.length; i++){
    tarPos.push(tarTitle[i].offsetTop-60);
}
window.onscroll=function(){
    var top = document.documentElement.scrollTop;
    if(top>=tarPos[0]-300){
        if(fixedTar.css("display") == "none"){
            fixedTar.css("display","block");
        }
        for(var i = 0; i < tarPos.length; i++){
            if(top<tarPos[i]+300&&top>tarPos[i]-300){
                $(tarList[i]).addClass("show");
            }else{
                $(tarList[i]).removeClass("show");
            }
        }
    }else{
        if(fixedTar.css("display") == "block"){
            fixedTar.css("display","none");
        }
    }
}
tarList.on("click",function(){
    var index = tarList.index($(this));
    $(document.documentElement).animate({scrollTop:tarPos[index]},500);
});
$(".fixed-right .toTop").on("click",function(){
    $(document.documentElement).animate({scrollTop:0},500);
});
$(".fixed-right .car").on("click",function(){
    location.assign("shop-car.html");
});
