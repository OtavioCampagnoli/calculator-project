function validationShortcut(value) {
    try {
        if (value == "Enter" || value == "=") {
            calculate();
        }
        else {
            appendToDisplay(value);
        }
    } catch (error) {
        alert("Error:" + error);
    }
}

document.body.addEventListener("keypress", function (event) {
    validationShortcut(event.key);
});

document.body.addEventListener("keydown", function (event) {
    if (event.key == "Backspace") {
        backspace();
    } else if (event.key == "Escape") {
        clearDisplay();
    }
})