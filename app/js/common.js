var loginStatus = false;
function isLogin(fn,_this){
    var cookie = new UseCookie();
    var token = cookie.getCookie("zangbaoToken");
    if(token){
        var options = {
            method:"POST",
            data:{
                type: false
            },
            success:function(data){
                if(data.code==200){
                    loginStatus = true;
                    $("header .top .top-left").addClass("logined");
                    $("header .top .top-left p em").text(data.username);
                    var shopList = JSON.parse(data.shopCar || "[]");
                    if(shopList.length>0){
                        $(".shop-car em").text(shopList.length);
                    }
                }else{
                    if(localStorage.shopList){
                        $(".shop-car em").text(JSON.parse(localStorage.shopList).length);
                    }
                }
                if(typeof fn === "function"){
                    if(typeof _this == "object" && _this != null){
                        fn.call(_this);
                    }else{
                        fn();
                    }
                }
            }
        };
        sendAjax("php/check_token.php",options);
        $("#sign-out").on("click",function(){
            loginStatus = false;
            $("header .top .top-left").removeClass("logined");
            $("header .top .top-left p em").text("");
            options.data.type = true;
            options.success = function(data){
                if(typeof fn === "function"){
                    if(typeof _this == "object" && _this != null){
                        fn.call(_this);
                    }else{
                        fn();
                    }
                }
                if(data.code==800){
                    cookie.removeCookie("zangbaoToken");
                    location.href = "index.html";
                }
            }
            sendAjax("php/check_token.php",options);
        });
    }else{
        if(typeof fn === "function"){
            if(typeof _this == "object" && _this != null){
                fn.call(_this);
            }else{
                fn();
            }
        }
        if(localStorage.shopList){
            $(".shop-car em").text(JSON.parse(localStorage.shopList).length);
        }
    }
}
function loadHtml(fn,_this){
    $(".h-contain").load("common.html .h-contain",function(){
        isLogin(fn,_this);
    });
    $(".nav-wrap").load("common.html .nav-con",function(){
        $(".nav-list").on("mouseenter",function(){
            $(".list-con-wrap").show();
        });
        $(".nav-list").on("mouseenter","li",function(){
            $(".list-con-wrap").html($(this).find(".list-con").clone(true));
        });
        $(".nav-list").on("mouseleave",function(){
            $(".list-con-wrap").hide();
        });
    });
    $(".footer").load("common.html .f-contain");
}