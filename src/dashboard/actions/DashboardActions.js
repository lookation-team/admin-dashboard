import { RECEIVE_ALL_POSITIONS, RECEIVE_LOOKER_POSITIONS } from '../constants/DashboardConstants'
import { checkAuth, getAuthorization } from '../../utils/ActionUtils'
import { toastError } from '../../utils/MaterializeUtil'
import ApplicationConf from '../../conf/ApplicationConf'

const DashboardActions = {
    setInitialPositions() {
        return dispatch => {
            fetch(ApplicationConf.positions(), {
                method: 'GET',
                headers: getAuthorization()
            })
            .then(checkAuth)
            .then(positions => {
                dispatch(DashboardActions.receiveAllPositions(positions))
            })
            .catch(err =>{
                toastError(err)
            })
        }
    },

    receiveAllPositions(positions) {
        return {
            type: RECEIVE_ALL_POSITIONS,
            positions: positions
        }
    },

    fetchLookerPositions(id) {
        return dispatch => {
            fetch(ApplicationConf.lookerPositions(id), {
                method: 'GET',
                headers: getAuthorization()
            })
            .then(checkAuth)
            .then(positions => {
                console.log(positions)
                dispatch(DashboardActions.receiveLookerPositions(positions))
            })
            .catch(err =>{
                toastError(err)
            })
        }
    },

    receiveLookerPositions(positions) {
        return {
            type: RECEIVE_LOOKER_POSITIONS,
            positions: positions
        }
    }
}

export default DashboardActions