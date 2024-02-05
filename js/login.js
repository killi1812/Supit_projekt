(() => {
    import("./header.js").then(({navitems}) => {
        navitems(".");
    })

    const loginForm = document.querySelector("#login-form");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (username.value === "" || password.value === "") {
            alert("Popunite sva polja!");
            return;
        }

        login({
            username: username.value,
            password: password.value
        });

    });

    const login = async (loginData) => {
        const button = document.querySelector("#submit-loading-button");
        button.innerHTML = `
            <div class="spinner-border" role="status">
            </div>`;

            try{
                const response = fetch(
                    "https://www.fulek.com/data/api/user/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(loginData),
                    }
                );
        
                const rez = await response;
                const data = await rez.json();
                if (!data.isSuccess && data.errorMessages.length > 0) {
                    alert(data.errorMessages.join("\n"));
                    return;
                }
                sessionStorage.setItem("username", data.data.username);
                sessionStorage.setItem("token", data.data.token);
                location.replace("../index.html");
            }
            catch{
                alert("Došlo je do pogreške prilikom prijave");
            }
            finally{
                button.innerText = "Prijavi se";
            }
    }
})();