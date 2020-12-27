/** ADD PRODUCTS TO CART WITH BTNS **/

var addToCartBtns = document.getElementsByClassName("ajouterPanier");
var productsName = document.getElementsByClassName("productName");
var productsMainPrice = document.getElementsByClassName("prix");
var productsNumber = document.getElementById("productNumber");
var aboutUS = document.getElementById("AboutUS");


var JSONArray = {
    "ID" : [],
    "ProductsNames" : [],
    "ProductsQte" : [],
    "ProductsUnitPrices" : [],
    "ProductsTotalPrices" : []
};

aboutUS.addEventListener("click", () =>{
    alert("We are a compagny based in TUNISIA");
});

initJSONArray();

function initJSONArray(){
    var storedPID = JSON.parse(localStorage.getItem("PID"));
    var storedPName = JSON.parse(localStorage.getItem("PName"));
    var storedPQte = JSON.parse(localStorage.getItem("PQte"));
    var storedPUnitPrice = JSON.parse(localStorage.getItem("PUnitPrice"));
    var storedPTotalPrice = JSON.parse(localStorage.getItem("PTotalPrice"));

    if(storedPID != null) JSONArray["ID"] = storedPID;
    if(storedPName != null) JSONArray["ProductsNames"] = storedPName;
    if(storedPQte != null) JSONArray["ProductsQte"] = storedPQte;
    if(storedPUnitPrice != null) JSONArray["ProductsUnitPrices"] = storedPUnitPrice;
    if(storedPTotalPrice != null) JSONArray["ProductsTotalPrices"] = storedPTotalPrice;

}

pCount();

function pCount(){
    var initPCount = 0;
    var storedPQte = JSONArray["ProductsQte"];

    if(storedPQte.length > 0){
      for(var i = 0; i < storedPQte.length; i++){
        initPCount = initPCount + storedPQte[i];
      }
    }

    document.getElementById("productNumber").innerHTML = "(" + initPCount + ")Product";
}

Array.from(addToCartBtns).forEach(manageCart);

function manageCart(currentBtn){
    var currentArrayIDS = [];

    currentBtn.addEventListener("click", function(){
        var parentNodeID = currentBtn.parentNode.getAttribute("id");
        if(!currentArrayIDS.includes(parentNodeID)){
            currentArrayIDS.push(parentNodeID);
        }
        extractValues(currentArrayIDS);
        displayArray();
        pCount();
        saveToLocalStorage();
    });   
}

function extractValues(currentArrayIDS){
    currentArrayIDS.forEach(currentValue => {
        var currentID = currentValue, 
        currentProductName = productsName[currentID - 1].innerHTML, 
        currentProductUnitPrice = parseFloat(productsMainPrice[currentID - 1].innerHTML).toFixed(2);
        currentProductTotalPrice = parseFloat(currentProductUnitPrice * 1).toFixed(2);

        if(!JSONArray["ID"].includes(currentID)){
            updateValues(currentID, JSONArray["ID"]);
            updateValues(currentProductName, JSONArray["ProductsNames"]);
            updateValues(1, JSONArray["ProductsQte"]);
            updateValues(currentProductUnitPrice, JSONArray["ProductsUnitPrices"]);
            updateValues(currentProductTotalPrice, JSONArray["ProductsTotalPrices"]);
        }
    });
}

function updateValues(valueToAdd, arrayToUpdate){
    arrayToUpdate.push(valueToAdd);
}

function displayArray(){
    console.log(
    "***********************************************" +
    "\nID => " + JSONArray["ID"] +
    "\nNAMES => " + JSONArray["ProductsNames"] + 
    "\nQTE => " + JSONArray["ProductsQte"] + 
    "\nUNIT PRICES => " + JSONArray["ProductsUnitPrices"] + 
    "\nTOTAL PRICES => " + JSONArray["ProductsTotalPrices"] + 
    "\n***********************************************\n"
    );
}

function saveToLocalStorage(){
    localStorage.setItem("PID", JSON.stringify(JSONArray["ID"]));
    localStorage.setItem("PName", JSON.stringify(JSONArray["ProductsNames"]));
    localStorage.setItem("PQte", JSON.stringify(JSONArray["ProductsQte"]));
    localStorage.setItem("PUnitPrice", JSON.stringify(JSONArray["ProductsUnitPrices"]));
    localStorage.setItem("PTotalPrice",  JSON.stringify(JSONArray["ProductsTotalPrices"]));
}