import {
    SET_LOGIN_STATE, 
    LOOKATION_TOKEN 
} from '../constants/HomeConstants'
import { push } from 'react-router-redux'
import { HomeReducer } from '../reducer/HomeReducer'
import { toast } from '../../utils/MaterializeUtil'

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
            .then(res => res.json())
            .then((res) => {
                localStorage.setItem(LOOKATION_TOKEN, res.token)
                dispatch(push('/dashboard'))
                toast('Hey, nice to see you again !')
            })
            .catch(() => {
                
            })
        }
    },

    setLoginState(loginState) {
        return {
            type: SET_LOGIN_STATE,
            loginState: loginState
        }
    },

    logout() {
        return dispatch => {
            localStorage.removeItem(LOOKATION_TOKEN)
            dispatch(push('/'))
        }
    }
}

export default HomeActions