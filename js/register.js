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

        if (username.value === "" || password.value === "" || passwordConfirm.value === "") {
            alert("Popunite sva polja!");
            return;
        }

        if (password.value !== passwordConfirm.value) {
            alert("Lozinke se ne podudaraju");
            return;
        }

        register({
            username: username.value,
            password: password.value,
            passwordConfirm: passwordConfirm.value
        });
    });

    const register = (loginData) => {

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
                    if (isSuccess) {
                        location.replace("login.html");
                        alert("Accont created please login");
                    } else if (errorMessages.length > 0)
                        alert(errorMessages.join("\n"));
                })
                .catch(() => alert("Error registering try again later"))
        );
    }
})();