let configurations = [];
let currentConfiguration = {};
const PREVIOUS = "Previous";
const NEXT = "Next";
let previousConfigurationName = "";

function checkIfUserIsLogged() {
    if (!localStorage.getItem("email")) {
        alert("You have to be logged in to enter the page!");
        location.href = '../home-page/home-page.html';
    }
}

function logout() {
    localStorage.setItem("email", "");
}

checkIfUserIsLogged();

function changeStep() {
    const currentState = document.getElementById("change-view-button");

    if (currentState.innerHTML === NEXT) {
        hideElement("taskbar-span");
        hideElement("time-span");
        hideElement("reload-span");
        hideElement("language-span");
        hideElement("exit-span");
        showElement("save-template");
        showElement("spell-span");
        showElement("confirmation-span");
        showElement("mute-span");
        showElement("control-audio-span");
        showElement("cookie-span");
        showElement("preferences-span");
        currentState.innerHTML = PREVIOUS;
    } else {
        showElement("taskbar-span");
        showElement("time-span");
        showElement("reload-span");
        showElement("language-span");
        showElement("exit-span");
        hideElement("save-template");
        hideElement("spell-span");
        hideElement("confirmation-span");
        hideElement("mute-span");
        hideElement("control-audio-span");
        hideElement("cookie-span");
        hideElement("preferences-span");
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

function searchFunction() {
    const input = document.getElementById("search-field");
    const filter = input.value.toUpperCase();
    const ul = document.getElementById("items");
    const li = ul.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName("a")[0];
        let txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].className = "";
        } else {
            li[i].className = "hidden";
        }
    }
}


function loadConfiguration() {
    const configurationName = window.event.target.innerHTML;
    currentConfiguration = configurations.find(conf => conf.templatesName === configurationName);
    previousConfigurationName = configurationName;
    populateSelectOptions(currentConfiguration);
    showElement("settings");
    hideElement("search-section");
}

function populateSelectOptions(configuration) {
    setValueForSelect("taskbar", configuration.isTaskbarEnabled);
    setValueForSelect("time", configuration.isTimeEnabled);
    setValueForSelect("show-reload", configuration.isReloadEnabled);
    setValueForSelect("show-language", configuration.isLanguageBarEnabled);
    setValueForSelect("allow-exiting", configuration.isExitingEnabled);
    setValueForSelect("spell-checker", configuration.isSpellCheckerEnabled);
    setValueForSelect("confirm-exit", configuration.isConfirmationEnabled);
    setValueForSelect("mute-audio", configuration.isAudioMuted);
    setValueForSelect("allow-audio-control", configuration.isControlAudioEnabled);
    setValueForSelect("cookie-cleanup", configuration.isCookieCleanupEnabled);
    setValueForSelect("preferences-windows", configuration.isPreferencesWindowsEnabled);
    document.getElementById("name-input").value = configuration.templatesName;
}

function setValueForSelect(selectId = "", value = false) {
    const element = document.getElementById(selectId);
    element.value = value ? "1" : "0";
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
    data.append('previous-name', previousConfigurationName);
   
    fetch("../api/edit-template.php", {
        method: "POST",
        body: data
    })
    .then(() => {
        goBackToSearch();
    });    
}


function reloadOptions() {
    document.getElementById("search-field").value = "";
    document.getElementById("items").querySelectorAll("li").forEach(li => li.remove());
    fetchConfigurations();
}

function getBooleanSelectValue(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const value = +element.value;
        return value !== 0;
    }

    return false;
}

function goBackToSearch() {
    if (document.getElementById("change-view-button").innerHTML === PREVIOUS) {
        changeStep();
    }
    hideElement("settings");
    showElement("search-section");
    reloadOptions();
}

function fetchConfigurations() {
    fetch("../api/get_all_templates.php", {
        method: "GET"
    }).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.text();
        }
        throw new Error((response.statusText));
    }).then((response) => {
        configurations = JSON.parse(response);
        return Promise;
    }).then(() => {
        const configurationNames = configurations.map(configuration => configuration.templatesName);
        const listForItems = document.getElementById("items");
        for (const name of configurationNames) {
            const listItem = document.createElement("li");
            const a = document.createElement("a");
            a.innerHTML = name;
            a.onclick = () => loadConfiguration();
            listItem.appendChild(a);
            listForItems.appendChild(listItem);
        }
    });
}
