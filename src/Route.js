import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import App from './App.js'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import Store, { history } from './store/Store'
import Dashboard from './dashboard/components/Dashboard'
import Nav from './Home/components/Nav'
import Login from './Home/components/Login.js'
import { getPayload, getLoginPassword } from './utils/ActionUtils'
import moment from 'moment'
import AuthRoute from './components/routes/AuthRoute'
import LookersApp from './Admin/components/LookersApp'

export const Routes = () => {
    console.log(Provider, ConnectedRouter)
    return (
        <Provider store={Store}>
            <ConnectedRouter history={history}>
                <div>
                    <div>
                        <Nav />
                    </div>
                    <Switch>
                        <AuthRoute path='/' exact component={Dashboard}/>
                        <AuthRoute path='/dashboard' exact component={Dashboard}/>
                        <AuthRoute path='/looker' exact component={LookersApp}/>
                        <Route path='/login' exact component={Login}/>
                        <AuthRoute component={Dashboard}/>
                    </Switch>
                </div>
            </ConnectedRouter>
        </Provider>
    )
}