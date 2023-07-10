class ForecastManager {

    searchForecast = (keyword) => {
        return makeAPICall(SERVER_URL + `/name/${keyword}`);
    }

    forecast = (lat, lng) => {
        return makeAPICall(`https://api.met.no/weatherapi/locationforecast/2.0` + `/compact?lat=${lat}&lon=${lng}`)
    }
}