import React, { Component } from 'react'
import { push } from 'react-router-redux'
import Store from '../../store/Store'
import HomeActions from '../actions/HomeActions'

const $ = window.$

class Login extends Component {
    onLogin() {
        Store.dispatch(HomeActions.login('julien@test.fr', 'password'))
       // Store.dispatch(push('/'))
    }

    render() {
        return(
            <div className='row'>
                <div className='col m4 offset-m4'>
                    <div className="card">
                        <div className="card-content">
                            <div className='row'>
                                <form className='col s12'>
                                    <div className='row'>
                                        <div className='input-field col s12'>
                                            <input id='email' type='email' className='validate'/>
                                            <label htmlFor='email'>Email</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='input-field col s12'>
                                            <input id='password' type='password' className='validate'/>
                                            <label htmlFor='password'>Password</label>
                                        </div>
                                    </div>
                                    <button className='btn waves-effect waves-light' type='submit' onClick={this.onLogin}>Login
                                        <i className='material-icons right'>send</i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>     
            </div>
        )
    }
}


export default Login