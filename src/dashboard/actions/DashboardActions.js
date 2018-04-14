import Store from '../../store/Store'
import { RECEIVE_ALL_POSITIONS } from '../constants/DashboardConstants'
import { DashboardReducer } from '../reducer/DashboardReducer';

const DashboardActions = {
    setInitialPositions() {
        return dispatch => {
            const positions = [{
                longitude: -10,
                latitude: 10,
                userName: 'robert'
            },{
                longitude: -15,
                latitude: 12,
                userName: 'pons'
            },{
                longitude: -20,
                latitude: 666,
                userName: 'canac'
            }]
            dispatch(DashboardActions.receiveAllPositions(positions))
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