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
        $.ajax({
            url: "https://www.fulek.com/data/api/user/register",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(loginData),
            success: function(response) {
                if (response.isSuccess) {
                    location.replace("login.html");
                    alert("Account created please login");
                } else if (response.errorMessages.length > 0) {
                    alert(response.errorMessages.join("\n"));
                }
            },
            error: function() {
                alert("Error registering try again later");
            }
        });
    }
})();