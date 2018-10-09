<?php
    // 获取用户名
    // 返回的数据类型为json结构
    header("Content-Type: application/json;charset=utf-8");
    // 允许所有域名跨域
    header("Access-Control-Allow-Origin:*");
    include "public/connect_db.php";
    $sql = "SELECT * from shop WHERE ";
    // 获取传输的json字符串
    $shopId = json_decode($_GET["shopId"]);
    $sql.="id=$shopId[0]";
    for ($i=1; $i < count($shopId); $i++) { 
      $sql." or id=".$shopId[$i];
    }
    $coon = new db();
    // 判断用户名称是否存在
    $rows = $coon -> Query($sql, 2);
    // 如果可以找到,返回关联数组, 找不到返回null
    if($rows) {
      // 查到结果
      $arr = array("code" => "200", "msg" => "", "data" => json_encode($rows));

    } else {
      // 没查到
      $arr = array("code" => "1000", "msg" => "找不到该商品");
    }
    echo json_encode($arr);
  ?>