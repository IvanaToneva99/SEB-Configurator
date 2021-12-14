const NEXT = "Next";
const PREVIOUS = "Previous";

function checkIfUserIsLogged() {
    if (!localStorage.getItem("email")) {
        alert("You have to be logged in to enter the page!");
        location.href = '../home-page/home-page.html';
    }
}

checkIfUserIsLogged();

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

function changeView() {
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
        hideElement("url-span");
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
        showElement("url-span");
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

function getBooleanSelectValue(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const value = +element.value;
        return value !== 0;
    }

    return false;
}
function logout() {
    localStorage.setItem("email", "");
}
