import Store from '../../store/Store'
import { toastError } from '../../utils/MaterializeUtil'
import { 
    RECEIVE_LOOKER,
    RECEIVE_ALL_LOOKERS,
    RESET_LOOKER
} from '../constants/LookerConstants'
import ApplicationConf from '../../conf/ApplicationConf'
import { getAuthorization, checkAuth } from '../../utils/ActionUtils'

const LookerAction = {
    receiveLookers(lookers) {
        return { type: RECEIVE_ALL_LOOKERS, lookers: lookers }
    },

    fetchLookers() {
        return (dispatch) => {
            return fetch(ApplicationConf.looker.lookers(), {
                method: 'GET',
                headers: getAuthorization()
            })
                .then(checkAuth)
                .then((json = {}) => {
                    dispatch(LookerAction.receiveLookers(json))
                })
                .catch(err => {
                    toastError(err)
                })
        }
    },

    receiveLooker(looker) {
        return { type: RECEIVE_LOOKER, looker: looker }
    },

    fetchLooker(id) {
        return (dispatch) => {
            return fetch(ApplicationConf.looker.looker(id), {
                method: 'GET',
                header: getAuthorization()
            })
                .then(checkAuth)
                .then((json = []) => {
                    dispatch(LookerAction.receiveLooker(json))
                })
                .catch(err => {
                    toastError(err)
                })
        }
    },

    reset() {
        return {
            type: RESET_LOOKER
        }
    }
}

export default LookerAction