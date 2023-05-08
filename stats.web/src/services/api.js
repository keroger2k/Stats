const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

function joinURL(baseURL, url) {
    return `${baseURL}/${url}`;
}

class Service {

    constructor() {
        this.domain = 'http://localhost:5221/api'
    }

    request(url, method = "GET", data = null) {
        url = joinURL(this.domain, url);
        const options = {
            headers,
            method
        }
        if (data) {
            options.body = JSON.stringify({ ...data });
        }
        return fetch(url, options);
    }

    get(url, id) {
        const method = "GET";
        if (id) {
            url = `${url}/${id}`;
        }
        return this.request(url, method).then(res => res.json());
    }
}

export default Service;