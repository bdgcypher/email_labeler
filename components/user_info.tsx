export class User {
    email = '';
    token = '';
    constructor() {}

    setToken(value: string) {
        this.token = value;
    }

    getToken() {
        return this.token;
    }
}

export var userInfo = new User();