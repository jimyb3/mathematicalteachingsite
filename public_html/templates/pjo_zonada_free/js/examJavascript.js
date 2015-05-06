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
				div.style.width = "500px";
				div.style.height = "330px";
div.style.background = "rgba(0, 0, 0, 0.7)";			
div.innerHTML='<img src ="http://www.livinggreenandfrugally.com/wp-content/uploads/2014/01/the-winner-is.jpg" style="border-radius:0px;"/><br><br><p style="font-size: 24px;">'+result+'</p><br><input type="button" value="Δοκίμασε ξανά!" onclick="location.reload()" /><input type="button" value="Κλείσιμο" onclick="$(this).parent().remove()" /><input type="button" value="Ιστορικό βαθμολογιών" onclick="window.location.href=\'http://imathsite.net/index.php/test/2015-03-14-21-15-20\'" />';
			
			
			
		
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