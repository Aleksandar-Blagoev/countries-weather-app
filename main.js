class ViewController {
    constructor() {
        window.addEventListener('load', this.handleHashChange);
        window.addEventListener('hashchange', this.handleHashChange);

        this.userManager = new UserManager();
        this.countryManager = new CountryManager();
        this.forecastManager = new ForecastManager();

        this.loginController = new LoginController(this.userManager);
        this.registerController = new RegisterController(this.userManager);
        this.forecastController = new ForecastController(this.forecastManager);
        this.homepageController = new HomepageController(this.countryManager, this.userManager, this.forecastManager, this.forecastController);
        this.followedController = new FollowedController(this.userManager);
        this.renderHeader();

    }

    handleHashChange = (e) => {
        const hash = location.hash.slice(1) || PAGE_IDS[0];

        if (hash === 'home' || hash === 'favourites' || hash === 'forecast') {
            if (!this.userManager.loggedUser) {
                location.hash = 'login';
                return;
            }
        }

        if (!PAGE_IDS.includes(hash)) {
            location.hash = '404';
            return
        }

        PAGE_IDS.forEach(pageId => {
            let element = getElement(pageId);

            hash === pageId ? element.style.display = "block" : element.style.display = "none";
        });

        switch (hash) {
            case 'register':
                this.registerController.render();
                break;
            case 'login':
                this.loginController.render(this.renderHeader());
                break;
            case 'home':
                this.homepageController.render();
                break;
            case 'favourites':
                this.followedController.renderFollowed();
                break;
            case 'forecast':
                this.forecastController.render(JSON.parse(localStorage.getItem('countryName')));
                break;

        }

        this.renderHeader();
    }

    renderHeader = () => {
        let loginButton = document.querySelector("div .login");
        let registerButton = document.querySelector("div .register");
        let logoutButton = document.querySelector("div .logout.hidden");

        if (this.userManager.loggedUser) {
            loginButton.style.display = "none";
            registerButton.style.display = "none";
            logoutButton.style.display = "block";
            logoutButton.onclick = () => {
                this.userManager.logout();
                this.renderHeader();
            };
        } else {
            loginButton.style.display = "block";
            registerButton.style.display = "block";
            logoutButton.style.display = "none";
        }
    };

}

let viewController = new ViewController();