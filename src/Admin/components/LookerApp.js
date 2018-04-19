import React, { Component } from 'react'
import { initDatepicker, initSelect } from '../../utils/MaterializeUtil'
import Store from '../../store/Store'
import LookerAction from '../actions/LookerAction'
import PropTypes from 'prop-types'
import LookerDto from '../../Home/dto/lookerDto'
import { connect } from 'react-redux'
import moment from 'moment'

class LookerApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            looker: new LookerDto()
        }

    }

    componentWillMount() {
        console.log(this.props)
        Store.dispatch(LookerAction.fetchLooker(this.props.match.params.id))
    }

    componentDidMount() {
        initDatepicker('.datepicker')
        initSelect('select')
    }

    componentDidUpdate() {
        initDatepicker('.datepicker')
        initSelect('select')
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.looker.id) {
            console.log(nextProps.looker, this.state.looker)
            this.setState(() => {
                console.log(nextProps.looker)
                const looker = Object.assign({}, nextProps.looker)
                looker.birthDate = moment(looker.birthDate).format( 'MMM DD, YYYY')
                return { looker: looker }
            })
        }
    }

    onChangeLooker = (attr, event) => {
        const looker = Object.assign({}, this.state.looker)
        if (event.target) {
            looker[attr] = event.target.value
        }
        else {
            looker[attr] = event
        }
        this.setState({ looker: looker })
    }

    handleSubmit(event) {
        event.preventDefault()
        const looker = this.state.looker
        Store.dispatch(LookerAction.updateLooker(this.state.looker))
    }
        
    render() {
        const looker = this.state.looker
        return (
            <div>
                <div className='row no-margin'>
                    <div id='file' className='col s12'>
                        <div className='card col s8 offset-s2'>
                            <div className='card-content'>
                                <div className='row no-margin'>
                                    <div className='row'>
                                        <div className='input-field col s6'>
                                            <input value={looker.firstName} onChange={(e) => this.onChangeLooker('firstName', e)} id='first_name' type='text' className='validate'/>
                                            <label className='active' htmlFor='first_name'>First Name</label>
                                        </div>
                                        <div className='input-field col s6'>
                                            <input value={looker.lastName}  onChange={(e) => this.onChangeLooker('lastName', e)} id='last_name' type='text' className='validate'/>
                                            <label className='active' htmlFor='last_name'>Last Name</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='input-field col s6'>
                                            <input value={looker.userName} onChange={(e) => this.onChangeLooker('userName', e)} id='looker_name' type='text' className='validate'/>
                                            <label className='active' htmlFor='looker_name'>Looker Name</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='input-field col s6'>
                                            <input value={looker.email} onChange={(e) => this.onChangeLooker('email', e)} id='email' type='email' className='validate'/>
                                            <label className='active' htmlFor='email'>Email</label>
                                        </div>
                                        <div className='input-field col s6'>
                                            <input value={looker.phoneNumber} onChange={(e) => this.onChangeLooker('phoneNumber', e)} id='phone' type='tel' className='validate'/>
                                            <label className='active' htmlFor='phone'>Phone</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='input-field col s6'>
                                            <select value={ looker.gender } onChange={(e) => this.onChangeLooker('gender', e)}>
                                                <option value='' disabled>Choose your gender</option>
                                                <option value='man'>Man</option>
                                                <option value='woman'>Woman</option>
                                                <option value='other'>Other</option>
                                            </select>
                                            <label>Gender</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='input-field col s6'>
                                            <input value={looker.birthDate} onChange={(e) => this.onChangeLooker('birthDate', e)} type='text' className='datepicker'/>
                                            <label className='active' htmlFor='datepicker'>Birthdate</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='input-field col s2 offset-s10'>
                                            <button className='btn waves-effect waves-light' onClick={this.handleSubmit.bind(this)} type='submit' name='action' >Submit
                                                <i className='material-icons right'>send</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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