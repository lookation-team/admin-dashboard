import { SET_LOGIN_STATE } from '../constants/HomeConstants'
import { HomeReducer } from '../reducer/HomeReducer'

const HomeActions = {
    login(email, password) {
        return dispatch => {
            /*fetch('http://192.168.1.30:3333/login', {*/
            fetch('http://origamihome.freeboxos.fr/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then((res) => {
                console.log(res.json())
            })
        }
    },

    setLoginState(loginState) {
        return {
            type: SET_LOGIN_STATE,
            loginState: loginState
        }
    }
}

export default HomeActions