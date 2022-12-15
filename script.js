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
let operator = "";
let isSecondOperand = false;
let previousSelectedOperator = null;

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
            // turn off highlighted button after evaluation
            if (previousSelectedOperator != null) {
                let backgroundColor = getComputedStyle(this).getPropertyValue("--button-right-color");
                previousSelectedOperator.style.backgroundColor = backgroundColor;
                previousSelectedOperator = null;
            }
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
                default:
                    break;
            }
            
            // turn off highlighted button after evaluation
            if (previousSelectedOperator != null) {
                let backgroundColor = getComputedStyle(this).getPropertyValue("--button-right-color");
                previousSelectedOperator.style.backgroundColor = backgroundColor;
                previousSelectedOperator = null;
            }

            display.textContent = result.toString().slice(0, 10);
            isSecondOperand = false;

            // if result is infinity, alert and reset to zero
            if (display.textContent == "Infinity") {
                alert("Cannot divide by 0!");
                display.textContent = "0";
            }
            break;
        default:
            if (Number.isNaN(Number(this.value))) {
                num1 = display.textContent;
                operator = this.value;
                isSecondOperand = true;
                
                if (previousSelectedOperator != null) {
                    let backgroundColor = getComputedStyle(this).getPropertyValue("--button-right-color");
                    previousSelectedOperator.style.backgroundColor = backgroundColor;
                    previousSelectedOperator = null;
                }
                let highlightColor = getComputedStyle(this).getPropertyValue("--button-color-highlight");
                this.style.backgroundColor = highlightColor;
                previousSelectedOperator = this;
                
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


