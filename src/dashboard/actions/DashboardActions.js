import Store from '../../store/Store'
import { RECEIVE_ALL_POSITIONS } from '../constants/DashboardConstants'
import { DashboardReducer } from '../reducer/DashboardReducer'
import { checkAuth, getAuthorization } from '../../utils/ActionUtils'
import { toastError } from '../../utils/MaterializeUtil'

const DashboardActions = {
    setInitialPositions() {
        return dispatch => {
            fetch('http://origamihome.freeboxos.fr/position', {
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
    }
}

export default DashboardActions