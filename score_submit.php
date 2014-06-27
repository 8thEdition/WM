<!DOCTYPE html>
<html>
<head>
	<title>Information</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

	<script type="text/javascript" src="javascripts/restaurant.js"></script>
	<script type="text/javascript" src="javascripts/jquery-1.4.3.js"></script>
	
</head>
<body>
	<center><table height = "280px">感謝您的意見!</table></center>
<?	
	$id = $_GET["id"];
	$fcount = $_GET["fcount"];
	$flag = 0;
	
	$Upload_folder="data/Feedback/".$id."/";
	if (!is_dir("data/Feedback/".$id)){
	  mkdir($Upload_folder);
	}
	
	$All_score = $_POST["All_score"];
	if($All_score != ""){
		$flag = 1;
		$file = fopen("data/Feedback/".$id."/All_score.txt","a+");
		fwrite($file,$All_score." ");
		fclose($file);
	}
	
	for($i=0 ; $i < $fcount ; $i++){
		$Food_score = $_POST["Food_".$i];
		if($Food_score != ""){
			$flag = 1;
			$file_food = fopen("data/Feedback/".$id."/".$i.".txt","a+");
			fwrite($file_food,$Food_score." ");
			fclose($file_food);
		}		
	}
?>
</body>
</html>