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
            const exp = moment(payload.exp)
            if (!moment().isAfter(exp)) {
                return false
            }
        }
        return true
    }

    render(props) {
        if(!this.checkAuth()){
            return <Redirect to="/login"/>
        }else{
            return <this.props.component {...props}/>
        }
    }
}

export default AuthRoute