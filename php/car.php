<?php
    header("Content-type:text/html; charset=utf-8");
    include "public/connect_db.php";
    $inp = json_decode(file_get_contents("php://input"));
    $username = $inp -> {"username"};
    $token = $inp -> {"token"};
    $shop = $inp -> {"shop"};
    $type = $inp -> {"type"};
    $sqlSelect = "SELECT * FROM user WHERE username='$username' AND token='$token'";
    $coon = new db();
    $row = $coon -> Query($sqlSelect,2);
    // 如果查找到用户
    if($row){
        //获取数据库的购物车
        $shopCar = $row["shopCar"];
        if($row["shopCar"]==""){
            $shopCar = "[]";
        }
        $shopList = json_decode($shopCar);
        if($type=="add"){
            for($i = 0; $i < count($shopList); $i++){
                // 用户购物车已存在该商品，数量相加
                if($shop -> {"id"} === $shopList[$i] -> {"id"}){
                    $shopList[$i] -> {"count"} = (int)$shopList[$i] -> {"count"} + (int)$shop -> {"count"};
                    $r = json_encode($shopList[$i]);
                    break;
                }
            }
            // 用户购物车不存在该商品，添加该商品
            if($i==count($shopList)){
                array_push($shopList,$shop);
            }
            // 最后添加到用户的数据库
            $shopList = json_encode($shopList);
            $sqlUpdate = "UPDATE user SET shopCar='$shopList' WHERE username='$username'";
            $row = $coon -> Query($sqlUpdate,3);
            if($row){
                $res = array("code" => 200, "msg" => "");
            }else{
                $res = array("code" => 500, "msg" => "添加失败");
            }
        }else if($type=="get"){
            // 将购物车数据返回
            $res = array("code" => 200, "shopList" => $shopList);
        }
    }else{
        $res = array("code" => 1000, "msg" => "用户名与token不匹配", "username" => "");
    }
    echo json_encode($res);
?>