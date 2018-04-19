import { RECEIVE_ALL_POSITIONS } from '../constants/DashboardConstants'
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
    }
}

export default DashboardActions