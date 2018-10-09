<?php
    header("Content-type:text/html; charset=utf-8");
    $inp = json_decode(file_get_contents("php://input"));
    $username = $inp -> {"username"};
    $token = substr($_COOKIE["zangbaoToken"],stripos($_COOKIE["zangbaoToken"],"_")+1);
    $type = $inp -> {"type"};
    $sqlUpdate = "UPDATE user SET token='' WHERE username='$username'";
    $sqlSelect = "SELECT * FROM user WHERE username='$username' AND token='$token'";
    $coon = new mysqli("localhost","root","","zangbaoproject","3306");
    $result = $coon -> query($sqlSelect);
    $row = $result -> fetch_assoc();
    // 如果查找到用户
    if($row){
        // type为false代表登录，为true代表退出登录(此时将该账户数据库的token值清除)
        if($type){
            $result = $coon -> query($sqlUpdate);
            if($result){
                $res = array("code" => 800, "msg" => "", "username" => '');
            }
        }else{
            $res = array("code" => 200, "msg" => "", "username" => $username);
        }
    }else{
        $res = array("code" => 1000, "msg" => "token值与用户不匹配", "username" => "");
    }
    echo json_encode($res);
?>