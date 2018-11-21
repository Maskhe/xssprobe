<?php 
$data = $_GET['data'];
$data = json_decode($data);
function write($file,$data){
	//将客户端JSON数据按照一定格式写入data.txt
	foreach($data as $key=>$value){
		if(is_array($value)){
			fwrite($file,$key."\r\n");
			write($file,$value);
		}else{
			fwrite($file,$key." : ".$value."\r\n");			
		}
	}
}
function get_real_ip(){
	//获取真实ip
	$ip = false;
	if(!empty($_SERVER['HTTP_CLIENT_IP'])){
		$ip = $_SERVER['HTTP_CLIENT_IP'];
	}
	if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
		$ips = explode(", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
		if($ip){
			array_unshift($ips,$ip);
			$ip = FALSE;
		}
		for($i = 0; $i < count($ips); $i++){
			if(!eregi("^(10|172\.16|192\.168)\.",$ips[$i])){
				$ip = $ips[$i];
				break;
			}
		}
	}
	return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
}
function get_referer(){
	//获取referer
	return $_SERVER['HTTP_REFERER'];
}

$file = fopen("data.txt","a+");
fwrite($file,"ip:".get_real_ip()."\r\n");
fwrite($file,"time:".date("Y-m-d H:i:s")."\r\n");
fwrite($file,"referer1:".get_referer()."\r\n");
write($file,$data);

fclose($file);
?>