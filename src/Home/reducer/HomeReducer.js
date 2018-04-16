import { SET_LOGIN_STATE, LOOKERS_INFOS } from '../constants/HomeConstants'


export function HomeReduer(state = {}, action) {
    switch (action.type) {
        case SET_LOGIN_STATE :
            return Object.assign({}, state, {
                loginState: action.loginState
            })
        case LOOKERS_INFOS : 
            return Object.assign({}, state, {
                firstName: action.firstName,
                lastName: action.lastName
            })
        default : 
            return state
    }
}

export const HomeStore = {
    loginState: false
}