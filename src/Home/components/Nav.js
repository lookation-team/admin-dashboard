import React, { Component } from 'react'
import { initSidenav } from '../../utils/MaterializeUtil'
import {
    LOOKATION_TOKEN
} from '../constants/HomeConstants'
import Store from '../../store/Store'
import HomeAction from '../actions/HomeActions'
import { push } from 'react-router-redux'

class Nav extends Component {
    render() {
        const sidenav = this.isConnected() ? this.getSideNav() : null

        return(
            <div>
                <nav className='nav-bar text-style'>
                    <div className='nav-wrapper adjust-borders'>
                        {  
                            this.isConnected() && (
                                <i data-target="slide-out" className="sidenav-trigger medium material-icons">menu</i>
                            )
                        }
                        <ul id='nav-mobile' className='right hide-on-med-and-down'>
                            <li>Lookation</li>
                        </ul>
                        {sidenav}
                    </div>
                </nav>                
            </div>
        )
    }

    componentDidMount() {
        initSidenav('.sidenav')
    }

    componentDidUpdate() {
        initSidenav('.sidenav')
    }

    getSideNav() {
        return( 
            <ul id='slide-out' className='sidenav'>
                <li>
                    <div className='user-view'>
                        <div className='background'>
                            <img src='images/image-buildings.jpg'/>
                        </div>
                        <a><img className='circle' src='images/image-buildings.jpg'/></a>
                        <a><span className='white-text name'>{this.getLookerInfo}</span></a>
                        <a><span className='white-text email'>jdandturk@gmail.com</span></a>
                    </div>
                </li>
                <li><a className='sidenav-close' onClick={() => this.redirect('/dashboard')}>Dashboard</a></li>
                <li><a className='sidenav-close' onClick={() => this.redirect('/admin')}>Admin</a></li>
                <li><div className='divider sidenav-close'></div></li>
                <li><a className='waves-effect sidenav-close' onClick={this.logout}>Logout</a></li>
            </ul>
        )
    }

    getLookerInfo() {
        Store.dispatch(HomeAction.getLookerInfo())
    }

    logout() {
        Store.dispatch(HomeAction.logout())
    }

    redirect(url) {
        Store.dispatch(push(url))
    }

    isConnected() {
        const token = localStorage.getItem(LOOKATION_TOKEN)
        if (!token) {
            return false
        }
        return true
    }
}

export default Nav