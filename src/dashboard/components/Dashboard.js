import React, { Component } from 'react'
import Map from './Map'
import PropTypes from 'prop-types'
import LookerDto from '../../Home/dto/lookerDto'
import Store from '../../store/Store'
import LookerAction from '../../Admin/actions/LookerAction'
import { connect } from 'react-redux'
import moment from 'moment'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lookerId : null
        }
        this.onSelectLooker = this.onSelectLooker.bind(this)
    }

    onSelectLooker(id) {
        if (id) {
            Store.dispatch(LookerAction.fetchLooker(id))
        } else {
            setTimeout(() => {
                Store.dispatch(LookerAction.receiveLooker({}))
            }, 300)
        }
        this.setState({ lookerId: id })
    }

    render() {
        console.log(this.props.looker)
        const looker = this.props.looker
        const visible = this.state.lookerId ? '' : 'looker-hidden' 
        return(
            <div id='dashboard'>
                <div className='row no-margin'>
                    <div className={`looker-infos ${visible}`}>
                        <ul className='collection with-header no-margin'>
                            <li className='collection-header'><h5>{ looker.userName }</h5></li>
                            <li className='collection-item'>
                                <div>
                                    <span className='left looker-info-icon'><i className='material-icons'>perm_identity</i></span>
                                    { looker.firstName }
                                </div>
                            </li>
                            <li className='collection-item'>
                                <div>
                                    <span className='left looker-info-icon'><i className='material-icons'>perm_identity</i></span>
                                    { looker.lastName }
                                </div>
                            </li>
                            <li className='collection-item'>
                                <div>
                                    <span className='left looker-info-icon'><i className='material-icons'>date_range</i></span>
                                    { moment(parseInt(looker.birthDate)).format('DD MM YYYY') }
                                </div>
                            </li>
                            <li className='collection-item'>
                                <div>
                                    <span className='left looker-info-icon'><i className='material-icons'>email</i></span>
                                    { looker.email }
                                </div>
                            </li>
                            <li className='collection-item'>
                                <div>
                                    <span className='left looker-info-icon'><i className='material-icons'>call</i></span>
                                    { looker.phone || 'Not given' }
                                </div>
                            </li>
                            <li className='collection-item'>
                                <div>
                                    <span className='left looker-info-icon'><i className='material-icons'>wc</i></span>
                                    { looker.gender }
                                </div>
                            </li>
                            <li className='collection-item'>
                                <div>
                                    <span className='left looker-info-icon'><i className='material-icons'>fingerprint</i></span>
                                    { looker.id }
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='col s12 no-padding'>
                        <Map onSelectLooker={this.onSelectLooker}/>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    looker: PropTypes.instanceOf(LookerDto)
}

const mapStateToProps = store => {
    return {
        looker: store.LookerReducer.looker
    }
}

export default connect(mapStateToProps)(Dashboard)