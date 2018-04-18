import {
    RECEIVE_LOOKER,
    RECEIVE_ALL_LOOKERS,
    RESET_LOOKER
} from '../constants/LookerConstants'
import lookerDto from '../../Home/dto/lookerDto'
import LookerListDto from '../dto/LookerListDto'

export function LookerReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ALL_LOOKERS:
            return Object.assign({}, state, {
                lookers: action.lookers.map(looker => new LookerListDto(looker))
            })
        case RECEIVE_LOOKER:
            return Object.assign({}, state, {
                looker: new lookerDto(action.looker)
            })
        case RESET_LOOKER:
            return Object.assign({}, LookerStore)
        default:
            return state
    }
}

export const LookerStore = {
    lookers: [],
    looker: {}
}