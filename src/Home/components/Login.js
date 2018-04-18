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
            <div className='row'>
                <div className='col m4 offset-m4'>
                    <div className="card">
                        <div className="card-content">
                            <div className='row'>
                                <form className='col s12'>
                                    <div className='row'>
                                        <div className='input-field col s12'>
                                            <input id='email' data-mode='email' ref='email' type='email' className='validate' onChange={this.handleChanges}/>
                                            <label htmlFor='email'>Email</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='input-field col s12'>
                                            <input id='password' data-mode='password' ref='password' type='password' className='validate' onChange={this.handleChanges}/>
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