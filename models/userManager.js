class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}


class UserManager {

    // constructor get's called every time when we create a new instance 
    constructor() {
        this.data;
        let loggedUser = JSON.parse(localStorage.getItem('isThereUser'));
        if (loggedUser) {
            this.loggedUser = new User(loggedUser.username, loggedUser.password);
        }

        let registeredUsers = JSON.parse(localStorage.getItem("users"));
        if (registeredUsers) {
            this.users = registeredUsers;
        }

        localStorage.setItem('followed', JSON.stringify(this.favourites));
    }

    loggedUser = null;
    users = [new User('slavi', 'bahur'), new User('admin', 'admin')];

    login = ({ username, password }) => {
        return new Promise((resolve, reject) => {
            let foundUser = this.users.find(user => user.username === username && user.password === password);
            if (foundUser) {
                this.loggedUser = foundUser;
                localStorage.setItem('isThereUser', JSON.stringify(this.loggedUser));
                resolve(foundUser);
            } else {
                reject("Wrong credentials");
            }
        });
    };

    register = ({ username, password }) => {

        return new Promise((resolve, reject) => {
            let foundUser = this.users.find(user => user.username === username);

            if (!foundUser) {
                let newUser = new User(username, password);
                this.users.push(newUser);
                localStorage.setItem("users", JSON.stringify(this.users));
                resolve(newUser);
            } else {
                reject("Username already taken");
            }
        });
    };

    logout = () => {
        if (this.loggedUser) {
            const currentUserIndex = this.users.findIndex(user => user.username === this.loggedUser.username);

            if (currentUserIndex !== -1) {
                this.users[currentUserIndex] = JSON.parse(localStorage.getItem("isThereUser"));
            }
            localStorage.removeItem("isThereUser");
            this.loggedUser = null;
        }
    };

    isNameTaken(username) {
        let names = this.users.map(obj => obj.username);
        if (!names.includes(username.toLowerCase())) {
            return true;
        }
        return false;
    }

    getFollowedCountries() {
        return JSON.parse(localStorage.getItem('data'));
    }

    addToFollowed(current) {
        this.data = JSON.parse(localStorage.getItem('data')) || [];
        this.data.push(current);
        localStorage.setItem('data', JSON.stringify(this.data));
    }

    removeFromFollowed(country) {
        let followedCountries = JSON.parse(localStorage.getItem('data')) || [];
        let index = followedCountries.findIndex(c => c.population === country.population);
        if (index !== -1) {
            followedCountries.splice(index, 1);
            localStorage.setItem('data', JSON.stringify(followedCountries));
        }
    }

    isFollowed(country) {
        let followedCountries = JSON.parse(localStorage.getItem('data')) || [];
        return followedCountries.some(c => c.population === country.population);
    }

}