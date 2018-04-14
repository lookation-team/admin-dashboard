import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import App from './App.js'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import Store, { history } from './store/Store'
import Dashboard from './dashboard/components/Dashboard'
import Nav from './Home/components/Nav'
import Login from './Home/components/Login.js';

export const Routes = () => {
    console.log(Provider, ConnectedRouter)
    return (
        <Provider store={Store}>
            <ConnectedRouter history={history}>
                <div>
                    <div>
                        <Nav />
                    </div>
                    <Route path='/' exact component={Dashboard}/>
                    <Route path='/dashboard' exact component={Dashboard}/>
                    <Route path='/login' exact component={Login}/>
                </div>
            </ConnectedRouter>
        </Provider>
    )
}