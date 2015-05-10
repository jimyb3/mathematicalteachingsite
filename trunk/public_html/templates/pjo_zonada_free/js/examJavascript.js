/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function checkValue(choise, grade) {
    if (choise == 'yes') {
        return grade;
    } else {
        return grade - 6;
    }
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function resultExam() {
    grade = 100;
    for (var i = 1; i <= 15; i++) {
        grade = checkValue(document.querySelector('input[name="q' + i + '"]:checked').value, grade);
    }
    //alert(grade);
   nameId=document.getElementById("nameId").innerHTML;
   
    //document.getElementById("con").after('<img src ="/images/ajax-loader.gif" alt="Currently loading" id = "loading" />');
    $.ajax({
	    
        type:"POST",
        url: "/templates/pjo_zonada_free/osb.php",
        data: {grade:grade, nameId:nameId, lesson:lesson},
        success: function(result){
        //do stuff after the AJAX calls successfully completes
        //alert("τρέχει σωστά ο Αιαντας!");
			var div = document.getElementById("infoGradeDiv");
				div.style.width = "550px";
				div.style.height = "330px";
				div.style.backgroundImage = "url('/images/board-597238_1280.jpg')";
if(result<50){			
div.innerHTML='<p style="font-size: 24px;margin-top:21px;margin-left:15px;">Η βαθμολογία σου είναι: </p><p style="color:red;font-size: 235px;font-family: Arial, Helvetica, sans-serif;height:0px;margin-top:100px;margin-left:130px;margin-bottom:45px">'+result+'</p><br><div style="width:550px;margin-left:114px;margin-top:79px"><input type="button" value="Κλείσιμο" onclick="$(this).parent().parent().remove()" /><input type="button" value="Δοκίμασε ξανά!" onclick="location.reload()" /><input type="button" value="Ιστορικό βαθμολογιών" onclick="window.location.href=\'http://imathsite.net/index.php/test/2015-03-14-21-15-20\'" /></div>';
}else if(result<70){
div.innerHTML='<p style="font-size: 24px;margin-top:21px;margin-left:15px;">Η βαθμολογία σου είναι: </p><p style="color:orange;font-size: 235px;font-family: Arial, Helvetica, sans-serif;height:0px;margin-top:100px;margin-left:130px;margin-bottom:45px">'+result+'</p><br><div style="width:550px;margin-left:114px;margin-top:79px"><input type="button" value="Κλείσιμο" onclick="$(this).parent().parent().remove()" /><input type="button" value="Δοκίμασε ξανά!" onclick="location.reload()" /><input type="button" value="Ιστορικό βαθμολογιών" onclick="window.location.href=\'http://imathsite.net/index.php/test/2015-03-14-21-15-20\'" /></div>';
}else{
div.innerHTML='<p style="font-size: 24px;margin-top:21px;margin-left:15px;">Η βαθμολογία σου είναι: </p><p style="color:lime;font-size: 235px;font-family: Arial, Helvetica, sans-serif;height:0px;margin-top:100px;margin-left:130px;margin-bottom:45px">'+result+'</p><br><div style="width:550px;margin-left:114px;margin-top:79px"><input type="button" value="Κλείσιμο" onclick="$(this).parent().parent().remove()" /><input type="button" value="Δοκίμασε ξανά!" onclick="location.reload()" /><input type="button" value="Ιστορικό βαθμολογιών" onclick="window.location.href=\'http://imathsite.net/index.php/test/2015-03-14-21-15-20\'" /></div>';
}
			
			
			
		
    }

    });
    
}

function uncheckError() {
    for (var i = 1; i <=15; i++) {
        var uncheck = document.querySelector('input[name="q' + i + '"]:checked');
        if (uncheck == null) {
            alert("Ξέχασες να απαντήσεις στην ερώτηση " + i + ".");
            return false;
        }
    }
    resultExam();
}