function round(num) {
    return Math.round(num*1000000000)/1000000000;
}

function add(a,b) {
    return round(a+b);
}

function subtract(a,b) {
    return round(a-b);
}

function multiply(a,b) {
    return round(a*b);
}

function divide(a,b) {
    return round(a/b);
}

function modulo(a,b) {
    return round(a%b);
}

const display = document.querySelector("p");
let num1 = null;
let num2 = null;
let operatorMethod = null;

// pre-condition: num1 and num2 is an integer and operatorMethod is valid method
function operate() {
    return operatorMethod(num1, num2);
}

function updateDisplay() {
}

const buttons = document.querySelectorAll("button");
buttons.forEach( button => {
    button.addEventListener('click', updateDisplay);
})


