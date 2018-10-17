<?php
    // 返回的数据类型为json结构
    header("Content-Type: application/json;charset=utf-8");
    // 允许所有域名跨域
    header("Access-Control-Allow-Origin:*");
    include "public/connect_db.php";
    $address = file_get_contents("../json/address.json");
    // 获取商品id数组
    $shopId = json_decode($_GET["shopId"]);
    // 创建数据库连接对象
    $coon = new db();
    // 将获取到的商品id数组和sql语句拼接
    $sql = "SELECT * from shop WHERE id=".join(" or id=",$shopId);
    $rows = $coon -> Query($sql, 1);
    // 如果可以找到商品,返回关联数组, 找不到返回null
    if($rows) {
      // 查到结果
      $arr = array("code" => "200", "msg" => "", "data" => json_encode($rows), "address" => $address);
    } else {
      // 没查到
      $arr = array("code" => "1000", "msg" => "找不到该商品");
    }
    echo json_encode($arr);
  ?>