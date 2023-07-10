class ForecastController {
  constructor(forecastManager) {
    this.forecastManager = forecastManager;
  }

  render = (name) => {
    let searchForecast = getElement('searchForecast');
    searchForecast.value = name;
    let countryName = getElement('countryName');
    let countryFlag = getElement('countryFlag');
    let forecastBoxes = getElement('forecastBoxes');
    let forecastSearchBtn = getElement('searchForecastButton');
    let forecastContainer = getElement('forecastContainer');
    let weatherForNextSixHours = getElement('wheatherForNextSixHours');

    forecastBoxes.innerHTML = '';
    countryName.innerHTML = '';
    countryFlag.src = '';
    forecastContainer.classList.add('hidden');

    forecastSearchBtn.onclick = throttle((event) => {
      forecastBoxes.innerHTML = '';
      countryName.innerHTML = '';
      countryFlag.src = '';
      forecastContainer.classList.add('hidden');

      let country;
      let keyword = searchForecast.value;
      this.forecastManager.searchForecast(keyword)
        .then(data => {
          country = data.find(element => element.capitalInfo.latlng);
          return this.forecastManager.forecast(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]);
        })
        .then(data => {
          countryName.textContent = country.name.official;
          countryFlag.src = country.flags.png;
          countryFlag.style.width = '100px';

          for (let i = 0; i < 6; i++) {
            let time = new Date(data.properties.timeseries[i].time).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' });
            let degrees = data.properties.timeseries[i].data.instant.details.air_temperature;
            let box = document.createElement('div');
            box.classList.add('forecastBox');
            box.innerHTML = `
              <div class="time">${time}</div>
              <div class="degrees">${degrees}°C</div>
            `;
            forecastBoxes.appendChild(box);
          }

          const symbolCode = data.properties.timeseries[0].data.next_6_hours.summary.symbol_code;
          const weatherText = getWeatherText(symbolCode);
          const weatherImage = getWeatherImage(symbolCode);

          weatherForNextSixHours.textContent = weatherText;
          weatherForNextSixHours.appendChild(weatherImage);

          forecastContainer.classList.remove('hidden');
        });
    }, 2000);
  }
}


// Helper function to get the weather text based on the symbol code
function getWeatherText(symbolCode) {
  switch (symbolCode) {
    case 'rainshowers_day':
      return 'Rainy';
    case 'clearsky_day':
      return 'Sunny';
    case 'partlycloudy_day':
    case 'cloudy':
      return 'Cloudy';
    case "fair_day":
      return 'Sunny';

    default:
      return '';
  }
}

function getWeatherImage(symbolCode) {
  const image = document.createElement('img');
  image.style.width = "60px"
  image.classList.add('weather-image');

  switch (symbolCode) {
    case 'rainshowers_day':
      image.src = "https://icon-library.com/images/weather-icon-sunny/weather-icon-sunny-5.jpg";
      image.alt = 'Rainy';
      break;
    case 'clearsky_day':
      image.src = 'https://icon-library.com/images/weather-icon-sunny/weather-icon-sunny-0.jpg';
      image.alt = 'Sunny';
      break;
    case 'partlycloudy_day':
    case 'cloudy':
      image.src = 'https://icon-library.com/images/cloudy-icon/cloudy-icon-19.jpg';
      image.alt = 'Cloudy';
      break;
    case "fair_day":
      image.src = 'https://icon-library.com/images/weather-icon-sunny/weather-icon-sunny-0.jpg';
      image.alt = 'Sunny';
      break;

    default:
      break;
  }

  return image;
}
