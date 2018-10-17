<?php
    header("Content-type:text/html; charset=utf-8");
    include "public/connect_db.php";
    include "public/rankey.php";
    $inp = json_decode(file_get_contents("php://input"));
    $username = $inp -> {"username"};
    $password = $inp -> {"password"};
    $rankey = new rankey();
    $token = $rankey -> randomkeys(20);
    $sqlUpdate = "UPDATE user SET token='$token' WHERE username='$username' AND password='$password'";
    $sqlSelect = "SELECT * FROM user WHERE username='$username' AND password='$password'";
    $coon = new db();
    $row = $coon -> Query($sqlSelect,2);
    $res = array();
    if($row){
        // 如果查询到该用户，则赋予该用户一个随机token
        $result = $coon -> Query($sqlUpdate,3);
        if($result){
            $res = array("code" => 200, "msg" => "", "token" => $username."_".$token);
        }else{
            $res = array("code" => 600, "msg" => "token值出错", "token" => "");
        }
    }else{
        $res = array("code" => 1000, "msg" => "账号或密码错误", "token" => "");
    }
    echo json_encode($res);
?>