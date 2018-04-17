import {
    SET_LOGIN_STATE, 
    LOOKATION_TOKEN,
    LOOKER,
    RESET
} from '../constants/HomeConstants'
import { push } from 'react-router-redux'
import { toast, toastError } from '../../utils/MaterializeUtil'
import { getPayload, getAuthorization, checkAuth } from '../../utils/ActionUtils'
import { HomeReducer } from '../reducer/HomeReducer';

const HomeActions = {
    login(email, password) {
        return dispatch => {
            /*fetch('http://192.168.1.30:3333/login', {*/
            fetch('http://origamihome.freeboxos.fr/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password
                    //scope: ['admin']
                })
            })
            .then(checkAuth)
            .then((res) => {
                localStorage.setItem(LOOKATION_TOKEN, res.token)
                dispatch(push('/dashboard'))
                toast('Hey, nice to see you again !')
            })
            .then(() => {
                dispatch(HomeActions.getLookerInfos())
            })
            .catch((err) => {
                toastError(err)
            })
        }
    },

    setLoginState(loginState) {
        return {
            type: SET_LOGIN_STATE,
            loginState: loginState
        }
    },

    setLooker(looker){
        return {
            type: LOOKER,
            looker: looker
        }
    },

    logout() {
        return dispatch => {
            localStorage.removeItem(LOOKATION_TOKEN)
            dispatch(HomeActions.reset())
            dispatch(push('/'))
        }
    },

    reset() {
        return {
            type: RESET
        }
    },

    getLookerInfos() {
        const token = getPayload()
        return dispatch => {
            fetch('http://origamihome.freeboxos.fr/looker/' + token.id, {
                method: 'GET',
                headers: getAuthorization()
            }).then(checkAuth)
            .then(looker => {
                dispatch(HomeActions.setLooker(looker))
            })
            .catch((err) => {
                toastError(err)
            })
        }
    }
}

export default HomeActions