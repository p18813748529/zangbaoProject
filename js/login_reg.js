
var login_reg = (function(){
    return {
        init:function(ele,type){
            this.$ele = this.$(ele);
            this.type = type;
            this.$userInp = this.$("#username",this.$ele);
            this.$passInp = this.$("#password",this.$ele);
            this.$rePassInp = this.$("#re-password",this.$ele);
            this.$subBtn = this.$(".logReg-btn",this.$ele);
            this.event();
        },
        // 事件处理
        event:function(){
            var _this = this;
            this.$subBtn.onclick = function(){
                // 如果格式正确,进行ajax检测
                if(_this.regExpCheck()){
                    _this.ajaxCheck();
                }
            };
            var input = function(){
                // _this.checkUser();
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
                    if(this.id==="password" && this.type==="password") this.type = "text";
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
            this.$userInp.oninput = input;
            this.$passInp.oninput = input;
            this.$rePassInp.oninput = input;
            this.$userInp.onfocus = focus;
            this.$passInp.onfocus = focus;
            this.$rePassInp.onfocus = focus;
            this.$userInp.onblur = blur;
            this.$passInp.onblur = blur;
            this.$rePassInp.onblur = blur;
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
                    document.cookie = "zangbaoToken=" + data.token + ";";
                    location.href = "http://localhost:8998/cangbaoProject/";
                }else{
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
                    location.href = "http://localhost:8998/cangbaoProject/";
                }else{
                    alert(data.msg);
                }
            }
        },
        // 正则检测用户和密码格式是否正确
        regExpCheck:function(){
            var uCheck = this.check(this.$userInp);
            var pCheck = this.check(this.$passInp);
            var rePCheck = this.$passInp.value === this.$rePassInp.value;
            if(uCheck && pCheck && rePCheck){
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