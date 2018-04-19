import React, { Component } from 'react'
import { initSidenav, initCollapsible } from '../../utils/MaterializeUtil'
import {
    LOOKATION_TOKEN
} from '../constants/HomeConstants'
import Store from '../../store/Store'
import HomeAction from '../actions/HomeActions'
import { push } from 'react-router-redux'
import lookerDto from '../dto/lookerDto'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isAuthenticated } from '../../utils/ActionUtils'

class Nav extends Component {
    render() {
        const sidenav = isAuthenticated() ? this.getSideNav() : null

        return(
            <div id="main-nav">
                <nav className='nav-bar text-style '>
                    <div className='nav-wrapper adjust-borders'>
                        {  
                            isAuthenticated() && (
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
        initCollapsible('.collapsible')
    }

    componentWillMount() {
        Store.dispatch(HomeAction.getLookerInfos())
    }

    componentDidUpdate() {
        initSidenav('.sidenav')
        initCollapsible('.collapsible')
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
                <li><a className='sidenav-close pointer' onClick={() => this.redirect('/dashboard')}>Dashboard</a></li>                
                <li className='no-padding'>
                    <ul className='collapsible collapsible-accordion pointer'>
                        <li>
                            <a className='collapsible-header'><i className="material-icons no-margin">arrow_drop_down</i>Admin</a>
                            <div className='collapsible-body'>
                                <ul>
                                    <li><a className='sidenav-close pointer' onClick={() => this.redirect('/looker')}>Lookers</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>
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