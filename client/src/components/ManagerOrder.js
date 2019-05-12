import React from 'react'

import ManagerActions from '../actions/ManagerActions'
import ManagerStore from '../store/ManagerStore'

class ManagerOrder extends React.Component{
    constructor(props){
        super(props)
        this._onChange = this._onChange.bind(this)
        this.state = {
            orders : ManagerStore._orders
        }
    }

    _onChange(){
        this.setState({orders : ManagerStore._orders})
    }
    componentDidMount(){
        ManagerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        ManagerStore.removeChangeListener(this._onChange)
    }

    render() {
        return (
            <div>
                <div className="row">
                    {this.state.orders.map((order)=>{
                        return (
                            <div className="col-4 my-3">
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
                                                            {shutter.item.name}
                                                            <span className="badge badge-primary badge-pill">{shutter.quantity}</span>
                                                        </li>
                                                    );
                                                })}
                                            </li>
                                            <li className="list-group-item">Packaged: {order['packaged'] == false ? 'No' : 'Yes'}</li>
                                            <li className="list-group-item">Assigned: {order['workerId'] == false ? 'No' : 'Yes'}</li>
                                            <li className="list-group-item">Payed: {order['payed'] == false ? 'No' : 'Yes'}</li>
                                            <li className="list-group-item">Ordered: {order['date']}</li>
                                            {/*{order['Managerid'] === this.state.ManagerId ?*/}
                                            {/*    (<button className="btn btn-info" onClick={()=>{ManagerActions.listPartOfShutter(order)}}>List parts</button>)*/}
                                            {/*    :*/}
                                            {/*    (<button className="btn btn-info" onClick={()=>{ManagerActions.assignOrderToManager(order['oid'])}}>Assign</button>)*/}
                                            {/*}*/}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div id="managerOrderContainer"></div>
            </div>
        )
    }
}
export default ManagerOrder