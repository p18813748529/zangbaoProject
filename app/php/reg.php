
<?php
    header("Content-type:text/html; charset=utf-8");
    include "public/connect_db.php";
    include "public/rankey.php";
    $inp = json_decode(file_get_contents("php://input"));
    $username = $inp -> {"username"};
    $password = $inp -> {"password"};
    $rankey = new rankey();
    $token = $rankey -> randomkeys(20);
    $sqlSelect = "SELECT * FROM user WHERE username='$username'";
    $sqlInsert = "INSERT INTO user (username,password,token) VALUES ('$username','$password','$token');";
    $coon = new db();
    $rows = $coon -> Query($sqlSelect,2);
    if($rows){
        $res = array("code" => 700, "msg" => "用户名已存在", "token" => "");
    }else{
        // 如果用户名不存在，则给该用户注册，并赋予其一个随机token
        $resultInsert = $coon -> Query($sqlInsert,3);
        if($resultInsert){
            $res = array("code" => 200, "msg" => "", "token" => $username."_".$token);
        }else{
            $res = array("code" => 600, "msg" => "token值出错", "token" => "");
        }
    }
    echo json_encode($res);
?>