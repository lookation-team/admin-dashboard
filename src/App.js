import React, { Component } from 'react'
import Store from './store/Store'
import DashboardActions from './dashboard/actions/DashboardActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DtoPosition from './dashboard/dto/DtoPosition'

class App extends Component {
  componentWillMount() {
    Store.dispatch(DashboardActions.setInitialPositions())
  }
  
  render() {
    console.log(this.props.positions)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

App.propTypes = {
  positions: PropTypes.arrayOf(PropTypes.instanceOf(DtoPosition)),
}

const mapStateToProps = (store) => {
  return {
    positions: store.DashboardReducer.positions
  }
}

export default connect(mapStateToProps)(App)
