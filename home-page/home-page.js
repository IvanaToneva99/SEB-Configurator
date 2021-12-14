function redirectToCreateFromScratchPage() {
    location.href = '../create-from-scratch-page/create-from-scratch-page.html';
}

function redirectToCreateTemplatePage() {
    location.href = '../create-template-page/create-template-page.html';
}

function redirectToEditTemplatePage() {
    location.href = '../edit-template-page/edit-template-page.html'
}

function redirectToGenerateFromTemplatePage() {
    location.href = '../generate-from-template/generate-from-template.html'
}

function loadSignOptions() {
    const navigationBar = document.getElementById("navigation-bar");

    if (localStorage.getItem("email")) {
        const logout = document.createElement("a");
        logout.href = "../login-page/login-page.html";
        logout.onclick=() => localStorage.setItem("email", "");
        logout.innerHTML = "Sign out";
        navigationBar.appendChild(logout);
    } else {
        const signIn = document.createElement("a");
        signIn.href="../login-page/login-page.html";
        signIn.innerHTML="Sign In";
        const signOut = document.createElement("a");
        signOut.href="../register-page/register-page.html"
        signOut.innerHTML = "Sign Up";
        navigationBar.appendChild(signIn);
        navigationBar.appendChild(signOut);
    }
}
