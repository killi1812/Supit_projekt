export const navitems = (path) => {
    const createLink = (text, href) => {
        const link = document.createElement("a");
        link.innerText = text;
        link.href = href;
       
        const links = window.location.href.split('/');
        const loc = links[links.length-1];
        if(`./${loc}` === href)
        link.className = "nav-link active";

        else
        link.className = "nav-link";

        return link;
    }
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
            loginLabel.appendChild(createLink("Registriraj se", `${path}/signup.html`));
            loginLabel.appendChild(createLink("Prijavi se", `${path}/login.html`));
        }
    }
    const nastavniPlanNavItem = (nastavniPlanHref) => {
        const li = document.querySelector("#nastavni-plan");
        if (!sessionStorage.getItem("token")){
            li.style.display = "none";
            return;
        }
        li.style.display = "block";
        if (li.children.length > 0)
            return;
        li.appendChild(createLink("Nastavni plan", `${path}/nastavniPlan.html`));
    }
    nastavniPlanNavItem();
    logoutHeader();
}
