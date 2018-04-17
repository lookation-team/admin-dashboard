export default class {
    constructor(looker = {}) {
        this.id = looker.id
        this.firstName = looker.firstName
        this.lastName = looker.lastName
        this.password = looker.password
        this.userName = looker.userName
        this.email = looker.email
        this.phoneNumber = looker.phoneNumber
        this.gender = looker.gender
        this.birthDate = looker.birthDate
    }
}