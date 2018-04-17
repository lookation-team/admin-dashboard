import React, { Component } from 'react'
import { initSidenav } from '../../utils/MaterializeUtil'
import {
    LOOKATION_TOKEN
} from '../constants/HomeConstants'
import Store from '../../store/Store'
import HomeAction from '../actions/HomeActions'
import { push } from 'react-router-redux'
import lookerDto from '../dto/lookerDto'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Nav extends Component {
    render() {
        const sidenav = this.isConnected() ? this.getSideNav() : null

        return(
            <div id="main-nav">
                <nav className='nav-bar text-style '>
                    <div className='nav-wrapper adjust-borders'>
                        {  
                            this.isConnected() && (
                                <i data-target="slide-out" className="sidenav-trigger medium material-icons">menu</i>
                            )
                        }
                        <ul id='nav-mobile' className='right hide-on-med-and-down'>
                            <li>Lookation</li>
                        </ul>
                    </div>
                </nav>   
                {sidenav}             
            </div>
        )
    }

    componentDidMount() {
        initSidenav('.sidenav')
    }

    componentWillMount() {
        Store.dispatch(HomeAction.getLookerInfos())
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
                            <img src='images/lookation-logo.png'/>
                        </div>
                        <div className='col s12 center-align'>
                            <a><i className='material-icons large accent-color'>perm_identity</i></a>
                        </div>
                        <a><span className='white-text name'>{this.props.looker.userName}</span></a>
                        <a><span className='white-text email'>{this.props.looker.email}</span></a>
                    </div>
                </li>
                <li><a className='sidenav-close' onClick={() => this.redirect('/dashboard')}>Dashboard</a></li>
                <li><a className='sidenav-close' onClick={() => this.redirect('/admin')}>Admin</a></li>
                <li><div className='divider sidenav-close'></div></li>
                <li><a className='waves-effect sidenav-close' onClick={this.logout}>Logout</a></li>
            </ul>
        )
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

Nav.propTypes = {
    looker: PropTypes.instanceOf(lookerDto)
}
  
const mapStateToProps = (store) => {
    return {
        looker: store.HomeReducer.looker
    }
}

export default connect(mapStateToProps)(Nav)