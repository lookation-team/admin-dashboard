export default class {
    constructor(looker = {}) {
        this.id = looker.id
        this.userName = looker.userName
        this.email = looker.email
        this.headers = ['userName', 'email']
    }
}