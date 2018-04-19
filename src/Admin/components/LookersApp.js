import React, { Component } from 'react'
import LookerListDto from '../dto/LookerListDto'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Store from '../../store/Store'
import LookerAction from '../actions/LookerAction'
import { push } from 'react-router-redux'

class LookersApp extends Component {
    componentWillMount() {
        Store.dispatch(LookerAction.fetchLookers())
    }
    
    render() {
        const lookerList = this.props.lookers.map(o => {
            return (
                <tr className='pointer' key={o.id} onClick={() => this.redirect('/looker/account/' + o.id)}>
                    <td>{o.userName}</td>
                    <td>{o.email}</td>
                    <td>
                        <i className="small material-icons delete-button">delete</i>
                    </td>
                </tr>
            )
        })
        console.log(lookerList)
        return(
            <div>
                <div className='row no-margin'>
                    <div id='file' className='col s12'>
                        <div className='card col s8 offset-s2'>
                            <div className='card-content'>
                                <div className='row no-margin'>
                                    <div className='row'>
                                        <table className='highlight'>
                                            <thead>
                                                <tr>
                                                    <th>Lookers</th>
                                                    <th>Email</th>
                                                    <th/>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { lookerList }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    redirect(url) {
        Store.dispatch(push(url))
    }
}

LookersApp.propTypes = {
    lookers: PropTypes.arrayOf(PropTypes.instanceOf(LookerListDto)),
}

const mapStateToProps = (store) => {
    return {
        lookers: store.LookerReducer.lookers
    }
}

export default connect(mapStateToProps)(LookersApp)