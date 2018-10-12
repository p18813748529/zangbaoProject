
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