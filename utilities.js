function getElement(id) {
    return document.getElementById(id);
}

function createEl(el) {
    return document.createElement(el);
}

function makeAPICall(url) {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return new Promise((res, rej) => {
                    response.json()
                        .then(result => res(result))
                        .catch(error => res(error))
                })
            }
            return new Promise((res, rej) => {
                response.json()
                    .then(body => {
                        rej(new Error(body.message))
                    });
            })
        })
}


function debounce(action, seconds) {
    let timerId = null;

    return function (...event) {
        clearTimeout(timerId);
        timerId = setTimeout(action, seconds, ...event)
    }
}


function throttle(func, delay) {
    let timerId;
    let lastExecuted = 0;

    return function (...args) {
        const currentTime = Date.now();

        if (currentTime - lastExecuted > delay) {
            func.apply(this, args);
            lastExecuted = currentTime;
        } else {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                func.apply(this, args);
                lastExecuted = Date.now();
            }, delay);
        }
    };
}

