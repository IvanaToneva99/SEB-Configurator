let configurations = [];
let currentConfiguration = {};
const PREVIOUS = "Previous";
const NEXT = "Next";

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
        hideElement("url-span");
        hideElement("taskbar-span");
        hideElement("time-span");
        hideElement("reload-span");
        hideElement("language-span");
        hideElement("exit-span");
        showElement("generate-configuration");
        showElement("spell-span");
        showElement("confirmation-span");
        showElement("mute-span");
        showElement("control-audio-span");
        showElement("cookie-span");
        showElement("preferences-span");
        currentState.innerHTML = PREVIOUS;
    } else {
        showElement("url-span");
        showElement("taskbar-span");
        showElement("time-span");
        showElement("reload-span");
        showElement("language-span");
        showElement("exit-span");
        hideElement("generate-configuration");
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


function generateConfiguration() {
    const url = document.getElementById("url-input").value;
    const isTaskbarEnabled = getBooleanSelectValue("taskbar");
    const isTimeEnabled = getBooleanSelectValue("time");
    const isReloadEnabled = getBooleanSelectValue("show-reload");
    const isLanguageBarEnabled = getBooleanSelectValue("show-language");
    const isExitingEnabled = getBooleanSelectValue("allow-exiting");
    const isSpellCheckerEnabled = getBooleanSelectValue("spell-checker");
    const isConfirmationEnabled = getBooleanSelectValue("confirm-exit");
    const isAudioMuted = getBooleanSelectValue("mute-audio");
    const isControlAudioEnabled = getBooleanSelectValue("allow-audio-control");
    const isCookieCleanupEnabled = getBooleanSelectValue("cookie-cleanup");
    const isPreferencesWindowsEnabled = getBooleanSelectValue("preferences-windows");

    const fileContent =
        `<?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
        <plist version="1.0"><dict><key>showTaskBar</key><${isTaskbarEnabled}/><key>allowWlan</key><true/><key>showReloadButton</key><${isReloadEnabled}/><key>showTime</key><${isTimeEnabled}/><key>showInputLanguage</key><${isLanguageBarEnabled}/><key>allowQuit</key><${isExitingEnabled}/><key>quitURLConfirm</key><${isConfirmationEnabled}/><key>audioControlEnabled</key><${isControlAudioEnabled}/><key>audioMute</key><${isAudioMuted}/><key>allowSpellCheck</key><${isSpellCheckerEnabled}/><key>browserWindowAllowReload</key><${isReloadEnabled}/><key>URLFilterEnable</key><false/><key>URLFilterEnableContentFilter</key><false/><key>URLFilterRules</key><array/><key>startURL</key><string>${url}</string><key>sendBrowserExamKey</key><true/><key>examSessionClearCookiesOnStart</key><${isCookieCleanupEnabled}/><key>allowPreferencesWindow</key><${isPreferencesWindowsEnabled}/></dict></plist>`

    download("configuration.seb", fileContent);
}

function download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
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
