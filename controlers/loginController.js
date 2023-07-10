class LoginController {
    constructor(userManager) {
        this.userManager = userManager;
    }

    render = () => {
        let form = getElement('loginForm');
        let loginName = getElement('inputUsernameLog');
        let loginPassInput = getElement('inputPasswordLoggin');

        form.onsubmit = (e) => {
            e.preventDefault();
            let username = loginName.value;
            let password = loginPassInput.value;

            this.checkingLogin()
                .then(() => {
                    this.userManager.login({ username, password });
                    location.hash = "home";
                })
                .catch(err => alert(err));
        }
    }


    checkingLogin() {
        return new Promise((resolve, reject) => {
            let form = document.getElementById("loginForm");
            let loginUsername = document.getElementById("inputUsernameLog");
            let loginPass = document.getElementById("inputPasswordLoggin");
            let button = document.getElementById("loginBtn");

            const checkInputs = () => {
                if (loginUsername.value.trim() !== "" && loginPass.value.trim() !== "") {
                    button.removeAttribute("disabled");
                } else {
                    button.setAttribute("disabled", "disabled");
                }
            };

            checkInputs();
            loginUsername.addEventListener("keyup", checkInputs);
            loginPass.addEventListener("keyup", checkInputs);

            form.addEventListener("submit", (event) => {
                event.preventDefault();
                form.reset();
                checkInputs();
            });

            resolve();
        });
    }

}

