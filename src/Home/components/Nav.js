import React, { Component } from 'react'
import { initSidenav } from '../../utils/MaterializeUtil'


class Nav extends Component {
    render() {
        return(
            <div>
                <nav className='nav-bar text-style'>
                    <div className='nav-wrapper adjust-borders'>
                        <i data-target="slide-out" className="sidenav-trigger medium material-icons">menu</i>
                        <ul id='nav-mobile' className='right hide-on-med-and-down'>
                            <li>Lookation</li>
                            <li className='active'><a>Logout</a></li>
                        </ul>
                    </div>
                </nav>
                <ul id='slide-out' className='sidenav'>
                    <li>
                        <div className='user-view'>
                            <div className='background'>
                                <img src='images/image-buildings.jpg'/>
                            </div>
                            <a href='#user'><img className='circle' src='images/image-buildings.jpg'/></a>
                            <a href='#name'><span className='white-text name'>Neytau</span></a>
                            <a href='#email'><span className='white-text email'>jdandturk@gmail.com</span></a>
                        </div>
                    </li>
                    <li><a href='#!'><i className='material-icons'>cloud</i>First Link With Icon</a></li>
                    <li><a href='#!'>Second Link</a></li>
                    <li><div className='divider'></div></li>
                    <li><a className='subheader'>Subheader</a></li>
                    <li><a className='waves-effect' href='#!'>Third Link With Waves</a></li>
                </ul>
            </div>
        )
    }

    componentDidMount() {
        initSidenav('.sidenav')
    }
}

export default Nav