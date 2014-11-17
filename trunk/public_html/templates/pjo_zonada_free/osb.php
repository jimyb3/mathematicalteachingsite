<?php
$host = "localhost";
$username = "imathsit";
$password = "30FILLOS";
$db_name = "imathsit_imathDB"; //database name

//connect to mysql server
$mysqli = new mysqli($host, $username, $password, $db_name);



//check if any connection error was encountered
if(mysqli_connect_errno()) {
echo "Error: Could not connect to database.";
exit;
}



$grade=$_POST['grade'];  //access data like this
$nameId=$_POST['nameId'];
echo "Είσαι ο $nameId και εγραψες $grade";

?>