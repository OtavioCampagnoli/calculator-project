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

function appendToDisplay(value) {

  if (isCalculated && isOperator(value)) {
    isCalculated = false;
  }

  else if (isCalculated && !isOperator(value)) {
    clearDisplay();
    isCalculated = false;
  }

  if (!haveANumberFirst() && !isOperator(value)) {
    clearDisplay();
  }

  if (isOperator(value) && alreadyHaveAnOperator()) {
    return;
  }

  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = null;
  document.getElementById("display").ariaPlaceholder = "0";
}

function backspace() {
  let displayValue = getDisplayValue();
  displayValue = displayValue.slice(0, -1);
  updateValueScreen(displayValue);
}

function getDisplayValue() {
  return document.getElementById("display").value;
}

function updateValueScreen(value) {
  document.getElementById("display").value = value;
}

function isOperator(value) {
  const operators = ["+", "-", "*", "/"];
  return operators.includes(value);
}

function alreadyHaveAnOperator() {
  const displayValue = getDisplayValue();
  const operators = ["+", "-", "*", "/"];
  return displayValue.split("").some(char => operators.includes(char));
}

function haveANumberFirst() {
  const firstChar = getDisplayValue()[0];
  return !isNaN(firstChar);
}

function calculate() {
  const expression = mountExpression();
  if (!expression) {
    updateValueScreen(0);
    return;
  }

  const result = eval(expression);
  const expressionWithResult = `${expression} = ${result}`;
  saveTheHistory(expressionWithResult);
  updateValueScreen(result);

  isCalculated = true;
}

function isDivisionByZero(numerator, denominator, operator) {
  return (numerator == 0 || denominator == 0) && operator == "/";
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


function saveTheHistory(expression) {
  const currentHistory = haveAHistory() ? getValueHistory() + " | " + expression : expression;
  updateValueHistory(currentHistory);
}

function haveAHistory() {
  return !!getValueHistory();
}

function getValueHistory() {
  return getDisplayHistory().value;
}

function getDisplayHistory() {
  return document.getElementById("display-history");
}

function clearHistory() {
  getDisplayHistory().value = "";
}

function updateValueHistory(currentHistory) {
  getDisplayHistory().value = currentHistory;
  updateValueScreen(0);
}

function toggleOnHistory(state) {
  let toggleOffBtn = document.getElementById("toogle-off-history");
  let toggleOnBtn = document.getElementById("toogle-on-history");

  if (state == 0) {
    toggleOffBtn.style.display = "none";
    toggleOnBtn.style.display = "block";
    hiddenHistory();
  } else {
    toggleOffBtn.style.display = "block";
    toggleOnBtn.style.display = "none";
    showHistory();
  }
}

function showHistory() {
  let containerHistory = document.getElementById("historyContainer");
  containerHistory.style.display = "flex";
}

function hiddenHistory() {
  let containerHistory = document.getElementById("historyContainer");
  containerHistory.style.display = "none";
}