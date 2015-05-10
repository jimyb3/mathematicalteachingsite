<?php
$host = 'localhost';

$user = 'imathsit_imathDB';

$password = 'g.8LSP2d6-';
	
$db = 'imathsit_imathDB';

//connect to mysql server
$conn = mysqli_connect($host, $user, $password, $db);


//check if any connection error was encountered
if(!$conn) {
	echo "Error!!!";
    
exit;
}

$grade=$_POST['grade'];  //access data like this
$nameId=$_POST['nameId'];
$lesson=$_POST['lesson'];
//$query="INSERT INTO jos_grades (username, logismos1) VALUES (\"$nameId\", $grade)";
//$result=$conn->query($query);
//echo "Είσαι ο $nameId και εγραψες $grade ΝΕΑ ΕΙΣΑΓΩΓΗ";


/*$query="UPDATE jos_users SET grade=$grade WHERE username=\"$nameId\"";
$result=$conn->query($query);
echo "Είσαι ο $nameId και εγραψες $grade ΑΝΑΒΑΘΜΙΣΗ";
mysqli_close($conn);*/

$query="SELECT * FROM jos_grades WHERE username=\"$nameId\"";


$result=$conn->query($query);

if(mysqli_num_rows($result)>0){
	
	$query="UPDATE jos_grades SET $lesson=$grade WHERE username=\"$nameId\"";
	$result=$conn->query($query);
	if($result){
		//echo "Είσαι ο $nameId και εγραψες $grade ΑΝΑΒΑΘΜΙΣΗ";
		echo $grade;
	}else{
		//echo "Λάθος από Αναβάθμιση";
		echo "Προέκυψε κάποιο λάθος, προσπαθήστε ξανά αργότερα.";
		}
}else{
	$query="INSERT INTO jos_grades (username,$lesson) VALUES (\"$nameId\",$grade)";
	$result=$conn->query($query);
	if($result){
		//echo "Είσαι ο $nameId και εγραψες $grade ΝΕΑ ΕΙΣΑΓΩΓΗ";
		echo $grade;
	}else{
		//echo "Λάθος από Εισαγωγή!";
		echo "Προέκυψε κάποιο λάθος, προσπαθήστε ξανά αργότερα.";
		}
	
	
}
$today=date('d/m/Y');
$query="INSERT INTO jos_".$lesson."_grades (username,grade,date) VALUES (\"$nameId\",$grade,\"$today\")";
$conn->query($query);
//$result->close();*/
mysqli_close($conn);
?>