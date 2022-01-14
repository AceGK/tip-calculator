function calculateTip() {
    let bill = document.getElementById("bill").value;
    let people = document.getElementById('people').value;

    // set percentage variable to custom-input value, or else set to selected radio button
    if (document.getElementById('custom-number').checked == true ) {
        var percentage = document.getElementById("custom-input").value;
    }
    else {
        var percentage = document.querySelector('input[type=radio][name=tip-percent]:checked').value;
    }

    //tip math
    let tip = (bill / 100 * percentage / people);
    let total = (bill / people) + tip ;
    
    // USD format
    let numUSD = new Intl.NumberFormat("en-US", {
        style:"currency",
        currency:"USD"
    })
    
    // update tip and total text elements
    document.getElementById("tip").innerHTML = numUSD.format(tip);
    document.getElementById("total").innerHTML = numUSD.format(total);

}


// calculateTip() on key up and input click
document.addEventListener("keyup", calculateTip);
let ele = document.querySelectorAll("input");
    for(var i = 0; i < ele.length; i++) {
        ele[i].addEventListener("click", calculateTip); 
    }


//  reset
document.getElementById("reset").onclick = function() {

        document.getElementById("bill").value = "";
        document.getElementById("people").value = "";
        document.getElementById("tip").innerText = "$0.00";
        document.getElementById("total").innerText = "$0.00";
        document.getElementById('custom-number-div').style.display = "none"; 
        var ele = document.getElementsByName("tip-percent");
        for(var i=0;i<ele.length;i++)
           ele[i].checked = false;

}  


// toggle display visibility for custom-number-div 
document.getElementById("custom-number").onclick = function() {
    let x = document.getElementById('custom-number-div'); 
    if (x.style.display === "none") {
     x.style.display = "block";
   } else {
     x.style.display = "none";
   }
}  


// hide custom-number-div if click any radio button except #custom-number
let radios = document.querySelectorAll("input[type=radio][name=tip-percent]:not(#custom-number)");
for(var i = 0; i < radios.length; i++) {
    radios[i].addEventListener("click", function() {
        document.getElementById('custom-number-div').style.display = "none";
    });
}
