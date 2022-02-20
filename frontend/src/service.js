import { appRouter } from "./router.js";

class Service {
    authUserSubscriptions = [];
    authUser = {
        value: undefined,
        subscribe: (cb) => {
            this.authUserSubscriptions.push(cb);
        }
    };

    constructor() {
        this.authenticate = this._authenticate.bind(this);
    }

    getWord() {
        return apiFetch('/word').then(res => res.json());
    }

    postWord(body) {
        return apiFetch('/word',{method: 'POST', body}).then(res => res.json());
    }

    register(body) {
        return apiFetch('/auth?action=register', {method: 'POST', body})
            .then(res => res.json())
            .then(res => appRouter.navigateTo('/auth?action=login'))
            .catch(console.log);
    }

    login(body) {
        return apiFetch('/auth?action=login', {method: 'POST', body}).then(res => res.json()).then(res => {
            this._changeAuthState(res);
            return res;
        }).catch(console.log);
    };

    logout() {
        return apiFetch('/auth?action=logout').then(() => {
            this._changeAuthState(null);
        }).catch(console.log)
    };

    _authenticate() {
        return apiFetch('/auth?action=authenticate')
            .then(res => res.json())
            .then(res => this._changeAuthState(res))
            .catch(() => this.authUser.value = null)
    };

    _changeAuthState(to) {
        this.authUser.value = to;
        this.authUserSubscriptions.forEach(cb => cb(this.authUser.value));
    }
}

export const apiFetch = (url, params = {}) => {
    return fetch(`api${url}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        ...params
    })
};

const service =  new Service();
export default service;
