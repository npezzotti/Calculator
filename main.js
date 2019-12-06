const calculator = document.querySelector(".calculator")
const keys = calculator.querySelector(".calculator__keys")
const display = calculator.querySelector(".calculator__display")


keys.addEventListener("click", e => {
    if (e.target.matches("button")) {
        const key = e.target
        const action = key.dataset.action
        const keyText = key.textContent
        const prevKey = calculator.dataset.prevKey
        Array.from(key.parentNode.children)
            .forEach(key => key.classList.remove("is-clicked"))
        if (!action) {
            if (display.textContent === "0" || prevKey === "operator" || prevKey === "calculate") {
                display.textContent = keyText
            } else {
                display.textContent += keyText
            }
            calculator.dataset.prevKey = "number"
        } if (action === "multiply" || action === "divide" || action === "subtract" || action === "add") {
            let firstNum = calculator.dataset.firstNum
            const operator = calculator.dataset.operator
            const secondNum = display.textContent
            if (firstNum && operator && prevKey !== "operator" && prevKey !== "calculate") {
                const result = calculate(firstNum, operator, secondNum)
                display.textContent = result
                calculator.dataset.firstNum = result 
            } else {
                calculator.dataset.firstNum = display.textContent
            }
            key.classList.add("is-clicked")
            calculator.dataset.operator = action
            calculator.dataset.prevKey = "operator"
        } if (action === "calculate") {
            let firstNum = calculator.dataset.firstNum
            const operator = calculator.dataset.operator
            let secondNum = display.textContent
            if (firstNum) {
                if (prevKey === "calculate") {
                    firstNum = display.textContent
                    secondNum = calculator.dataset.modifier
                    display.textContent = calculate(firstNum, operator, secondNum)        
                }
                display.textContent = calculate(firstNum, operator, secondNum)
            }
            calculator.dataset.modifier = secondNum
            calculator.dataset.prevKey = "calculate"
        } if (action === "decimal") {
            if (!display.textContent.includes(".")) {
                display.textContent += ".";
            } 
            if (prevKey === "operator" || prevKey === "calculate") {
                display.textContent = "0."
            }
            calculator.dataset.prevKey = "decimal"
        } if (action === "clear") {
            if (key.textContent === "AC") {
                calculator.dataset.firstNum = ""
                calculator.dataset.modifier = ""
                calculator.dataset.operator = ""
                calculator.dataset.prevKey = ""
            } else {
                display.textContent = "0"
                key.textContent = "AC"
            }
            display.textContent = "0"
            calculator.dataset.prevKey = "clear"
        } if (action !== "clear") {
            const clear = calculator.querySelector('[data-action=clear]')
            clear.textContent = 'CE'
        }
    } else {
        console.log("Not a valid key!")
    }
})

const calculate = (num1, operand, num2) => {
    switch(operand) {
        case "add":
            return parseFloat(num1) + parseFloat(num2);
            break;
        case "subtract":
            return parseFloat(num1) - parseFloat(num2);
            break;
        case "multiply":
            return parseFloat(num1) * parseFloat(num2);
            break;
        case "divide":
            return parseFloat(num1) / parseFloat(num2);
            break;
        default:
            return 0
    }
}