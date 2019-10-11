<?php

include "conn.php";

$conn->query('SET NAMES UTF8');//设置字符编码

$result=$conn->query("select * from list");//获取整个表里面的数据(记录集)

//$result->num_rows:获取记录集的条数
//$result->fetch_assoc():获取第一条记录,转换成数组。每执行一次，往下一条获取。
//$result->fetch_assoc():获取第二条记录,转换成数组。每执行一次，往下一条获取。

//获取所有的记录集，生成json格式的数据。
$arrdata=array();//声明一个空数组
for($i=0;$i<$result->num_rows;$i++){
    $arrdata[$i]=$result->fetch_assoc();//循环获取记录(数组)，给另外一个数组，形成二维数组。
}
echo json_encode($arrdata);//输出json格式的数据。


$conn->close();//关闭连接