var PQte = JSON.parse(localStorage.getItem("PQte"));
var aboutUS = document.getElementById("AboutUS");

aboutUS.addEventListener("click", () =>{
  alert("We are a compagny based in TUNISIA");
});

pCount();

function pCount(){
    var initPCount = 0;
    
    if(PQte.length > 0){
      for(var i = 0; i < PQte.length; i++){
        initPCount = initPCount + PQte[i];
      }
    }

    document.getElementById("productNumber").innerHTML = "(" + initPCount + ")Product";
}