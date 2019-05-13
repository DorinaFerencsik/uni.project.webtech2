import React from 'react'

import CustomerActions from '../../actions/CustomerActions'

class CustomerOptions extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="row ">
                 <div className="col-8">
                     <ul className="list-group list-group-horizontal">
                         <li key="webshop"
                             className="list-group-item flex-fill option-selector-option"
                             onClick={()=>{CustomerActions.selectOption('webshop')}}
                         >Webshop</li>
                         <li key="orders"
                             className="list-group-item flex-fill option-selector-option"
                             onClick={()=>{CustomerActions.selectOption('orders')}}
                         >View orders</li>
                         <li key="windows"
                             className="list-group-item flex-fill option-selector-option"
                             onClick={()=>{CustomerActions.selectOption('windows')}}
                         >Windows</li>
                     </ul>
                 </div>
            </div>
        )
    }
}
export default CustomerOptions