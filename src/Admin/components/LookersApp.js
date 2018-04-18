import React, { Component } from 'react'
import LookerListDto from '../dto/LookerListDto'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Store from '../../store/Store'
import LookerAction from '../actions/LookerAction';
import { concat } from 'lodash'

class LookersApp extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataLookers: []
        }
}

    componentWillMount() {
        Store.dispatch(LookerAction.fetchLookers())
    }
    
    render() {
        const lookerList = this.props.lookers.map(o => {
            return (
                <tr>
                    <td>{o.userName}</td>
                    <td>{o.email}</td>
                    <td><i class="small material-icons">mod_edit</i><i class="small material-icons">delete</i></td>
                </tr>
            )
        })
        console.log(lookerList)
        return(
            <div>
                <a class="waves-effect waves-light btn">Create</a>
                <table className="highlight">
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
}

LookersApp.propTypes = {
    lookers: PropTypes.arrayOf(PropTypes.instanceOf(LookerListDto))
}

const mapStateToProps = (store) => {
    return {
        lookers: store.LookerReducer.lookers
    }
}

export default connect(mapStateToProps)(LookersApp)