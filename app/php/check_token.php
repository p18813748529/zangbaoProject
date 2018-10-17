<?php
    header("Content-type:text/html; charset=utf-8");
    include "public/connect_db.php";
    $inp = json_decode(file_get_contents("php://input"));
    $cookie = explode("_",$_COOKIE["zangbaoToken"]);
    $username = $cookie[0];
    $token = $cookie[1];
    $type = $inp -> {"type"};
    $sqlUpdate = "UPDATE user SET token='' WHERE username='$username'";
    $sqlSelect = "SELECT * FROM user WHERE username='$username' AND token='$token'";
    $coon = new db();
    $row = $coon -> Query($sqlSelect,2);
    // 如果查找到用户
    if($row){
        // type为false代表登录，为true代表退出登录(此时将该账户数据库的token值清除)
        if($type){
            $result = $coon -> Query($sqlUpdate,3);
            if($result){
                $res = array("code" => 800, "msg" => "", "username" => '');
            }
        }else{
            // 匹配正确，把用户名和购物车内容返回
            $res = array("code" => 200, "msg" => "", "username" => $username, "shopCar" => $row["shopCar"]);
        }
    }else{
        $res = array("code" => 1000, "msg" => "token值不匹配", "username" => "");
    }
    echo json_encode($res);
?>