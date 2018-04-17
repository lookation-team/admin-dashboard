import { SET_LOGIN_STATE, LOOKER, RESET } from '../constants/HomeConstants'
import looker from '../dto/lookerDto'

export function HomeReducer(state = {}, action) {
    switch (action.type) {
        case SET_LOGIN_STATE :
            return Object.assign({}, state, {
                loginState: action.loginState
            })
        case LOOKER : 
            return Object.assign({}, state, {
                looker: new looker(action.looker)
            })
        case RESET :
            return Object.assign({}, HomeStore)
        default : 
            return state
    }
}

export const HomeStore = {
    loginState: false,
    looker: new looker()
}