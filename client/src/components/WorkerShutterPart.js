import React from 'react'

import WorkerActions from '../actions/WorkerActions'
import WorkerStore from '../store/WorkerStore'

class WorkerShutterPart extends React.Component{
    constructor(props){
        super(props)
        this._onChange = this._onChange.bind(this);
        this.state = {
            selectedOrder: WorkerStore._selectedOrder
        }
    }

    _onChange(){
        this.setState({selectedOrder : WorkerStore._selectedOrder})
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
                <div className="d-flex justify-content-between align-items-center float-right">
                    <span className="badge badge-danger badge-pill"
                          onClick={()=>{WorkerActions.closePartOfShutter()}}
                    >X</span>
                </div>
            <div className="row">

                {this.state.selectedOrder.shutterId.map((shutter)=>{
                    return (
                        <div className="col-4 my-3">
                            <div className="card flex-fill" >
                                <div className="card-header d-flex justify-content-between align-items-center" id={shutter.item['sid']}>
                                    {shutter.item['name']}
                                    <span className="badge badge-info badge-pill">{shutter.item['sid']}</span>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {shutter.item.parts.map((part) =>{
                                            return (
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    {part}
                                                    <span className="badge badge-primary badge-pill">{shutter.quantity}</span>
                                                </li>
                                            )
                                        })}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
                <button className="btn btn-info" onClick={()=>{WorkerActions.markOrderAsPackaged()}}>Mark as packaged</button>
            </div>
        )
    }
}
export default WorkerShutterPart