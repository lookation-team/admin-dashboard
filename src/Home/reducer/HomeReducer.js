import { SET_LOGIN_STATE } from '../constants/HomeConstants'


export function HomeReduer(state = {}, action) {
    switch (action.type) {
        case SET_LOGIN_STATE :
            return Object.assign({}, state, {
                loginState: action.loginState
            })
        default : 
            return state
    }
}

export const HomeStore = {
    loginState: false
}