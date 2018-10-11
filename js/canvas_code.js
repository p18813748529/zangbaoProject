//获取随机数
function getRan(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}
//获取随机颜色
function getColor(min, max) {
    var rgb = [getRan(min, max),getRan(min, max),getRan(min, max)];
    return ["rgb(",rgb.join(","),")"].join("");
}
// getCode(canvas, width, height)
function getCode(cvs, w, h) {
    w = w || 120;
    h = h || 40;
    var ctx = cvs.getContext("2d");
    //填充背景颜色,颜色要浅一点
    ctx.fillStyle = getColor(180, 230);
    ctx.fillRect(0, 0, w, h);
    //随机产生验证码字符
    var pool = "ABCDEFGHIJKLIMNOPQRSTUVWSYZ1234567890";
    var code = '';
    for (var i = 0; i < 4; i++) {
        // 获取随机验证码的内容
        var c = pool[getRan(0, pool.length)];
        code += c;
        //设置字体的大小
        var fs = getRan(h/3, h/3*2); 
        //设置字体的旋转角度
        var deg = getRan(-30, 30); 
        ctx.font = fs + 'px 微软雅黑';
        ctx.textBaseline = "top";
        ctx.fillStyle = getColor(80, 150);
        ctx.save();
        ctx.translate(w / 5 * i, w / 8);
        ctx.rotate(deg * Math.PI / 180);
        ctx.fillText(c, w / 15, 0);
        ctx.restore();
    }
    //随机产生10条干扰线,干扰线的颜色要浅一点
    for (var i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(getRan(0, w), getRan(0, h));
        ctx.lineTo(getRan(0, w), getRan(0, h));
        ctx.strokeStyle = getColor(180, 230);
        ctx.closePath();
        ctx.stroke();
    }
    //随机产生50个圆点
    for (var i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.arc(getRan(0, w), getRan(0, h), 1, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = getColor(150, 200);
        ctx.fill();
    }
    return code;
}