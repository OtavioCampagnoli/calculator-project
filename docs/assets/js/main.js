const buttons = document.querySelectorAll("button");
let isCalculated = false;

buttons.forEach((button) => {
    button.addEventListener("click", function () {
        const action = this.dataset.action;
        const value = this.dataset.value;

        switch (action) {
            case 'clear':
                clearDisplay();
                break;
            case 'append':
                appendToDisplay(value);
                break;
            case 'calculate':
                calculate();
                break;
            case 'backspace':
                backspace();
                break;
            case 'clearHistory':
                clearHistory();
                break;
            case 'toggleHistoryAction':
                toggleOnHistory(value);
                break;
            default:
                break;
        }
    });
});

function calculate() {
    const expression = mountExpression();
    if (!expression) {
        updateValueScreen(0);
        return;
    } else if (!alreadyHaveAnOperator()) {
        alert("You need to add an operator!");
    }
    else {
        const result = eval(expression);
        const expressionWithResult = `${expression} = ${result}`;
        saveTheHistory(expressionWithResult);
        updateValueScreen(result);

        isCalculated = true;
    }
}

function mountExpression() {
    const displayValue = getDisplayValue();
    const operators = ["+", "-", "*", "/"];
    let expression = "";
    let currentNumber = "";
  
    for (let i = 0; i < displayValue.length; i++) {
      const char = displayValue[i];
  
      if (operators.includes(char)) {
        if (currentNumber !== "") {
          expression += currentNumber + " ";
          currentNumber = "";
        }
        expression += char + " ";
      } else {
        currentNumber += char;
      }
    }
  
    if (currentNumber !== "") {
      expression += currentNumber;
    }
  
    if (isDivisionByZero(expression.split(" ")[0], expression.split(" ")[2], expression.split(" ")[1])) {
      alert("You can't divide by zero!");
      return null;
    }
  
    return expression;
  }