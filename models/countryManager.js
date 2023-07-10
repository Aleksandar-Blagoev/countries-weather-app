class CountryManager {
    loggedUser = null;

    constructor() {
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    }

    getAll = () => {
        return makeAPICall(SERVER_URL + '/all');
    }

    searchAll = (keyword) => {
        return makeAPICall(SERVER_URL + `/name/${keyword}`);
    }

}