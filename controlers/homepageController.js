class HomepageController {

    constructor(countryManager, userManager, forecastManager, forecastController) {
        this.userManager = userManager;
        this.countryManager = countryManager;
        this.forecastManager = forecastManager;
        this.forecastController = forecastController;
        // this.detailManager = detailManager;
        // this.detailController = detailController;
    }

    parties;

    render = () => {
        let search = getElement("search");
        let container = getElement("countiresContainer");
        container.innerHTML = '';

        search.oninput = debounce((event) => {
            container.innerHTML = '';
            let keyword = event.target.value;
            if (keyword === '') {
                this.countryManager.getAll()
                    .then(data => {
                        this.renderCountries(data);
                    })
                    .catch(error => {
                        alert(error);
                    });
            } else {
                this.countryManager.searchAll(keyword)
                    .then(result => {
                        this.renderCountries(result)
                    });
            }

        }, 500);

        this.countryManager.getAll()
            .then(data => {
                this.renderCountries(data);
            })
            .catch(error => {
                alert(error);
            });


    }

    renderCountries = (data) => {

        data.forEach(country => {

            let card = document.createElement('div');
            card.classList.add('card', 'my-card');

            let img = document.createElement('img');
            img.src = country.flags.png;
            img.classList.add('card-img-top');
            img.style.width = 'auto'; // Set the desired width
            img.style.height = 'auto'; // Set the desired height
            img.style.objectFit = 'cover'; // Ensure the image fills the specified dimensions
            img.style.padding = '10px';
            card.appendChild(img);

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            let name = document.createElement('h5');
            name.textContent = country.name.official;
            name.classList.add('card-title');
            cardBody.appendChild(name);

            let capital = document.createElement('p');
            capital.textContent = 'Capital: ' + (country.capital || "none");
            cardBody.appendChild(capital);

            let forecastBtn = document.createElement('button');
            forecastBtn.textContent = 'See forecast';
            forecastBtn.classList.add('btn', 'btn-primary');

            let followBtn = document.createElement('button');
            followBtn.textContent = this.userManager.isFollowed(country) ? 'Remove from Followed' : 'Add to Followed';
            followBtn.classList.add('btn', 'btn-secondary');


            let buttonContainer = document.createElement('div'); // Create a container for the buttons
            buttonContainer.classList.add('button-container');
            buttonContainer.appendChild(forecastBtn);
            buttonContainer.appendChild(followBtn);

            cardBody.appendChild(buttonContainer);
            card.appendChild(cardBody);

            document.getElementById('countiresContainer').appendChild(card);

            followBtn.addEventListener('click', () => {
                if (this.userManager.isFollowed(country)) {
                    this.userManager.removeFromFollowed(country);
                    followBtn.textContent = 'Add to Followed'; // Update button text
                } else {
                    this.userManager.addToFollowed(country);
                    followBtn.textContent = 'Remove from Followed'; // Update button text
                    location.hash = 'favourites';
                }
                this.renderCountries(JSON.parse(localStorage.getItem('data')));
            });


            forecastBtn.addEventListener('click', () => {
                let coountryName = country.name.official
                localStorage.setItem('countryName', JSON.stringify(coountryName));
                location.hash = "forecast"
                this.forecastController.render(country.name.official);
            });

        });
    }

}