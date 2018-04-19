import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import createHistory from 'history/createHashHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { DashboardReducer, DashboardStore } from '../dashboard/reducer/DashboardReducer'
import { HomeReducer, HomeStore } from '../Home/reducer/HomeReducer'
import { LookerReducer, LookerStore } from '../Admin/reducer/LookerReducer'
const reducer = combineReducers({
    DashboardReducer,
    HomeReducer,
    LookerReducer,
    routing: routerReducer,
})

export const history = createHistory()

const Store = createStore(reducer, {
        DashboardReducer: DashboardStore,
        HomeReducer: HomeStore,
        LookerReducer: LookerStore
    }, compose(
        applyMiddleware(thunk, routerMiddleware(history), logger)
))

export default Store
