import moment from 'moment'

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

    getPutLooker() {
        const looker = {
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            email: this.email,
            gender: this.gender
            //birthDate: moment(this.birthDate, 'MMM DD, YYYY').valueOf()
        }
        if (this.phoneNumber) {
            looker.phoneNumber = this.phoneNumber
        }
        return looker
    }
}