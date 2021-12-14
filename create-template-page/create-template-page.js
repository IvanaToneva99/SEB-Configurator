const NEXT = "Next";
const PREVIOUS = "Previous";

function checkIfUserIsLogged() {
    if (!localStorage.getItem("email")) {
        alert("You have to be logged in to enter the page!");
        location.href = '../home-page/home-page.html';
    }
}

checkIfUserIsLogged();

function changeStep() {
    const currentState = document.getElementById("change-view-button");

    if (currentState.innerHTML === NEXT) {
        showElement("generate-configuration");
        showElement("save-template");
        showElement("spell-span");
        showElement("confirmation-span");
        showElement("mute-span");
        showElement("control-audio-span");
        showElement("cookie-span");
        showElement("preferences-span");
        hideElement("taskbar-span");
        hideElement("time-span");
        hideElement("reload-span");
        hideElement("language-span");
        hideElement("exit-span");
        currentState.innerHTML = PREVIOUS;
    } else {
        hideElement("generate-configuration");
        hideElement("save-template");
        hideElement("spell-span");
        hideElement("confirmation-span");
        hideElement("mute-span");
        hideElement("control-audio-span");
        hideElement("cookie-span");
        hideElement("preferences-span");
        showElement("taskbar-span");
        showElement("time-span");
        showElement("reload-span");
        showElement("language-span");
        showElement("exit-span");
        currentState.innerHTML = NEXT;
    }
}

function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.className = "hidden";
    }
}

function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.className = "";
    }
}

function saveConfiguration() {
    if(document.getElementById("name-input").value === ""){
        alert("Template's name can't be empty!");
        return;
    }
    const data = new FormData();
    data.append('name-input', document.getElementById("name-input").value);
    data.append('taskbar', document.getElementById("taskbar").value);
    data.append('time', document.getElementById("time").value);
    data.append('show-reload', document.getElementById("show-reload").value);
    data.append('show-language', document.getElementById("show-language").value);
    data.append('allow-exiting', document.getElementById("allow-exiting").value);
    data.append('confirm-exit', document.getElementById("confirm-exit").value);
    data.append('mute-audio', document.getElementById("mute-audio").value);
    data.append('allow-audio-control', document.getElementById("allow-audio-control").value);
    data.append('cookie-cleanup', document.getElementById("cookie-cleanup").value);
    data.append('preferences-windows', document.getElementById("preferences-windows").value);
    data.append('spell-checker', document.getElementById("spell-checker").value);

    fetch("../api/save-template.php", {
        method: "POST",
        body: data
    })
        .then((response) => {
            return response.text();
        })
        .then((body) => {
            location.href = '../home-page/home-page.html';
        });
}

function logout() {
    localStorage.setItem("email", "");
}
