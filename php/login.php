<?php
    header("Content-type:text/html; charset=utf-8");
    function randomkeys($length)
    {
     $pattern='1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLOMNOPQRSTUVWXYZ';
     $key = '';
     for($i=0;$i<$length;$i++)
     {
       $key .= $pattern{mt_rand(0,35)};    //生成php随机数
     }
     return $key;
    }
    $inp = json_decode(file_get_contents("php://input"));
    $username = $inp -> {"username"};
    $password = $inp -> {"password"};
    $token = randomkeys(20);
    $sqlUpdate = "UPDATE user SET token='$token' WHERE username='$username' AND password='$password'";
    $sqlSelect = "SELECT * FROM user WHERE username='$username' AND password='$password'";
    $coon = new mysqli("localhost","root","","zangbaoproject","3306");
    $result = $coon -> query($sqlSelect);
    $row = $result -> fetch_assoc();
    $res = array();
    if($row){
        $result = $coon -> query($sqlUpdate);
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