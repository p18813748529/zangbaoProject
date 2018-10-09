
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
    $sqlSelect = "SELECT * FROM user WHERE username='$username'";
    $sqlInsert = "INSERT INTO user (username,password,token) VALUES ('$username','$password','$token');";
    $coon = new mysqli("localhost","root","","zangbaoproject","3306");
    $resultSelect = $coon -> query($sqlSelect);
    $rows = $resultSelect -> fetch_assoc();
    if($rows){
        // $res["type"] = "yes";
        $res = array("code" => 700, "msg" => "用户名已存在", "token" => "");
    }else{
        $resultInsert = $coon -> query($sqlInsert);
        // $res["type"] = $resultInsert;
        if($resultInsert){
            $res = array("code" => 200, "msg" => "", "token" => $username."_".$token);
        }else{
            $res = array("code" => 600, "msg" => "token值出错", "token" => "");
        }
    }
    echo json_encode($res);
?>