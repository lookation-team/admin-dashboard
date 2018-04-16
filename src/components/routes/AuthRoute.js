import { 
    Redirect,
    Route 
} from 'react-router'
import { getPayload } from '../../utils/ActionUtils'
import moment from 'moment'
import React from 'react';

class AuthRoute extends Route{
    checkAuth() {
        const payload = getPayload()
        if (!payload) {
            return false
        } else {
            const exp = moment(JSON.parse(payload).exp)
            if (!moment().isAfter(exp)) {
                return false
            }
        }
        return true
    }

    render() {
        console.log(this.checkAuth())
        if(!this.checkAuth()){
            return <Redirect to="/login"/>
        }else{
            return <this.props.component />
        }
    }
}

export default AuthRoute