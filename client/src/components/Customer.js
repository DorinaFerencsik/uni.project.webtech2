import React from 'react'

import CustomerActions from '../actions/CustomerActions'
import CustomerStore from '../store/CustomerStore'

import CustomerOptions from './CustomerOptions'
import CustomerCart from './CustomerCart'

class Customer extends React.Component{
    constructor(props){
        super(props)
        this._onChange = this._onChange.bind(this)
        this.state = {selectedOption : null}
    }

    _onChange(){
        this.setState({selectedOption : CustomerStore._selectedOption})
        console.log('CUSTOMER: on change func')
    }
    componentDidMount(){
        CustomerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        CustomerStore.removeChangeListener(this._onChange)
    }

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