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
let isNum1 = true;

// pre-condition: num1 and num2 is an integer and operatorMethod is valid method
function operate() {
    if (typeof(num1) == null || typeof(num2) == null || typeof(operatorMethod) == null) {
        return;
    }
    const result = operatorMethod(num1, num2);
    num1 = result;
    num2 = null;
    operatorMethod = null;
    isNum1 = true;
    display.textContent = result;
}

function clear() {
    num1 = null;
    num2 = null;
    operatorMethod = null;
    isNum1 = true;
    display.textContent = "0";
}

function setValue(value) {
    if (isNum1) {
        num1 = Number(value);
    }
    else {
        num2 = Number(value);
    }
} 
function addOperation(method) {
    console.log("add operation");
    if (!isNum1) {
        operate();
    }
    operatorMethod = method;
    isNum1 = false;
}

function updateDisplay() {
    const displayText = display.textContent;
    switch (this.value) {
        case "=":
            operate();
            break;
        case "clear":
            clear();
            break;
        case "negative":
            if (!isNum1 && Number(displayText) == num1) return
            if (displayText.includes("-")) {
                display.textContent = displayText.substring(1, displayText.length);
            }
            else {
                display.textContent = "-" + displayText;
            }
            setValue(display.textContent);
            break;
        case ".":
            if (displayText.includes(".")) return;
            display.textContent += ".";
            setValue(display.textContent);
            break;
        case "%":
            addOperation(modulo);
            break;
        case "+":
            addOperation(add);
            break;
        case "-":
            addOperation(subtract);
            break;
        case "*":
            addOperation(multiply);
            break;
        case "/":
            addOperation(divide);
            break;
        default:
            if (displayText == "0" || (!isNum1 && Number(displayText) == num1)) {
                display.textContent = this.value;
            }
            else if (displayText.length >= 9) {
                return;
            }
            else {
                display.textContent += this.value;
            }
            setValue(display.textContent);
            break;
    }
    
}

const buttons = document.querySelectorAll("button");
buttons.forEach( button => {
    button.addEventListener('click', updateDisplay);
})


