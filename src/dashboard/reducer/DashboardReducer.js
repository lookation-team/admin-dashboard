import { RECEIVE_ALL_POSITIONS, RECEIVE_LOOKER_POSITIONS } from '../constants/DashboardConstants'
import DtoPosition from '../dto/DtoPosition'

export function DashboardReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ALL_POSITIONS :
            return Object.assign({}, state, {
                positions: action.positions.map(p => new DtoPosition(p))
            })
        case RECEIVE_LOOKER_POSITIONS :
            return Object.assign({}, state, {
                lookerPositions: action.positions.map(p => new DtoPosition(p))
            })
        default :
            return state
    }
}

export const DashboardStore = {
    positions: [],
    lookerPositions: []
}