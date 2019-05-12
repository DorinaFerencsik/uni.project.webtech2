import React from 'react'

import CustomerActions from '../actions/CustomerActions'
import CustomerStore from '../store/CustomerStore'

class CustomerOptions extends React.Component{
    constructor(props){
        super(props)
        this._onChange = this._onChange.bind(this)
        // this.state = {selectedOption : null}
    }

    _onChange(){
        // this.setState({selectedOption : CustomerStore._selectedOption})
        // console.log('CUSTOMER: on change func')
    }
    componentDidMount(){
        CustomerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        CustomerStore.removeChangeListener(this._onChange)
    }


    render() {
        return (
            <div className="row ">
                 <div className="col-8">
                     <ul className="list-group list-group-horizontal">
                         <li key="webshop"
                             className="list-group-item flex-fill"
                             onClick={()=>{CustomerActions.selectOption('webshop')}}
                         >Webshop</li>
                         <li key="orders"
                             className="list-group-item flex-fill"
                             onClick={()=>{CustomerActions.selectOption('orders')}}
                         >View orders</li>
                         <li key="windows"
                             className="list-group-item flex-fill"
                             onClick={()=>{CustomerActions.selectOption('windows')}}
                         >Windows</li>
                     </ul>
                 </div>
            </div>
        )
    }
}
export default CustomerOptions