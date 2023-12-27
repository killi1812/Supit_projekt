const createLink = (text, href) => {
    const link = document.createElement("a");
    link.innerText = text;
    link.href = href;
    link.className = "nav-link";

    return link;
}

(() => {
    const logoutHeader = () => {
        const loginLabel = document.querySelector("#login-register-label");
        if (sessionStorage.getItem("token")) {
            const usernameLabel = document.createElement("p");
            usernameLabel.innerText = sessionStorage.getItem("username");
            usernameLabel.className = "nav-text";
            loginLabel.appendChild(usernameLabel);

            const button = document.createElement("button");
            button.innerText = "Odjavi se";
            button.addEventListener("click", () => {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("username");
                location.reload();
            });
            button.className = "btn";

            loginLabel.appendChild(button);
        } else {
            loginLabel.appendChild(createLink("Prijavi se", "html/login.html"));
        }
    }
    const nastavniPlanNavItem = () => {
        if (!sessionStorage.getItem("token"))
            return;

        const li = document.querySelector("#nastavni-plan");
        li.appendChild(createLink("Nastavni plan", "html/nastavniPlan.html"));
    }

    nastavniPlanNavItem();
    logoutHeader();
})()