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

function saveTheHistory(expression) {
    const currentHistory = haveAHistory() ? getValueHistory() + " | " + expression : expression;
    updateValueHistory(currentHistory);
}