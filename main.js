const calculator = document.querySelector(".calculator")
const keys = calculator.querySelector(".calculator__keys")
const display = calculator.querySelector(".calculator__display")


keys.addEventListener("click", e => {
    if (e.target.matches("button")) {
        const key = e.target
        const action = key.dataset.action
        const keyText = key.textContent
        const previousKeyType = calculator.dataset.previousKeyType
        Array.from(key.parentNode.children)
            .forEach(key => key.classList.remove("is-clicked"))
        if (!action) {
            if (display.textContent === "0" || previousKeyType === "operator") {
                display.textContent = keyText
            } else {
                display.textContent += keyText
            }
            calculator.dataset.previousKeyType = "number"
        } else if (action === "multiply" || action === "divide" || action === "subtract" || action === "add") {
            key.classList.add("is-clicked")
            calculator.dataset.firstNum = display.textContent
            calculator.dataset.operator = action
            calculator.dataset.previousKeyType = "operator"
        } else if (action === "calculate") {
            const secondNum = display.textContent
            const firstNum = calculator.dataset.firstNum
            const operator = calculator.dataset.operator
            display.textContent = calculate(firstNum, operator, secondNum)
            calculator.dataset.previousKeyType = "calculate"
        } else if (action === "decimal") {
            if (!display.textContent.includes(".")) {
                display.textContent += ".";
            } else if (previousKeyType === "operator") {
                display.textContent = "0."
            }
            calculator.dataset.previousKeyType = "decimal"
        } else if (action === "clear") {
            display.textContent = "0"
            calculator.dataset.previousKeyType = "clear"
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