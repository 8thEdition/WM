
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

function Get_Restaurant(content){
	var ID = Get_para("id");
	var data;	
	
	$.support.cors = true;
    $.get('data/result.txt', function(data) {
		var Food = data.split("--------------------");		

		var info = Food[ID].split("\n");
		if(ID>0)
			info.shift();
		if(content == 1)
			Restaurant_content(info);
		else if(content == 2)
			Scoring_content(info);
    });	
}

function Scoring_content(info){
	var content;
	var fcount = (info.length-6)/2;
	content="對於該家餐廳，您認為此店家<br/>";
	content=content + "<form action=\"score_submit.php?id=" + Get_para("id") + "&fcount=" + fcount + "\" method=\"post\">";
	content=content + "<input type=\"radio\" name=\"All_score\" value = \"1\"> 極差　";
	content=content + "<input type=\"radio\" name=\"All_score\" value = \"2\"> 欠佳　";
	content=content + "<input type=\"radio\" name=\"All_score\" value = \"3\"> 普通　";
	content=content + "<input type=\"radio\" name=\"All_score\" value = \"4\"> 不錯　";
	content=content + "<input type=\"radio\" name=\"All_score\" value = \"5\"> 很棒";
	content=content + "<br/>";
	
	for(i=5;i<info.length-1;i=i+2){
		content = content + "<br/>";
		content = content + "對於該家餐廳，您認為<b>" + info[i] + "</b><br/>";
		content = content + "<input type=\"radio\" name=\"Food_"+ (i-5)/2 +"\" value = \"1\"> 極差　";
		content = content + "<input type=\"radio\" name=\"Food_"+ (i-5)/2 +"\" value = \"2\"> 欠佳　";
		content = content + "<input type=\"radio\" name=\"Food_"+ (i-5)/2 +"\" value = \"3\"> 普通　";
		content = content + "<input type=\"radio\" name=\"Food_"+ (i-5)/2 +"\" value = \"4\"> 不錯　";
		content = content + "<input type=\"radio\" name=\"Food_"+ (i-5)/2 +"\" value = \"5\"> 很棒";
		content = content + "<br/>";				
	}

	content=content + "<br/><center><input type=\"submit\" value=\"送出\"></form></br></br></center>";
	
	document.getElementById("name").innerHTML="<a href=\"restaurant.html?id=" + Get_para("id")+ "\">" + "<image src=\"image/back.png\" width=\"40px\">" + "</a>";
	document.getElementById("score").innerHTML=content;	
}

function Restaurant_content(info){
	
	
	document.getElementById("name").innerHTML= info[0] + "<a href=\"restaurant_score.html?id=" + Get_para("id")+ "\"><image src=\"image/score.png\" width = \"60px\"></a>";
	document.getElementById("Address").innerHTML=info[2];
	
	var foods="";
	for(i=5;i<info.length-1;i=i+2){
		foods = foods+"<tr><td>" + info[i] + "</td><td>: " + Show_start(info[i+1].split(" ")[1]) + "</td></tr>";					
	}
	document.getElementById("Foods").innerHTML = foods;
}

function Show_start(score){
	var content = "";
	if(score <= 1 )
		content = "★☆☆☆☆";
	else if(score <= 2 )
		content = "★★☆☆☆";
	else if(score <= 3)
		content = "★★★☆☆";
	else if(score <= 4)
		content = "★★★★☆";
	else
		content = "★★★★★";
	return content;
}