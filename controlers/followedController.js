
class FollowedController {
    constructor(userManager) {
        this.userManager = userManager;
    }

    renderFollowed = () => {
        let favouritesContainer = getElement('favouritesContainer');
        favouritesContainer.innerHTML = '';

        let followedCountries = this.userManager.getFollowedCountries();
        if (followedCountries.length > 0) {
            followedCountries.forEach(country => {
                if (country) {
                    this.createCountryCard(country);
                }
            });
        }
    }

    createCountryCard = (country) => {
        let favouritesContainer = getElement('favouritesContainer');

        let card = document.createElement('div');
        card.classList.add('card');

        let img = document.createElement('img');
        img.src = country.flags.png;
        img.classList.add('card-img-top');
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

        let unfollowBtn = document.createElement('button');
        unfollowBtn.textContent = 'Remove from Followed';
        unfollowBtn.classList.add('btn', 'btn-secondary');

        cardBody.appendChild(unfollowBtn);

        card.appendChild(cardBody);

        unfollowBtn.addEventListener('click', () => {
            this.userManager.removeFromFollowed(country);
            favouritesContainer.removeChild(card); // Remove the card element from the container
        });

        favouritesContainer.append(card);
    }
}
