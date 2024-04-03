function appendToDisplay(value) {
  if (haveANumberFirst() == true || isOperator(value) == false) {
    if (alreadyHaveAnOperator(value) == true) {
    } else {
      document.getElementById("display").value += value;
    }
  }
}

function clearDisplay() {
  document.getElementById("display").value = null;
  document.getElementById("display").ariaPlaceholder = "0";
  clearHistory();
}

function backspace() {
  let displayValue, listDisplay;
  displayValue = getDisplayValue();
  listDisplay = displayValue.split("");
  listDisplay.pop();
  displayValue = listDisplay.toString();
  displayValue = displayValue.replaceAll(",", "");
  updateValueScreen(displayValue);
}

function getDisplayValue() {
  const displayValue = document.getElementById("display").value;
  return displayValue;
}

function updateValueScreen(value) {
  document.getElementById("display").value = value;
}

function alreadyHaveAnOperator(newValue) {
  let displayValueList, result;
  result = false;
  displayValueList = getDisplayValue().split("");
  displayValueList.forEach((value) => {
    if (isOperator(value) == true && isOperator(newValue) == true) {
      result = true;
      return false;
    }
  });
  return result;
}

function isOperator(value) {
  let result = false;
  const operators = ["+", "-", "*", "/"];
  operators.forEach((operator) => {
    if (operator == value) {
      result = true;
      return false;
    }
  });
  return result;
}

function haveANumberFirst() {
  let result, displayValueList;
  result = false;
  displayValueList = getDisplayValue().split("");
  const firstDisplayValue = displayValueList[0];
  if (firstDisplayValue == undefined || firstDisplayValue == null) {
    result = false;
  } else {
    result = true;
  }

  return result;
}

function calculate() {
  let calc, expression, result;
  calc = mountExpression();
  if (calc == undefined) {
    updateValueScreen(0);
  } else {
    expression = calc + " = ";
    result = eval(calc);
    expression += result;
    saveTheHistory(expression);
    updateValueScreen(result);
  }
}

function isDivisionByZero(numerator, denominator, operator) {
  let result;
  result = false;
  if ((numerator == 0 || denominator == 0) && operator == "/") {
    result = true;
  }
  return result;
}

function mountExpression() {
  let displayValue,
    firstExpression,
    secondExpression,
    operatorValue,
    expression;
  displayValue = getDisplayValue();
  const displayValueList = displayValue.split("");
  firstExpression = null;
  secondExpression = null;
  displayValueList.forEach((value) => {
    if (firstExpression == undefined || firstExpression == null) {
      firstExpression += value;
    } else if (operatorValue != undefined || operatorValue != null) {
      secondExpression += value;
    } else if (isOperator(value) == true) {
      operatorValue = value;
    } else {
      firstExpression += value;
    }
  });

  firstExpression = firstExpression.toString().replaceAll(",", "");
  secondExpression = secondExpression.toString().replaceAll(",", "");
  firstExpression = firstExpression.replaceAll("null", "");
  secondExpression = secondExpression.replaceAll("null", "");

  if (isDivisionByZero(firstExpression, secondExpression, operatorValue)) {
    alert("You can't divide by zero!");
  } else {
    expression = firstExpression + " " + operatorValue + " " + secondExpression;
    return expression;
  }
}

// History of all performed operations.

function showTheHistory() {
  let displayHistory;
  displayHistory = getDisplayHistory();
}

function saveTheHistory(expression) {
  let currentHistory;
  currentHistory = getValueHistory();
  if (haveAHistory() == true) {
    currentHistory += " | " + expression;
    updateValueHistory(currentHistory);
    showTheHistory();
  } else {
    currentHistory = expression;
    updateValueHistory(currentHistory);
    showTheHistory();
  }
}

function haveAHistory() {
  let result, valueHistory;
  result = false;
  valueHistory = getValueHistory();
  if (valueHistory != null && valueHistory != undefined && valueHistory != "") {
    result = true;
  }
  return result;
}

function getValueHistory() {
  let valueHistory;
  valueHistory = getDisplayHistory().value;
  return valueHistory;
}

function getDisplayHistory() {
  let displayHistory;
  displayHistory = document.getElementById("display-history");
  return displayHistory;
}

function clearHistory() {
  document.getElementById("display-history").value = "";
}

function updateValueHistory(currentHistory) {
  let valueHistory;
  valueHistory = getValueHistory();
  document.getElementById("display-history").value = currentHistory;
  updateValueScreen(0);
}