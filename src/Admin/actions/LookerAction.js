import { toastError } from '../../utils/MaterializeUtil'
import { 
    RECEIVE_LOOKER,
    RECEIVE_ALL_LOOKERS,
    RESET_LOOKER
} from '../constants/LookerConstants'
import { push } from 'react-router-redux'
import ApplicationConf from '../../conf/ApplicationConf'
import { getAuthorization, checkAuth } from '../../utils/ActionUtils'
import LookerDto from '../../Home/dto/lookerDto'

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
                headers: getAuthorization()
            })
                .then(checkAuth)
                .then((json = {}) => {
                    dispatch(LookerAction.receiveLooker(json))
                })
                .catch(err => {
                    toastError(err)
                })
        }
    },

    updateLooker(looker, id) {
        return (dispatch) => {
            const dtoLooker = new LookerDto(looker)
            return fetch(ApplicationConf.looker.put(looker.id), {
                method: 'PUT',
                headers: getAuthorization(),
                body: JSON.stringify(dtoLooker.getPutLooker())
            })
                .then(checkAuth)
                .then(() => {
                    dispatch(push('/looker'))
                })
                .catch((err) => {
                    toastError(err)
                })
        }
    },

    deleteLooker(id) {
        return (dispatch) => {
            return fetch(ApplicationConf.looker.delete(id), {
                method: 'DELETE',
                headers: getAuthorization(),
            })
                .then(checkAuth)
                .then(dispatch(push('/dashboard')))
        }
    },

    reset() {
        return {
            type: RESET_LOOKER
        }
    }
}

export default LookerAction