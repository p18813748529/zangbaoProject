
var login_reg = (function(){
    return {
        init:function(ele,type){
            this.$ele = this.$(ele);
            this.type = type;
            this.$protocol = this.$("#protocol",this.$ele);
            this.$userInp = this.$("#username",this.$ele);
            this.$passInp = this.$("#password",this.$ele);
            this.$checkcode = this.$("#checkcode",this.$ele);
            this.$cvsCode = this.$(".canvasCode",this.$ele);
            if(type=="reg"){
                this.$rePassInp = this.$("#re-password",this.$ele);
                this.$email = this.$("#email",this.$ele);
                this.$protocol = this.$("#protocol",this.$ele);
            }else if(type=="login"){
                this.$sevenDay = this.$("#sevenDay",this.$ele);
            }
            this.$subBtn = this.$(".logReg-btn",this.$ele);
            this.loadHtml();
            this.event();
            this.code = this.reCode();
        },
        // 事件处理
        event:function(){
            var _this = this;
            this.$subBtn.onclick = function(){
                // 如果格式正确,进行ajax检测
                if(_this.regExpCheck()){
                    _this.ajaxCheck();
                }else{
                    // 如果正则验证不通过，刷新验证码
                    _this.code = _this.reCode();
                }
            };
            var input = function(){
                if(this.parentNode.classList.contains("focus-inp-error")){
                    if(this.id==="re-password"){
                        if(this.value === _this.$passInp.value){
                            this.parentNode.classList.add("focus-inp");
                            this.parentNode.classList.remove("focus-inp-error");
                        }
                    }else{
                        _this.check(this);
                    }
                }
            };
            var focus = function(){
                this.parentNode.classList.add("focus-inp");
                if(this.value===this.getAttribute("tipmsg")){
                    this.value="";
                }
                if(this.id==="password" || this.id==="re-password" && this.type==="text") this.type = "password";
            }
            var blur = function(){
                this.parentNode.classList.remove("focus-inp");
                if(this.value===""){
                    this.value=this.getAttribute("tipmsg");
                    if(this.id==="password" || this.id==="re-password" && this.type==="password") this.type = "text";
                }
                if(this.id==="re-password"){
                    var parent = this.parentNode;
                    if(!(this.value === _this.$passInp.value)){
                        parent.classList.remove("focus-inp");
                        parent.classList.add("focus-inp-error");
                    }else{
                        parent.classList.add("focus-inp");
                        parent.classList.remove("focus-inp-error");
                    }
                }else{
                    _this.check(this);
                }
            };
            this.$cvsCode.onclick = function(){
                _this.code = _this.reCode();
            }
            $(this.$ele).on("input","input",input);
            $(this.$ele).on("focus","input",focus);
            $(this.$ele).on("blur","input",blur);
        },
        loadHtml:function(){
            $("footer").load("login-reg-common.html .f-contain");
        },
        reCode:function(){
            return getCode(this.$cvsCode,120,52);
        },
        // ajax检测用户是否存在，且密码是否正确
        ajaxCheck:function(){
            var options = {
                method:"POST",
                data:{
                    username:this.$userInp.value,
                    password:hex_md5(this.$passInp.value),
                    type: false
                },
                success:callBack
            };
            var callBack = null;
            if(this.type === "login"){
                options.success = this.ajaxLogin();
                sendAjax("php/login.php",options);
            }else if(this.type === "reg"){
                options.success = this.ajaxReg();
                sendAjax("php/reg.php",options);
            }
        },
        ajaxLogin:function(){
            var _this = this;
            return function(data) {
                // 如果验证通过，跳转到用户页
                if(data.code==200){
                    // 如果勾选了七天免登录，则给token设置七天后过期，否则浏览器关闭就自动退出登录
                    var time = _this.$sevenDay.checked ? "_true; " 
                        + "max-age=" + (7*24*60*60) + ";" : ";";
                    document.cookie = "zangbaoToken=" + data.token + time;
                    location.href = "index.html";
                }else{
                    // 账号或密码错误，刷新验证码
                    _this.code = _this.reCode();
                    alert(data.msg);
                }
            }
        },
        ajaxReg:function(){
            var _this = this;
            return function(data) {
                if(data.code == 200){
                    document.cookie = "zangbaoToken=" + data.token + ";";
                    alert("注册成功");
                    location.href = "index.html";
                }else{
                    // 注册失败，刷新验证码
                    _this.code = _this.reCode();
                    alert(data.msg);
                }
            }
        },
        // 正则检测用户和密码格式是否正确
        regExpCheck:function(){
            // 如果是注册，增加再次输入密码验证，是否同意协议验证
            if(this.type=="reg"){
                if(!(this.$protocol.checked)){
                    alert("请勾选服务协议");
                    return false;
                }
                var rePCheck = this.$passInp.value === this.$rePassInp.value;
                this.$rePassInp.focus();
                this.$rePassInp.blur();
            }else{
                var rePCheck = true;
            }
            var uCheck = this.check(this.$userInp);
            var pCheck = this.check(this.$passInp);
            var cCheck = this.check(this.$checkcode);
            if(uCheck && pCheck && rePCheck && cCheck){
                return true;
            }else{
                return false;
            }
        },
        check:function(inp){
            var flag = true;
            var val = inp.value;
            var parent = inp.parentNode;
            var reg = new RegExp(inp.getAttribute("regmsg"));
            if(!reg.test(val)){
                parent.classList.remove("focus-inp");
                parent.classList.add("focus-inp-error");
                flag = false;
            }else{
                parent.classList.add("focus-inp");
                parent.classList.remove("focus-inp-error");
            }
            if(inp.id === "checkcode"){
                if(!(inp.value.toUpperCase()===this.code)){
                    parent.classList.remove("focus-inp");
                    parent.classList.add("focus-inp-error");
                    flag = false;
                }
            }
            return flag;
        },
        // 获取dom元素，可以通过父级查找子元素
        $:function(ele,parent){
            if(typeof ele === "string"){
                if(parent){
                    ele = parent.querySelectorAll(ele);
                }else{
                    ele = document.querySelectorAll(ele);
                }
                ele = ele.length > 1 ? ele : ele[0];
            }
            return ele;
        }
    }
}());