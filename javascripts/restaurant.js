
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

function Get_Restaurant(){
	var ID = Get_para("id");
	var data;	
	
	$.support.cors = true;
    $.get('test.txt', function(data) {
		var Food = data.split("---------------------");		

		var info = Food[ID-1].split("\n");
		if(ID>1)
			info.shift();
		Restaurant_content(info);
    });	
}

function Restaurant_content(info){

	document.getElementById("name").innerHTML=info[0]+"<a href=\"restaurant_score.html\"><image src=\"image/score.png\" width = \"60px\"></a>";
	document.getElementById("Address").innerHTML=info[2];
	
	var foods="";
	for(i=5;i<info.length-1;i=i+2){
		foods = foods+"<tr><td>" + info[i] + "</td><td>: ★★★☆☆</td></tr>";					
	}
	document.getElementById("Foods").innerHTML = foods;
}
