﻿/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
 //inverse matrix=antistrofos pinakas, outo me ta det
function inverseMatrix(matrix1) {
	if (tbl = document.getElementById(matrix1+"inverted"))
    {
        alert('Υπάρχει ήδη ο αντίστροφος πίνακας!');
    }
    else{
    var tableRowLength = document.getElementById(matrix1).rows.length;
    var tableCellsLength = document.getElementById(matrix1).rows[0].cells.length;
    if (tableRowLength === tableCellsLength) {
        var myTable = new Array(tableRowLength);
        for (var i = 0; i < tableRowLength; i++) {
            myTable[i] = new Array(tableCellsLength);
        }
        for (i = 0; i < tableRowLength; i++) {
            for (var j = 0; j < tableCellsLength; j++) {
                myTable[i][j] = parseInt(document.getElementById(matrix1).rows[i].cells[j].innerHTML);
            }
        }
//alert(myTable[1]);
        if (math.det(myTable) === 0) {
            alert("Ο πίνακας έχει ορίζουσα 0, άρα δεν μπορεί να έχει αντίστροφο!");
        }

        var inversedMatrix = [];
        inversedMatrix = math.inv(myTable);

        var inversedMatrixSize = [];
        inversedMatrixSize = math.size(inversedMatrix);

        var inversedMatrixRows = inversedMatrixSize[0, 0];


        var inversedMatrixCols = inversedMatrixSize[0, 1];

        var myTableDiv = document.getElementById(matrix1+"div");
        var table = document.createElement('TABLE');
        table.id = matrix1+"inverted";
        table.border = '1';

        var tableBody = document.createElement('TBODY');
        table.appendChild(tableBody);

        for (i = 0; i < inversedMatrixRows; i++) {
            var tr = document.createElement('TR');
            tableBody.appendChild(tr);

            for (var j = 0; j < inversedMatrixCols; j++) {
                var td = document.createElement('TD');
                td.width = '75';
                var timh = inversedMatrix[i][j];
                td.appendChild(document.createTextNode(timh));
                tr.appendChild(td);
            }

        }
        myTableDiv.appendChild(table);


    }

    else {
        alert("Πρέπει ο πίνακας να είναι τετραγωνικός για να έχει αντίστροφο!");
    }
}

}
 
 
//transposed matrix--anastrofos=A matrix which is formed by turning all the rows of a given matrix into columns and vice-versa.
function matrixTranspose(matrix1) {
	if (tbl = document.getElementById(matrix1+"transposed"))
    {
        alert('Υπάρχει ήδη ο ανάστροφος πίνακας!');
    }
    else{
    var tableRowLength = document.getElementById(matrix1).rows.length;
    var tableCellsLength = document.getElementById(matrix1).rows[0].cells.length;
    var myTable = new Array(tableRowLength);
    for (var i = 0; i < tableRowLength; i++) {
        myTable[i] = new Array(tableCellsLength);
    }
    for (i = 0; i < tableRowLength; i++) {
        for (var j = 0; j < tableCellsLength; j++) {
            myTable[i][j] = document.getElementById(matrix1).rows[i].cells[j].innerHTML;
        }

    }

    var myTableTransposed = math.transpose(myTable);



    var myTableDiv = document.getElementById(matrix1+"div");
    var table = document.createElement('TABLE');
    table.id = matrix1+"transposed";
    table.border = '1';

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    for (var i = 0; i < tableCellsLength; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        for (var j = 0; j < tableRowLength; j++) {
            var td = document.createElement('TD');
            td.width = '75';
            var timh = myTableTransposed[i][j];
            td.appendChild(document.createTextNode(timh));
            tr.appendChild(td);
        }

    }
    myTableDiv.appendChild(table);
}
}



/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function deleteMatrix(matrixName){
    // var length = document.getElementById(matrixName).rows.length;
    // for(var i=0;i<length;i++){
    //     document.getElementById(matrixName).deleteRow(0);
   //  }
      var elem = document.getElementById(matrixName+"div");
    elem.parentNode.removeChild(elem);
    return false;
}

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//WONT FIX
function changeDimensions(tableId, newCells) {


    var pinakas = document.getElementById(tableId);
    var cellsLength = pinakas.rows[0].cells.length;
//alert(pinakas.rows[0].cells.length);
//alert(pinakas.rows[1].cells.length);
//alert(pinakas.rows[2].cells.length);
    for (var i = 0; i < 3; i++) {
        //alert(cellLength);
        //alert(rowsLength);

        for (var j = 0; j < 5; j++) {
            
            var x = document.getElementById("testT").rows[i].deleteCell(newCells);
            
            //var row = pinakas.row[i];
            //row.deleteCell(newCells);
            
            
            //pinakas.rows[i].deleteCell();
            //pinakas.removeChild(pinakas.rows[newCells]);
        }
        //pinakas.rows[i].cells[j].parentNode.removeChild(pinakas.rows[i].cells[j]);
        /* if (pinakas.rows[i] === newRows) {
         // document.getElementById("testT").deleteRow(newRows);
         pinakas.rows[i].deleteRow(newRows);
         }
         var tr = document.getElementById("tableId").getElementsByTagName("tr");
         //tr[txt].getElementsByTagName("td")[0].innerHTML = "change me"
         var x = document.getElementById("tableId").rows[0].cells.length;
         document.getElementById("demo").innerHTML=x;*/

    }
}

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function matrixArithmeticOperations(matrix1, matrix2, operation) {
    var firstTableRowLength = document.getElementById(matrix1).rows.length;
    var firstTableCellsLength = document.getElementById(matrix1).rows[0].cells.length;

    var secondTableRowLength = document.getElementById(matrix2).rows.length;
    var secondTableCellsLength = document.getElementById(matrix2).rows[0].cells.length;

    if (firstTableRowLength === secondTableRowLength && firstTableCellsLength === secondTableCellsLength) {

        var myTableDiv = document.getElementById("myDynamicTable");
        var table = document.createElement('TABLE');
        table.border = '1';

        var tableBody = document.createElement('TBODY');
        table.appendChild(tableBody);

        for (var i = 0; i < firstTableRowLength; i++) {
            var tr = document.createElement('TR');
            tableBody.appendChild(tr);

            for (var j = 0; j < firstTableCellsLength; j++) {
                var td = document.createElement('TD');
                td.width = '75';
                var matrix1Value = document.getElementById(matrix1).rows[i].cells[j].innerHTML;
                var matrix2Value = document.getElementById(matrix2).rows[i].cells[j].innerHTML;
                td.appendChild(document.createTextNode(operation(matrix1Value, matrix2Value)));
                tr.appendChild(td);
            }

        }
        myTableDiv.appendChild(table);

    }

    else {
        alert("Οι πίνακες πρέπει να έχουν τις ίδιες διαστάσεις!");
    }
}

function addMatrices(matrix1CellValue, matrix2CellValue) {
    var mtb = parseInt(matrix1CellValue) + parseInt(matrix2CellValue);
    return mtb;
}
function subtractMatrices(matrix1CellValue, matrix2CellValue) {
    var mtb = parseInt(matrix1CellValue) - parseInt(matrix2CellValue);
    return mtb;

}
function multiplyMatrices(matrix1, matrix2) {
    var firstTableRowLength = document.getElementById(matrix1).rows.length;
    var firstTableCellsLength = document.getElementById(matrix1).rows[0].cells.length;
    var secondTableCellsLength = document.getElementById(matrix2).rows[0].cells.length;
    var secondTableRowLength = document.getElementById(matrix2).rows.length;
    if (firstTableCellsLength === secondTableRowLength) {
        var myTableDiv = document.getElementById("myDynamicTable");
        var table = document.createElement('TABLE');
        table.border = '1';

        var tableBody = document.createElement('TBODY');
        table.appendChild(tableBody);

        for (var i = 0; i < firstTableRowLength; ++i) {
            var tr = document.createElement('TR');
            tableBody.appendChild(tr);

            for (var j = 0; j < secondTableCellsLength; ++j) {
                var td = document.createElement('TD');
                td.width = '75';
                td.innerHTML='0';
                tr.appendChild(td);
            }
        }
        myTableDiv.appendChild(table);
        for (i = 0; i < firstTableRowLength; ++i) {
            for (j = 0; j < secondTableCellsLength; ++j) {
                for (var k = 0; k < firstTableCellsLength; ++k) {
                    var matrix1Value = parseInt(document.getElementById(matrix1).rows[i].cells[k].innerHTML);
                    //alert(matrix1Value);
                    var matrix2Value = parseInt(document.getElementById(matrix2).rows[k].cells[j].innerHTML);
                    var apot = parseInt(table.rows[i].cells[j].innerHTML);
                    //alert(apot);
                    table.rows[i].cells[j].innerHTML = apot + (matrix1Value * matrix2Value);
                }
            }
        }

    }
    else {
        alert("Για να γίνει πολλαπλασιασμός πρέπει ο αριθμός των στηλών του πρώτου πίνακα να είναι ίδιος με τον αριθμό των γραμμών του δεύτερου!");
    }
}


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function tableCreate(newTableId, rows, cells) {
    if (tbl = document.getElementById(newTableId))
    {
        alert('Υπάρχει ήδη πίνακας με αυτό το όνομα!');
    }
    else {
        var body = document.body;
        container = document.createElement('div');
        container.id = newTableId+"div";
        tbl = document.createElement('table');
        tbl.id = newTableId;
        tbl.style.width = '100%';
        tbl.border = "1px solid black";
        tbl.setAttribute("contenteditable", true);

        for (var i = 0; i < rows; i++) {
            var tr = tbl.insertRow();
            tr.id = "row" + i;
            tr.setAttribute("contenteditable", true);
            for (var j = 0; j < cells; j++) {
                var td = tr.insertCell(-1);
                td.id = "cell_" + i + "_" + j;
                if (get_browser() === "IE") {
                    td.setAttribute("contenteditable", true);
                    //td.setAttribute("onclick", "alert('Η επεξεργτασία των κελιών, \\n δεν ειναι δυνατή στον "+get_browser()+".')");
                } else {
                    td.setAttribute("contenteditable", true);
                }
                td.innerHTML = Math.floor((Math.random() * 100) + 1);
                td.appendChild(document.createTextNode('\u0020'));
            }
        }
        container.appendChild(tbl);
        body.appendChild(container);
        addEditButtonsFor(newTableId);

        

    }
}

function insertZeros(tableId) {
    var tbl = document.getElementById(tableId);
    for (var i = 0; i < tbl.rows.length; i++) {
        for (var j = 0; j < tbl.rows[i].cells.length; j++) {
            tbl.rows[i].cells[j].innerHTML = "0";
        }
    }
}

function makeOneRightLeft(tableId) {
    var tbl = document.getElementById(tableId);
    if (tbl.rows.length !== tbl.rows[0].cells.length) {
        alert('Ο πίνακας δεν ειναι τετραγωνικός \n\
μονο τετραγωνικοί πινακες μπορούν να γίνουν μοναδιαίοι!');
    } else {
        for (var i = 0; i < tbl.rows.length; i++) {
            for (var j = 0; j < tbl.rows[i].cells.length; j++) {
                if (i === j) {
                    tbl.rows[i].cells[j].innerHTML = "1";
                }
                else {
                    tbl.rows[i].cells[j].innerHTML = "0";
                }
            }
        }
    }
}

function makeOneLeftRight(tableId) {
    var tbl = document.getElementById(tableId);
    var count = 1;
    if (tbl.rows.length !== tbl.rows[0].cells.length) {
        alert('Ο πίνακας δεν ειναι τετραγωνικός \n\
μονο τετραγωνικοί πινακες μπορούν να γίνουν μοναδιαίοι!');
    } else {
        for (var i = 0; i < tbl.rows.length; i++) {
            for (var j = 0; j < tbl.rows[i].cells.length; j++) {
                if (count === tbl.rows[i].cells.length - j) {
                    tbl.rows[i].cells[j].innerHTML = "1";
                    count++;
                }
                else {
                    tbl.rows[i].cells[j].innerHTML = "0";
                }
            }
        }
    }
}

function addEditButtonsFor(tableId) {
    container=document.getElementById(tableId+"div");
    editBtn = document.createElement('input');
    editBtn.type = "button";
    editBtn.value = "Επεξεργασία " + tableId;
    editBtn.id = "editBtn"+tableId;
    editBtn.setAttribute("onclick", "addAllButtons('" + tableId + "')");
    container.appendChild(editBtn);
}

function addAllButtons(tableId) {
    document.getElementById('editBtn'+tableId).disabled = true;
    container=document.getElementById(tableId+"div");

    zeroBtn = document.createElement('input');
    zeroBtn.type = "button";
    zeroBtn.id = "zeroBtn"+tableId;
    //zeroButton.value = "Μηδένισε τον "+tableId;
    zeroBtn.value = "Μηδένισε";
    zeroBtn.setAttribute("onclick", "insertZeros('" + tableId + "')");

    oneBtnRightLeft = document.createElement('input');
    oneBtnRightLeft.type = "button";
    oneBtnRightLeft.id = "oneBtnRightLeft"+tableId;
    //oneButtonRightLeft.value = "Μοναδιαίο\ τον "+tableId;
    oneBtnRightLeft.value = "Μοναδιαίο\\ ";
    oneBtnRightLeft.setAttribute("onclick", "makeOneRightLeft('" + tableId + "')");

    oneBtnLeftRight = document.createElement('input');
    oneBtnLeftRight.type = "button";
    oneBtnLeftRight.id = "oneBtnLeftRight"+tableId;
    //oneButtonLeftRight.value = "Μοναδιαίο/ τον "+tableId;
    oneBtnLeftRight.value = "Μοναδιαίο/ ";
    oneBtnLeftRight.setAttribute("onclick", "makeOneLeftRight('" + tableId + "')");

    changeTableNameBtn = document.createElement('input');
    changeTableNameBtn.type = "button";
    changeTableNameBtn.id = "changeTableNameBtn"+tableId;
    changeTableNameBtn.value = "Μετονομασία";
    changeTableNameBtn.setAttribute("onclick", "");

    saveTableTxtBtn = document.createElement('input');
    saveTableTxtBtn.type = "button";
    saveTableTxtBtn.id = "saveTableTxtBtn"+tableId;
    saveTableTxtBtn.value = "Αποθηκευση σε .txt";
    saveTableTxtBtn.setAttribute("onclick", "saveTableToTxt('" + tableId + "')");

    saveTableExcellBtn = document.createElement('input');
    saveTableExcellBtn.type = "button";
    saveTableExcellBtn.id = "saveTableExcellBtn"+tableId;
    saveTableExcellBtn.value = "Αποθηκευση σε Excell";
    saveTableExcellBtn.setAttribute("onclick", "saveTableToExcell('" + tableId + "')");

    saveTableNumbersBtn = document.createElement('input');
    saveTableNumbersBtn.type = "button";
    saveTableNumbersBtn.id = "saveTableNumbersBtn"+tableId;
    saveTableNumbersBtn.value = "Αποθηκευση σε Numbers";
    saveTableNumbersBtn.setAttribute("onclick", "saveTableToNumbers('" + tableId + "')");

    closeAllBtn = document.createElement('input');
    closeAllBtn.type = "button";
    closeAllBtn.id = "closeAllBtn"+tableId;
    closeAllBtn.value = "Τέλος Επεξεργασίας";
    closeAllBtn.setAttribute("onclick", "closeEditButtons('" + tableId + "')");
    
    transposeMatrixBtn = document.createElement('input');
    transposeMatrixBtn.type = "button";
    transposeMatrixBtn.id = "transposeMatrixBtn"+tableId;
    transposeMatrixBtn.value = "Βρες τον ανάστροφο";
    transposeMatrixBtn.setAttribute("onclick", "matrixTranspose('" + tableId + "')");
    
    matrixInverseBtn = document.createElement('input');
    matrixInverseBtn.type = "button";
    matrixInverseBtn.id = "matrixInverseBtn"+tableId;
    matrixInverseBtn.value = "Βρες τον αντιστροφο";
    matrixInverseBtn.setAttribute("onclick", "inverseMatrix('" + tableId + "')");
    
    matrixDeleteBtn = document.createElement('input');
    matrixDeleteBtn.type = "button";
    matrixDeleteBtn.id = "matrixDeleteBtn"+tableId;
    matrixDeleteBtn.value = "διέγραψε πίνακα";
    matrixDeleteBtn.setAttribute("onclick", "deleteMatrix('" + tableId + "')");

    container.appendChild(zeroBtn);
    container.appendChild(oneBtnRightLeft);
    container.appendChild(oneBtnLeftRight);
    container.appendChild(changeTableNameBtn);
    container.appendChild(saveTableTxtBtn);
    container.appendChild(saveTableExcellBtn);
    container.appendChild(saveTableNumbersBtn);
    container.appendChild(transposeMatrixBtn);
    container.appendChild(matrixDeleteBtn);
    container.appendChild(matrixInverseBtn);
    container.appendChild(closeAllBtn);
    
}

function closeEditButtons(tableId) {
    document.getElementById('editBtn'+tableId).disabled = false;
    document.getElementById('zeroBtn'+tableId).parentNode.removeChild(document.getElementById('zeroBtn'+tableId));
    document.getElementById('oneBtnRightLeft'+tableId).parentNode.removeChild(document.getElementById('oneBtnRightLeft'+tableId));
    document.getElementById('oneBtnLeftRight'+tableId).parentNode.removeChild(document.getElementById('oneBtnLeftRight'+tableId));
    document.getElementById('changeTableNameBtn'+tableId).parentNode.removeChild(document.getElementById('changeTableNameBtn'+tableId));
    document.getElementById('saveTableTxtBtn'+tableId).parentNode.removeChild(document.getElementById('saveTableTxtBtn'+tableId));
    document.getElementById('saveTableExcellBtn'+tableId).parentNode.removeChild(document.getElementById('saveTableExcellBtn'+tableId));
    document.getElementById('saveTableNumbersBtn'+tableId).parentNode.removeChild(document.getElementById('saveTableNumbersBtn'+tableId));
    document.getElementById('transposeMatrixBtn'+tableId).parentNode.removeChild(document.getElementById('transposeMatrixBtn'+tableId));
    document.getElementById('matrixDeleteBtn'+tableId).parentNode.removeChild(document.getElementById('matrixDeleteBtn'+tableId));
    document.getElementById('matrixInverseBtn'+tableId).parentNode.removeChild(document.getElementById('matrixInverseBtn'+tableId));
    document.getElementById('closeAllBtn'+tableId).parentNode.removeChild(document.getElementById('closeAllBtn'+tableId));
}

function saveTableToTxt(tableId) {
    alert("Θα ξεκινήσει το σώσιμο σε txt σύντομα!");
    if (get_browser() === "IE") {
        var blobObject = new Blob([cnvtTableToData(tableId)]);
        window.navigator.msSaveOrOpenBlob(blobObject, tableId + '.txt');
    } else if (get_browser() === "Chrome") {
        saveAs('data:text/html;charset=UTF-8,' + escape(cnvtTableToData(tableId)), tableId + '.txt');
    } else {
        alert("H λειτουργία αυτή είναι δεν είναι διαθέσιμη για " + get_browser() + ".");
    }
}

function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = uri;
        link.click();
        document.body.removeChild(link); //remove the link when done
    } else {
        location.replace(uri);
    }
}

//Έτοιμη συνάρτηση από http://stackoverflow.com/
function downloadWithName(uri, name) {
    function eventFire(el, etype) {
        if (el.fireEvent) {
            (el.fireEvent('on' + etype));
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    eventFire(link, "click");
}

function saveTableToExcell(tableId) {
    alert("Θα ξεκινήσει το σώσιμο σε excell σύντομα!");
    //alert("Έχετε τον Microsoft Internet Explorer " + get_browser() + ". Η λειτουργία αυτή υποστηρίζεται από τον Microsoft Internet Explorer 10 και πάνω!");

    if (get_browser() === "IE") {
        var blobObject = new Blob([cnvtTableToData(tableId)]);
        window.navigator.msSaveOrOpenBlob(blobObject, tableId + '.xls');
    } else if (get_browser() === "Chrome") {
        saveAs('data:text/csv;charset=UTF-8,' + escape(cnvtTableToData(tableId)), tableId + '.xls');
    } else {
        alert("Δεν είναι δυνατή αυτή η λειτουργία στον " + get_browser() + ".");
    }
}

function saveTableToNumbers(tableId) {
    alert("Θα ξεκινήσει το σώσιμο σε numbers σύντομα!");
    if (navigator.appVersion.indexOf("Mac") !== -1) {
        saveAs('data:application/,' + escape(cnvtTableToData(tableId)), tableId + '.numbers');
    } else {
        alert("Αυτή η λειτουργία είναι μόνο για υπολογιστές με Mac λειτουργικό!");
    }

}

//Έτοιμη συνάρτηση από http://stackoverflow.com/
function get_browser_version() {
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem !== null) {
            return 'Opera ' + tem[1];
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    tem = ua.match(/version\/(\d+)/i);
    if (tem !== null) {
        M.splice(1, 1, tem[1]);
    }
    return M[1];
}

//Έτοιμη συνάρτηση από http://stackoverflow.com/
function get_browser() {
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE';
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem !== null) {
            return 'Opera ' + tem[1];
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    tem = ua.match(/version\/(\d+)/i);
    if (tem !== null) {
        M.splice(1, 1, tem[1]);
    }
    return M[0];
}

function cnvtTableToData(tableId) {
    var myTable = document.getElementById(tableId);
    var t = "";
    for (var i = 0; i < myTable.rows.length; i++) {
        for (var j = 0; j < myTable.rows[i].cells.length; j++) {
            t = t + myTable.rows[i].cells[j].innerHTML + "\t";
        }
        t = t + "\r\n";
    }
    return t;
}
