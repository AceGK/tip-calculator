function calculateTip() {
    let bill = document.getElementById('bill').value;
    let people = document.getElementById('people').value;

    // null warning
    // if  (document.getElementById("bill").value <= 0.01) {
    //     document.getElementById('item-bill').getElementsByTagName("p").after("hello");
    // }

    // set percentage variable to custom-input value if checked, else set to selected radio button
    if (document.getElementById('custom-number').checked == true ) {
        var percentage = document.getElementById('custom-input').value;
    }
    else {
        var percentage = document.querySelector('input[type=radio][name=tip-percent]:checked').value;
    }

    //tip math
    let tip = (bill / 100 * percentage / people);
    let total = (bill / people) + tip ;
    
    // USD format
    let numUSD = new Intl.NumberFormat('en-US', {
        style:'currency',
        currency:'USD'
    })
    
    // update tip and total text elements
    document.getElementById('tip').innerHTML = numUSD.format(tip);
    document.getElementById('total').innerHTML = numUSD.format(total);

    //add reset button styles
    document.getElementById('reset').classList.remove('reset-faded');
}

// calculateTip() on key up and input click

let ele = document.querySelectorAll('input');
    for(var i = 0; i < ele.length; i++) {
        ele[i].addEventListener('click', calculateTip); 
        ele[i].addEventListener('keyup', calculateTip); 
    }


//  reset
document.getElementById("reset").onclick = function() {
    
    document.getElementById('reset').classList.add('reset-faded');
    document.getElementById('bill').value = '';
    document.getElementById('people').value = '';
    document.getElementById('tip').innerText = '$0.00';
    document.getElementById('total').innerText = '$0.00';

    // uncheck radio
    var btn = document.getElementsByName('tip-percent');
    for(var i=0;i<btn.length;i++) 
        btn[i].checked = false; 

}  

// nested input[text] inside input[checkbox] registers click
document.getElementById('custom-input').onclick = function () {
    document.getElementById('custom-number').checked = true;
}

// reset 'custom' placeholder text on click other radio
let radios = document.querySelectorAll('input[type=radio][name=tip-percent]:not(#custom-number)');
for(var i = 0; i < radios.length; i++) {
    radios[i].addEventListener('click', function() {
        document.getElementById('custom-input').value = ""
    });
}

