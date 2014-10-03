/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//transposed matrix=A matrix which is formed by turning all the rows of a given matrix into columns and vice-versa.
function matrixTranspose(matrix1) {
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



    var myTableDiv = document.getElementById("myDynamicTable");
    var table = document.createElement('TABLE');
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
      var elem = document.getElementById(matrixName);
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
        alert("oi pinakes prepei na exoun idies diastaseis");
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
        alert("gia na ginei pollaplasiasmos prepei o ari8mos sthlwn tou prwtou pinaka na einai idios me ton ari8mo grammwn tou deuterou");
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
        body.appendChild(tbl);
        addEditButton(newTableId);
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

function addEditButton(tableId) {
    var body = document.body;
    button = document.createElement('input');
    button.type = "button";
    button.value = "Επεξεργασία " + tableId;
    button.id = "editButton";
    button.setAttribute("onclick", "addAllButtons('" + tableId + "')");
    body.appendChild(button);
}

function addAllButtons(tableId) {
    document.getElementById('editButton').disabled = true;
    var body = document.body;

    zeroButton = document.createElement('input');
    zeroButton.type = "button";
    //zeroButton.value = "Μηδένισε τον "+tableId;
    zeroButton.value = "Μηδένισε";
    zeroButton.setAttribute("onclick", "insertZeros('" + tableId + "')");

    oneButtonRightLeft = document.createElement('input');
    oneButtonRightLeft.type = "button";
    //oneButtonRightLeft.value = "Μοναδιαίο\ τον "+tableId;
    oneButtonRightLeft.value = "Μοναδιαίο\\ ";
    oneButtonRightLeft.setAttribute("onclick", "makeOneRightLeft('" + tableId + "')");

    oneButtonLeftRight = document.createElement('input');
    oneButtonLeftRight.type = "button";
    //oneButtonLeftRight.value = "Μοναδιαίο/ τον "+tableId;
    oneButtonLeftRight.value = "Μοναδιαίο/ ";
    oneButtonLeftRight.setAttribute("onclick", "makeOneLeftRight('" + tableId + "')");

    changeTableName = document.createElement('input');
    changeTableName.type = "button";
    changeTableName.value = "Μετονομασία";
    changeTableName.setAttribute("onclick", "");

    saveTableTxt = document.createElement('input');
    saveTableTxt.type = "button";
    saveTableTxt.value = "Αποθηκευση σε .txt";
    saveTableTxt.setAttribute("onclick", "saveTableToTxt('" + tableId + "')");

    saveTableExcell = document.createElement('input');
    saveTableExcell.type = "button";
    saveTableExcell.value = "Αποθηκευση σε Excell";
    saveTableExcell.setAttribute("onclick", "saveTableToExcell('" + tableId + "')");

    saveTableNumbers = document.createElement('input');
    saveTableNumbers.type = "button";
    saveTableNumbers.value = "Αποθηκευση σε Numbers";
    saveTableNumbers.setAttribute("onclick", "saveTableToNumbers('" + tableId + "')");

    closeAll = document.createElement('input');
    closeAll.type = "button";
    closeAll.value = "Τέλος Επεξεργασίας";
    closeAll.setAttribute("onclick", "closeEditButtons()");

    body.appendChild(zeroButton);
    body.appendChild(oneButtonRightLeft);
    body.appendChild(oneButtonLeftRight);
    body.appendChild(changeTableName);
    body.appendChild(saveTableTxt);
    body.appendChild(saveTableExcell);
    body.appendChild(saveTableNumbers);
    body.appendChild(closeAll);
}

function closeEditButtons() {
    document.getElementById('editButton').disabled = false;
    zeroButton.parentNode.removeChild(zeroButton);
    oneButtonLeftRight.parentNode.removeChild(oneButtonLeftRight);
    oneButtonRightLeft.parentNode.removeChild(oneButtonRightLeft);
    changeTableName.parentNode.removeChild(changeTableName);
    saveTableTxt.parentNode.removeChild(saveTableTxt);
    saveTableExcell.parentNode.removeChild(saveTableExcell);
    saveTableNumbers.parentNode.removeChild(saveTableNumbers);
    closeAll.parentNode.removeChild(closeAll);
}

function saveTableToTxt(tableId) {
    if (get_browser() === "Chrome") {
        downloadWithName('data:text;charset=utf-8,' + escape(cnvtTableToData(tableId)), tableId + '.txt');
    } else {
        alert("H λειτουργία αυτή είναι δεν είναι διαθέσιμη για " + get_browser() + ".");
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
    //alert("Έχετε τον Microsoft Internet Explorer " + get_browser() + ". Η λειτουργία αυτή υποστηρίζεται από τον Microsoft Internet Explorer 10 και πάνω!");
    if (get_browser() === "IE") {
        var blobObject = new Blob([cnvtTableToData(tableId)]);
        window.navigator.msSaveOrOpenBlob(blobObject, tableId + '.xls');
    } else if (get_browser() === "Chrome") {
        downloadWithName('data:application/,' + escape(cnvtTableToData(tableId)), tableId + '.xls');
    } else {
        alert("Δεν είναι δυνατή αυτή η λειτουργία στον " + get_browser() + ".");
    }
}

function saveTableToNumbers(tableId) {
    if (navigator.appVersion.indexOf("Mac") !== -1) {
        downloadWithName('data:application/,' + escape(cnvtTableToData(tableId)), tableId + '.numbers');
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
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
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
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
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
