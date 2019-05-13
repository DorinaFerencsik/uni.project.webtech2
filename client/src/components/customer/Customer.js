import React from 'react'

import CustomerOptions from './CustomerOptions'
import CustomerCart from './CustomerCart'

class Customer extends React.Component{
    render() {
        return (
            <div>
                <CustomerOptions/>
                <CustomerCart/>
                <div className="row col-8" id="customerOptionContent">
                    <div>
                    <p className="h4 text-muted my-5 font-italic font-weight-light"> Select an option</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Customer