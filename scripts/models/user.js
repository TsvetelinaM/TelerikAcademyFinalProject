
class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.info = { type: 'v', items: [] };
        this.avatar = [];
        this.comments = [];
    }
}

export { User as default }