var loginStatus = false;
function isLogin(){
    var cookie = new UseCookie();
    var token = cookie.getCookie("zangbaoToken");
    if(token){
        var arr = token.split("_");
        var options = {
            method:"POST",
            data:{
                username:arr[0],
                token:arr[1],
                type: false
            },
            success:function(data){
                if(data.code==200){
                    loginStatus = true;
                    $("header .top .top-left").addClass("logined");
                    $("header .top .top-left p em").text(data.username);
                }
            }
        };
        sendAjax("php/check_token.php",options);
        $("#sign-out").on("click",function(){
            loginStatus = false;
            $("header .top .top-left").removeClass("logined");
            $("header .top .top-left p em").text("");
            cookie.removeCookie("zangbaoToken");
            options.data.type = true;
            sendAjax("php/check_token.php",options);
        });
    }
}
function loadHtml(){
    $(".h-contain").load("common.html .h-contain",function(){
        isLogin();
        if(localStorage.shopList){
            $(".shop-car em").text(JSON.parse(localStorage.shopList).length);
        }
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