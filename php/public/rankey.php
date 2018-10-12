<?php
    class rankey{
        public function randomkeys($length){
            $pattern='1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLOMNOPQRSTUVWXYZ';
            $key = '';
            for($i=0;$i<$length;$i++)
            {
            $key .= $pattern{mt_rand(0,35)};    //生成php随机数
            }
            return $key;
        }
    }
?>