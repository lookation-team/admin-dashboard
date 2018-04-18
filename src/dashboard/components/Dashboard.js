import React, { Component } from 'react'
import Map from './Map'

class Dashboard extends Component {
    render() {
        console.log(this.props)
        return(
            <div id='dashboard'>
                <div className='row no-margin'>
                    <div className='col s3'>            
                    </div>
                    <div className='col s9'>
                        <Map />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard