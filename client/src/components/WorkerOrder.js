import React from 'react'

import WorkerActions from '../actions/WorkerActions'
import WorkerStore from '../store/WorkerStore'

class WorkerOrder extends React.Component{
    constructor(props){
        super(props)
        this._onChange = this._onChange.bind(this)
        this.state = {
            orders : WorkerStore._orders,
            workerId: WorkerStore._workerId
        }
    }

    _onChange(){
        this.setState({orders : WorkerStore._orders})
    }
    componentDidMount(){
        WorkerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        WorkerStore.removeChangeListener(this._onChange)
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
                                            <li className="list-group-item">Assigned: {order['workerid'] == false ? 'No' : 'To you'}</li>
                                            <li className="list-group-item">Payed: {order['payed'] == false ? 'No' : 'Yes'}</li>
                                            <li className="list-group-item">Ordered: {order['date']}</li>
                                            {order['workerid'] === this.state.workerId ?
                                                (<button className="btn btn-info" onClick={()=>{WorkerActions.listPartOfShutter(order)}}>List parts</button>)
                                                :
                                                (<button className="btn btn-info" onClick={()=>{WorkerActions.assignOrderToWorker(order['oid'])}}>Assign</button>)
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div id="workerOrderContainer"></div>
            </div>
        )
    }
}
export default WorkerOrder