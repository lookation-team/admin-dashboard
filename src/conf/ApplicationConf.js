import { path } from './basepath'

export default {
    looker: {
        lookerPath() {
            return `${path}looker`
        },
        lookers() {
            return this.lookerPath()
        },
        looker(id) {
            return `${this.lookerPath()}/${id}`
        }
    },
    login() {
        return path + 'login'
    },
    positions() {
        return path+ 'position'
    },
    lookerPositions(id) {
        return `${path}position/looker/${id}`
    }
}