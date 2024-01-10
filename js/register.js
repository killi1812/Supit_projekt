(() => {
    import("./header.js").then(({navitems}) => {
        navitems(".");
    })

    const registerForm = document.querySelector("#register-form");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const passwordConfirm = document.querySelector("#password2");

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        register();
    });

    const register = () => {
        if (password.value !== passwordConfirm.value) {
            alert("passwords do not match");
            return;
        }

        const loginData = {
            username: username.value,
            password: password.value,
        };
        const response = fetch(
            "https://www.fulek.com/data/api/user/register",
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
                .then(({isSuccess, errorMessages}) => {
                    if (isSuccess){
                        location.replace("login.html");
                        alert("Accont created please login");
                    }
                    else if (errorMessages.length > 0)
                        alert(errorMessages.join("\n"));
                })
                .catch(() => alert("wrong email or password"))
        );
    }
})();