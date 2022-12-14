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

let num1 = "";
let num2 = "";
let operator = "+";
let isSecondOperand = false;

function operate(operatorMethod) {
    return operatorMethod(Number(num1), Number(num2));
}


function updateDisplay() {
    const display = document.querySelector("p");

    switch (this.value) {
        case "clear":
            isSecondOperand = false;
            num1 = "";
            num2 = "";
            display.textContent = "0";
            break;
        case "negative":
            break;
        case ".":
            break;
        case "=":
            if (!isSecondOperand) break;
            num2 = display.textContent;
            let result = 0;
            switch (operator) {
                case "%":
                    result = operate(add);
                    break;
                case "+":
                    result = operate(add);
                    break;
                case "-":
                    result = operate(subtract);
                    break;
                case "*":
                    result = operate(multiply);
                    break;
                case "/":
                    result = operate(divide);
                    break;
            }
            display.textContent = result.toString();
            isSecondOperand = false;
            break;
        default:
            if (Number.isNaN(Number(this.value))) {
                num1 = display.textContent;
                operator = this.value;
                isSecondOperand = true;
                
                // TODO: highlight current button
            }
            else if (isSecondOperand) {
                if (display.textContent == num1) {
                    display.textContent = this.value;
                }
                else if (display.textContent.length <= 9) {
                    display.textContent += this.value;
                }
            }
            else {
                if (display.textContent == "0") {
                    display.textContent = this.value;
                }
                else if (display.textContent.length <= 9) {
                    display.textContent += this.value;
                }
            }
            break;
    }
}



const buttons = document.querySelectorAll("button");
buttons.forEach( button => {
    button.addEventListener('click', updateDisplay);
})


