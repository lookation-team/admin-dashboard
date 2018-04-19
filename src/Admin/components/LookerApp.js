import React, { Component } from 'react'
import { initDatepicker, initSelect } from '../../utils/MaterializeUtil'
import Store from '../../store/Store'
import LookerAction from '../actions/LookerAction'
import PropTypes from 'prop-types'
import LookerDto from '../../Home/dto/lookerDto'
import { connect } from 'react-redux'

class LookerApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }

    componentWillMount() {
        console.log(this.props)
        Store.dispatch(LookerAction.fetchLooker(this.props.match.params.id))
    }


    

    render() {
        console.log(this.props.match)
        const looker = this.props.looker
        return (
            <div>
                <div className='row no-margin'>
                    <div id='file' className='col s12'>
                        <div className='card col s8 offset-s2'>
                            <div className='card-content'>
                                <div className='row no-margin'>
                                    <div className='row'>
                                        <div className='input-field col s6'>
                                            <input value={looker.firstName} id='first_name' type='text' className='validate'/>
                                            <label className='active' htmlFor='first_name'>First Name</label>
                                        </div>
                                        <div className='input-field col s6'>
                                            <input value={looker.lastName} id='last_name' type='text' className='validate'/>
                                            <label className='active' htmlFor='last_name'>Last Name</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='input-field col s6'>
                                            <input value={looker.userName} id='looker_name' type='text' className='validate'/>
                                            <label className='active' htmlFor='looker_name'>Looker Name</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='input-field col s6'>
                                            <input value={looker.email} id='email' type='email' className='validate'/>
                                            <label className='active' htmlFor='email'>Email</label>
                                        </div>
                                        <div className='input-field col s6'>
                                            <input value={looker.phoneNumber} id='phone' type='tel' className='validate'/>
                                            <label className='active' htmlFor='phone'>Phone</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='input-field col s6'>
                                            <select>
                                                <option value='' disabled selected>Choose your gender</option>
                                                <option value='1'>Man</option>
                                                <option value='2'>Woman</option>
                                            </select>
                                            <label>Gender</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='input-field col s6'>
                                            <input value={looker.birthDate} type='text' className='datepicker'/>
                                            <label className='active' htmlFor='datepicker'>Birthdate</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='input-field col s2 offset-s10'>
                                            <button className='btn waves-effect waves-light' type='submit' name='action' onClick={this.onSubmit}>Submit
                                                <i className='material-icons right'>send</i>
                                            </button>
                                        </div>
                                    </div>
        






                                    <input title={ 'FirstName' } value={ 'Julien' } onChange={ () => { } } />
                                    <select className='offset-s3' elements={ 'caca' } title={ 'prout' }
                                        onChange={ () => { } } selected={ 'prout' } />
                                </div>
                                <div className='row no-margin padding-top-3-px'>
                                    <input title={ 'prout' } value={ 'caca' } onChange={ () => { } } />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        initDatepicker('.datepicker')
        initSelect('select')
    }

    componentDidUpdate() {
        initDatepicker('.datepicker')
        initSelect('select')
    }
}

LookerApp.propTypes = {
    looker: PropTypes.instanceOf(LookerDto),
    params: PropTypes.shape({
        id: PropTypes.string
    })
}

const mapStateToProps = store => {
    return {
        looker: store.LookerReducer.looker
    }
}

export default connect(mapStateToProps)(LookerApp)