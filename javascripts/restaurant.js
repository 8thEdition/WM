
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
    $.get('test.txt', function(data) {
		var Food = data.split("---------------------");		

		var info = Food[ID-1].split("\n");
		if(ID>1)
			info.shift();
		if(content == 1)
			Restaurant_content(info);
		else if(content == 2)
			Scoring_content(info);
    });	
}

function Scoring_content(info){
	var content;

	content="對於該家餐廳，您認為此店家<br/>";
	content=content + "<form>";
	content=content + "<input type=\"radio\" name=\"All_score\" value=\"1\"> 極差";
	content=content + "<input type=\"radio\" name=\"All_score\" value=\"2\"> 差強人意";
	content=content + "<input type=\"radio\" name=\"All_score\" value=\"3\"> 普通";
	content=content + "<input type=\"radio\" name=\"All_score\" value=\"4\"> 不錯";
	content=content + "<input type=\"radio\" name=\"All_score\" value=\"5\"> 很棒!";
	content=content + "</form><br/>";
	
	for(i=5;i<info.length-1;i=i+2){
		content = content + "<br/>";
		content = content + "對於該家餐廳，您認為<b>" + info[i] + "</b>";
		content = content + "<form>";
		content = content + "<input type=\"radio\" name=\"Food_"+ (i-4) +"\" value=\"1\"> 極差";
		content = content + "<input type=\"radio\" name=\"Food_"+ (i-4) +"\" value=\"2\"> 差強人意";
		content = content + "<input type=\"radio\" name=\"Food_"+ (i-4) +"\" value=\"3\"> 普通";
		content = content + "<input type=\"radio\" name=\"Food_"+ (i-4) +"\" value=\"4\"> 不錯";
		content = content + "<input type=\"radio\" name=\"Food_"+ (i-4) +"\" value=\"5\"> 很棒!";
		content = content + "</form><br/>";				
	}

	content=content +"<br/>對於該家餐廳，您認為<input type=\"text\" name=\"else_name\"><br/>";
	content=content + "<form>";
	content=content + "<input type=\"radio\" name=\"else\" value=\"1\"> 極差";
	content=content + "<input type=\"radio\" name=\"else\" value=\"2\"> 差強人意";
	content=content + "<input type=\"radio\" name=\"else\" value=\"3\"> 普通";
	content=content + "<input type=\"radio\" name=\"else\" value=\"4\"> 不錯";
	content=content + "<input type=\"radio\" name=\"else\" value=\"5\"> 很棒!";
	content=content + "</form><br/><center><input type=\"button\" value=\"送出\"></br></br></center>";
	
	document.getElementById("name").innerHTML="<a href=\"restaurant.html?id=" + Get_para("id")+ "\">" + "<image src=\"image/back.png\" width=\"40px\">" + "</a>";
	document.getElementById("score").innerHTML=content;	
}

function Restaurant_content(info){

	document.getElementById("name").innerHTML=info[0]+"<a href=\"restaurant_score.html?id=" + Get_para("id")+ "\"><image src=\"image/score.png\" width = \"60px\"></a>";
	document.getElementById("Address").innerHTML=info[2];
	
	var foods="";
	for(i=5;i<info.length-1;i=i+2){
		foods = foods+"<tr><td>" + info[i] + "</td><td>: ★★★☆☆</td></tr>";					
	}
	document.getElementById("Foods").innerHTML = foods;
}
