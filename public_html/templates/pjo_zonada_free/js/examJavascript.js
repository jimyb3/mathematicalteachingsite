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
    var response = document.createElement("p");
    response.id="response";
    nameId=document.getElementById("nameId").innerHTML;
   
    //document.getElementById("con").after('<img src ="/images/ajax-loader.gif" alt="Currently loading" id = "loading" />');
    $.ajax({
	    
        type:"POST",
        url: "/templates/pjo_zonada_free/osb.php",
        data: {grade:grade, nameId:nameId, lesson:lesson},
        success: function(result){
        //do stuff after the AJAX calls successfully completes
        //alert("τρέχει σωστά ο Αιαντας!");
        response.remove();
	    response.innerHTML=result;
		insertAfter(document.getElementById("con"),response);
			var div = document.getElementById("infoGradeDiv");
			div.innerHTML='<img src ="http://www.livinggreenandfrugally.com/wp-content/uploads/2014/01/the-winner-is.jpg" style="border-radius:0px;"/><br><br>'+result;
			
			
			
		
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