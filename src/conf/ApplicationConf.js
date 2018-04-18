'use strict'

import { path } from './basepath'

export default {
    looker: {
        lookerPath() {
            return path + 'looker'
        },
        lookers() {
            return this.lookerPath()
        },
        looker(id) {
            return this.lookerPath() + id
        }
    }
}