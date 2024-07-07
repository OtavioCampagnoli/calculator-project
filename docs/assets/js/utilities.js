function isDivisionByZero(numerator, denominator, operator) {
    return (numerator == 0 || denominator == 0) && operator == "/";
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

function haveAHistory() {
    return !!getValueHistory();
}

function isNumber(value) {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return numbers.includes(value);
}

function isSpecialCharacter(value) {
    var regex = /[!@#$%^&()_\\[\]{};':"\\|,<>\?]/;

    // Test the value against the regular expression
    return regex.test(value);
}

function isAlphabet(value) {
    var regex = /^[a-zA-Z]+$/;
    return regex.test(value);
}