import React, { Component } from 'react'
import LookerListDto from '../dto/LookerListDto'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Store from '../../store/Store'
import LookerAction from '../actions/LookerAction';

class LookersApp extends Component {
    componentWillMount() {
        Store.dispatch(LookerAction.fetchLookers())
    }
    
    render() {
        return(
            <div>tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt</div>
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