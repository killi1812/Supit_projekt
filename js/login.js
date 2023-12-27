(() => {
    const loginForm = document.querySelector("#login-form");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        login();
    });

    const login = () => {
        const loginData = {
            username: username.value,
            password: password.value,
        };

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

        response.then((result) =>
            result
                .json()
                .then(({data, isSuccess, errorMessages}) => {
                    if (!isSuccess && errorMessages.length > 0) {
                        alert(errorMessages.join("\n"));
                        return;
                    }
                    storeUserSessionLogin(data.username, data.token);
                    location.replace("../index.html");
                })
                .catch(() => alert("wrong email or password"))
        );

        const storeUserSessionLogin = (username, token) => {
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("token", token);
        }
    }
})();