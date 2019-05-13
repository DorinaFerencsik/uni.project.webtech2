import React from 'react'

import CustomerAction from '../../actions/CustomerActions'
import CustomerStore from '../../store/CustomerStore'

class CustomerInvoice extends React.Component{
    constructor(props){
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            selectedOrder: CustomerStore._selectedOrder
        }
    }

    _onChange(){
        this.setState({selectedOrder : CustomerStore._selectedOrder})
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
                <div className="d-flex justify-content-between align-items-center float-right">
                    <span className="badge badge-danger badge-pill close-button"
                          onClick={()=>{CustomerAction.hideInvoiceOfOrder()}}
                    >X</span>
                </div>
                <div className="row">

                    <div className="col-8 my-3">
                        <div className="card flex-fill" >
                            <div className="card-header d-flex justify-content-between align-items-center">
                                Invoice
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Created: {this.state.selectedOrder.invoice['createdDate']}
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                Due: {this.state.selectedOrder.invoice['dueDate']}
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        VAT:
                                        <span className="badge badge-primary badge-pill">{this.state.selectedOrder.invoice['vat']} EUR</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">Shipping:
                                        <span className="badge badge-primary badge-pill">{this.state.selectedOrder.invoice['shippingPrice']} EUR</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Full price:
                                        <span className="badge badge-primary badge-pill">{this.state.selectedOrder.invoice['fullPrice']} EUR</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CustomerInvoice