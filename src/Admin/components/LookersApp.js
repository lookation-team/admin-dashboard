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
                <tr key={o.id} onClick={() => this.redirect('/looker/account/' + o.id)}>
                    <td>{o.userName}</td>
                    <td>{o.email}</td>
                    <td>
                        <i className="small material-icons">delete</i>
                    </td>
                </tr>
            )
        })
        console.log(lookerList)
        return(
            <div>
                <a className='waves-effect waves-light btn' onClick={() => this.redirect('/looker/account')}>Create</a>
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