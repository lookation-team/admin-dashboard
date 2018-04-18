import React, { Component } from 'react'
import { push } from 'react-router-redux'
import Store from '../../store/Store'
import HomeActions from '../actions/HomeActions'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.onLogin = this.onLogin.bind(this)
    }

    onLogin() {
        Store.dispatch(HomeActions.login(this.state.email, this.state.password))
    }

    handleChanges = (event) => {
        const element = event.target.dataset.mode
        const value = event.target.value
        this.setState(prevState => {
            prevState[element] = value
            return prevState
        })
    }

    render() {
        return(
            <div className='login-page row'>
                <div/>
                <div>
                    <div className='col s6'>
                        <div className='row'>
                            <div className='input-field col s6 offset-s3 center'>
                                <img className='responsive-img' src='images/lookation-logo.png'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ marginBottom: '100px'}}/>
                    <div className='col s4'>
                        <div className='row s12'>
                                <form className='col s12'>
                                    <div className='row no-margin-h'>
                                        <div className='input-field col s12'>
                                            <input id='email' data-mode='email' ref='email' type='email' className='validate' onChange={this.handleChanges}/>
                                            <label htmlFor='email' className='valign-wrapper'>
                                                <i className='material-icons'>person</i>
                                                Email
                                            </label>
                                        </div>
                                    </div>
                                    <div className='row no-margin-h'>
                                        <div className='input-field col s12'>
                                            <input id='password' data-mode='password' ref='password' type='password' className='validate' onChange={this.handleChanges}/>
                                            <label htmlFor='password' className='valign-wrapper'>
                                                <i className='material-icons'>lock_outline</i>
                                                Password
                                            </label>
                                        </div>
                                    </div>
                                    <div className='row no-margin-h'>
                                        <div className='col s12 center-align'>
                                            <button type='submit' className='btn waves-effect waves-light' onClick={this.onLogin}>
                                                <i className='material-icons right'>send</i>
                                                Sign-In
                                            </button>
                                        </div>
                                    </div>
                                </form>
                        </div>
                    </div>  
                </div>     
            </div>
        )
    }
}


export default Login