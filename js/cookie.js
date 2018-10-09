
function UseCookie(){
}
UseCookie.prototype.setCookie = function(name,value,days){
    document.cookie = `${name}=${value}; max-age=${days*24*60*60};`;
};
UseCookie.prototype.getCookie = function(name){
    var arr = document.cookie.split("; ");
    var obj = {};
    for(var item of arr){
        item = item.split("=");
        obj[item[0]] = item[1];
    }
    return name ? obj[name] : obj;
}
UseCookie.prototype.removeCookie = function(name){
    this.setCookie(name,'',0);
}

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
                $("header .top .top-left").addClass("logined");
                $("header .top .top-left p em").text(data.username);
            }
        }
    };
    sendAjax("php/check_token.php",options);
    $("#sign-out").on("click",function(){
        cookie.removeCookie("zangbaoToken");
        $("header .top .top-left").removeClass("logined");
        $("header .top .top-left p em").text("");
        options.data.type = true;
        sendAjax("php/check_token.php",options);
    });
}