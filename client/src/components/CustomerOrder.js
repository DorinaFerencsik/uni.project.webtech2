import React from 'react'

import CustomerActions from '../actions/CustomerActions'
import CustomerStore from '../store/CustomerStore'

class CustomerOrder extends React.Component{
    constructor(props){
        super(props)
        this._onChange = this._onChange.bind(this)
        this.state = {orders : CustomerStore._orders}
    }

    _onChange(){
        this.setState({windows : CustomerStore._windows})
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
            <div>
                <div className="row">
                    {this.state.orders.map((order)=>{
                        return (
                            <div className="col-6 my-3">
                            <div className="card flex-fill">
                                <div className="card-header" id={order['oid']+'heading'}>
                                            Order ({order['oid']})
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Window name: {order['windowName']}</li>
                                        <li className="list-group-item">Shutters:
                                            {console.log(order['shutterId'])}
                                            {order['shutterId'].map((shutter)=>{
                                                return (
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    {shutter.item.name}:
                                                    <span className="badge badge-primary badge-pill">{shutter.quantity}</span>
                                                </li>
                                                );
                                            })}
                                        </li>
                                        <li className="list-group-item">Packaged: {order['packaged'] == false ? 'No' : 'Yes'}</li>
                                        <li className="list-group-item">Payed: {order['payed'] == false ? 'No' : 'Yes'}</li>
                                        <li className="list-group-item">Ordered: {order['date']}</li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">Price:
                                            <span className="badge badge-info badge-pill">{order['price']} EUR</span>
                                        </li>

                                        </ul>
                                    </div>
                            </div>
                            </div>
                        );
                    })}
                </div>
                <div id="customerOrderContainer"></div>
            </div>
        )
    }
}
export default CustomerOrder