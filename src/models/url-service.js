import fetch from 'isomorphic-fetch';

export default class UrlService {
    constructor(apiUrl) {
        this._apiUrl = apiUrl;
    }

    shorten(url) {
        return fetch(`${this._apiUrl}/s`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({url})
        }).then((response) => {
            if (response.status != 200) {
                throw new Error(response.statusText);
            }

            return response.json();
        });
    }
}
