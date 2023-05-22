const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

function joinURL(baseURL, url) {
    return `${baseURL}/${url}`;
}

class Service {

    constructor() {
        this.domain = process.env.REACT_APP_API_URL
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

    getSchedule(url, id) {
        const method = "GET";
        if (id) {
            url = `${url}/${id}/schedule`;
        }
        return this.request(url, method).then(res => res.json());
    }

    getSeasonStats(url, id) {
        const method = "GET";
        if (id) {
            url = `${url}/${id}/season-stats`;
        }
        return this.request(url, method).then(res => res.json());
    }

    getPitchSmart(url, id) {
        const method = "GET";
        if (id) {
            url = `${url}/${id}/pitch-smart`;
        }
        return this.request(url, method).then(res => res.json());
    }

    getSearchHits(url, query) {
        const method = "GET";
        if (query) {
            url = `${url}?query=${query}&include_avatar=true`;
        }
        return this.request(url, method).then(res => res.json());
    }

    getEventVideos(url, id, eid) {
        const method = "GET";
        url = `${url}/${id}/schedule/${eid}/videos`;
        return this.request(url, method).then(res => res.json());
    }

    getEvent(url, id, eid) {
        const method = "GET";
        url = `${url}/${id}/schedule/${eid}`;
        return this.request(url, method).then(res => res.json());
    }

    importTeam(url, id) {
        const method = "POST";
        url = `${url}/${id}`;
        return this.request(url, method);
    }
}

export default Service;