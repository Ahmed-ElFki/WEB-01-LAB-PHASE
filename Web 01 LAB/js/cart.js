var PID = JSON.parse(localStorage.getItem("PID"));
var PName = JSON.parse(localStorage.getItem("PName"));
var PQte = JSON.parse(localStorage.getItem("PQte"));
var PUnitPrice = JSON.parse(localStorage.getItem("PUnitPrice"));
var PTotalPrice = JSON.parse(localStorage.getItem("PTotalPrice"));
var aboutUS = document.getElementById("AboutUS");

var tableContent = document.getElementById("tableContent");

aboutUS.addEventListener("click", () =>{
    alert("We are a compagny based in TUNISIA");
});

pCount();
pViewHeader();
pView();
pViewFooter();

function pCount(){
    var initPCount = 0;
    
    if(PQte.length > 0){
      for(var i = 0; i < PQte.length; i++){
        initPCount = initPCount + PQte[i];
      }
    }

    document.getElementById("productNumber").innerHTML = "(" + initPCount + ")Product";
}

function pViewHeader(){
    var currentHeaderRow = tableContent.insertRow(0);
        
    var currentHColumn_0 = currentHeaderRow.insertCell(0),
        currentHColumn_1 = currentHeaderRow.insertCell(1)
        currentHColumn_2 = currentHeaderRow.insertCell(2)
        currentHColumn_3 = currentHeaderRow.insertCell(3)
    ;

    currentHColumn_0.innerHTML = "Product Name";
    currentHColumn_1.innerHTML = "Product Quantity";
    currentHColumn_2.innerHTML = "Product Unit Price";
    currentHColumn_3.innerHTML = "Product Total Price";
}

function pView(){
    for(currentPID in PID){
        var currentRNumber = parseInt(currentPID) + 1
        var currentPRow = tableContent.insertRow(currentRNumber);
        
        var currentPColumn_0 = currentPRow.insertCell(0),
            currentPColumn_1 = currentPRow.insertCell(1)
            currentPColumn_2 = currentPRow.insertCell(2)
            currentPColumn_3 = currentPRow.insertCell(3)
        ;

        currentPColumn_0.innerHTML = PName[currentPID];
        currentPColumn_1.innerHTML = "<a href='#!' class='minus'>-</a><span id='pQte-" + currentRNumber + "'>" + PQte[currentPID] + "</span><a href='#!' class='add'>+</a>";
        currentPColumn_2.innerHTML = PUnitPrice[currentPID] + " €";
        currentPColumn_3.innerHTML = "<span id='pTotal-" + currentRNumber + "'>" + parseFloat(PTotalPrice[currentPID]).toFixed(2) + " €</span>";
    }
}

var addPBtn = document.getElementsByClassName("add");
var minusPBtn = document.getElementsByClassName("minus");

Array.from(addPBtn).forEach(addPQte);
Array.from(minusPBtn).forEach(minusPQte);

function addPQte(currentAddPQteBtn){
    currentAddPQteBtn.addEventListener("click", () =>{
        var currentRowIndex = currentAddPQteBtn.parentNode.parentNode.rowIndex;
        var currentElementIndex = currentRowIndex - 1;
        var newQte = PQte[currentElementIndex] + 1;
        console.log("FUNCTION ADD : ROW INDEX => " + currentRowIndex + " NEW QTE => " + newQte);

        PQte[currentElementIndex] = newQte;
        console.log("FUNCTION ADD : QTE ARRAY => " + PQte);

        PTotalPrice[currentElementIndex] = PUnitPrice[currentElementIndex] * newQte;
        console.log("FUNCTION ADD : NEW PRICE ARRAY => " + PTotalPrice);

        document.getElementById("pQte-" + currentRowIndex).innerHTML = newQte;
        document.getElementById("pTotal-" + currentRowIndex).innerHTML = parseFloat(PTotalPrice[currentElementIndex]).toFixed(2) + " €";

        pCount();
        pViewFooterUpdate();
        updateLocalStorage();
    });
}

function minusPQte(currentMinusPQteBtn){
    currentMinusPQteBtn.addEventListener("click", () =>{
        var currentRowIndex = currentMinusPQteBtn.parentNode.parentNode.rowIndex;
        var currentElementIndex = currentRowIndex - 1;
        var newQte = 0;
        newQte = (PQte[currentElementIndex] - 1 > 0) ? (PQte[currentElementIndex] - 1) : 1;
        console.log("FUNCTION MINUS : ROW INDEX => " + currentRowIndex + " NEW QTE => " + newQte);

        PQte[currentElementIndex] = newQte;
        console.log("FUNCTION MINUS : QTE ARRAY => " + PQte);

        PTotalPrice[currentElementIndex] = PUnitPrice[currentElementIndex] * newQte;
        console.log("FUNCTION MINUS : NEW PRICE ARRAY => " + PTotalPrice);

        document.getElementById("pQte-" + currentRowIndex).innerHTML = newQte;
        document.getElementById("pTotal-" + currentRowIndex).innerHTML = parseFloat(PTotalPrice[currentElementIndex]).toFixed(2) + " €";

        pCount();
        pViewFooterUpdate();
        updateLocalStorage();
    });
}

function pViewFooter(){
    var pSumToDisplay = 0;
    var currentFooterRow = tableContent.insertRow(tableContent.rows.length);

    var currentFColumn_0 = currentFooterRow.insertCell(0),
        currentFColumn_1 = currentFooterRow.insertCell(1)
        currentFColumn_2 = currentFooterRow.insertCell(2)
        currentFColumn_3 = currentFooterRow.insertCell(3)
    ;

    for(var i = 0; i < PTotalPrice.length; i++){
        pSumToDisplay = parseFloat(pSumToDisplay) + parseFloat(PTotalPrice[i]);
    }

    currentFColumn_0.innerHTML = "";
    currentFColumn_1.innerHTML = "";
    currentFColumn_2.innerHTML = "";
    currentFColumn_3.innerHTML = "<span id='totalToPay'> = " + parseFloat(pSumToDisplay).toFixed(2) + " €</span>";   
}

function pViewFooterUpdate(){
    var pUpdateSumToDisplay = 0;

    for(var i = 0; i < PTotalPrice.length; i++){
        pUpdateSumToDisplay = parseFloat(pUpdateSumToDisplay) + parseFloat(PTotalPrice[i]);
    }

    document.getElementById("totalToPay").innerHTML = " = " + parseFloat(pUpdateSumToDisplay).toFixed(2) + " €";   
}

function updateLocalStorage(){
    localStorage.setItem("PQte", JSON.stringify(PQte));
    localStorage.setItem("PTotalPrice", JSON.stringify(PTotalPrice));
}