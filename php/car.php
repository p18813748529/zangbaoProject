<?php
    header("Content-type:text/html; charset=utf-8");
    include "public/connect_db.php";
    $inp = json_decode(file_get_contents("php://input"));
    $cookie = explode("_",$_COOKIE["zangbaoToken"]);
    $username = $cookie[0];
    $token = $cookie[1];
    // $username = $inp -> {"username"};
    // $token = $inp -> {"token"};
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
            // $res = array("code" => 200, "data" => $shopList);
            // 获取商品id数组
            $shopId = array();
            for($i = 0; $i < count($shopList); $i++){
                array_push($shopId,$shopList[$i] -> {"id"});
            }
            // 将获取到的商品id数组和sql语句拼接
            $sql = "SELECT * from shop WHERE id=".join(" or id=",$shopId);
            $rows = $coon -> Query($sql, 1);
            // 如果可以找到商品,返回关联数组, 找不到返回null
            if($rows) {
                // 查到结果
                for($i = 0; $i < count($rows); $i++){
                    // $rows[$i]是对象字符串，但是属性名没有引号包裹，json对象中属性名必须引号包裹
                    // 所有直接json解析会报错，因此先转为正确的json再解析
                    $rows[$i] = json_decode(json_encode($rows[$i]));
                    for($j = 0; $j < count($shopList); $j++){
                        if($shopList[$j] -> {"id"} == $rows[$i] -> {"id"}){
                            $rows[$i] -> {"count"} = $shopList[$j] -> {"count"};
                        }
                    }
                }
                $res = array("code" => 200, "msg" => "", "data" => json_encode($rows));
            } else {
                // 没查到
                $arr = array("code" => 1000, "msg" => "找不到该商品");
            }
        }
    }else{
        $res = array("code" => 1000, "msg" => "用户名与token不匹配", "username" => "");
    }
    echo json_encode($res);
?>