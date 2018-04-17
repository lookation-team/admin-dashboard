import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import createHistory from 'history/createHashHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { DashboardReducer, DashboardStore } from '../dashboard/reducer/DashboardReducer'
import { HomeReducer, HomeStore } from '../Home/reducer/HomeReducer'

const reducer = combineReducers({
    DashboardReducer,
    HomeReducer,
    routing: routerReducer,
})

export const history = createHistory()

const Store = createStore(reducer, {
        DashboardReducer: DashboardStore,
        HomeReducer: HomeStore
    }, compose(
        applyMiddleware(thunk, routerMiddleware(history), logger)
))

export default Store
