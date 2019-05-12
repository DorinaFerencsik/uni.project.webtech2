
import React from 'react'

import CustomerActions from '../actions/CustomerActions'
import CustomerStore from '../store/CustomerStore'

import CustomerOrderForm from './CustomerOrderForm'

class CustomerCart extends React.Component{
    constructor(props){
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            cartItems : CustomerStore._cartItems,
            totalCost: CustomerStore._cartTotalCost,
            showOrderPopup: CustomerStore._showOrderPopup
        }
    }

    _onChange(){
        this.setState({cartItems : CustomerStore._cartItems});
        this.setState({totalCost: CustomerStore._cartTotalCost});
        this.setState({showOrderPopup: CustomerStore._showOrderPopup})
    }
    componentDidMount(){
        CustomerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        CustomerStore.removeChangeListener(this._onChange)
    }

    render() {
        return (
            <div className="col-4 float-right">
                <div className="card">
                    <div className="card-header">Shopping Cart</div>
                    <div className="card-body">
                        <ul className="list-group">
                            {
                                this.state.cartItems.map(
                                    (element) => {
                                        return (
                                            <li
                                                className="list-group-item"
                                                key={element.item.sid}

                                            >
                                                {element.item.name}
                                                <span className="float-right badge-danger badge-pill"
                                                      onClick={() => {CustomerActions.removeItemFromCart(element.item)}}
                                                      onDoubleClick={() => CustomerActions.removeAllItemFromCart(element.item)}
                                                >X</span>
                                                <span className="float-right badge-info badge-pill">{element.quantity}</span>
                                            </li>
                                        )
                                    }
                                )}
                        </ul>
                    </div>
                    <div className="card-footer">
                        <span>Total Cost:</span>
                        <span className="float-right">{this.state.totalCost} EUR</span>
                    </div>
                </div>
                <button href="#" className="btn btn-success float-right"
                        onClick={() => {CustomerActions.showOrderForm()}}
                >Order</button>
                <div id="customerOrderFormContainer"></div>
            </div>
        )
    }
}
export default CustomerCart


