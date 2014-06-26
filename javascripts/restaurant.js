
function Get_para(parameter){
	var url=window.location.toString();
	var str="";
	var str_value="";
	if(url.indexOf("?")!=-1){
		var ary=url.split("?")[1].split("&");
		for(var i in ary){
			str=ary[i].split("=")[0];
			if (str == parameter) {
				str_value = decodeURI(ary[i].split("=")[1]);
			}
		}
	}
	return str_value;	
}

function Show_content(){
	var ID = Get_para("id");
	$.support.cors = true;
	var data;
    $.get('test.txt', function(data) {
		var Food = data.split("---------------------");		
		
		var flag=0;
		if(ID>1)
			flag = 1;
		var info = Food[ID-1].split("\n");
		document.getElementById("name").innerHTML=info[0+flag]+"<a href=\"restaurant_score.html\"><image src=\"image/score.png\" width = \"60px\"></a>";
		document.getElementById("Address").innerHTML=info[2+flag];
		
		var foods="";
		for(i=5+flag;i<info.length-1;i=i+2){
			foods = foods+"<tr><td>" + info[i] + "</td><td>: ★★★☆☆</td></tr>";					
		}
		document.getElementById("Foods").innerHTML = foods;
    });
}
