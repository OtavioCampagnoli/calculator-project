function appendToDisplay(value) {

    if (isSpecialCharacter(value) || isAlphabet(value)) {
        return;
    }

    if (isOperator(value) && !haveANumberFirst()) {
        return;
    }

    if (isCalculated && (isOperator(value) || isSpecialCharacter(value))) {
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