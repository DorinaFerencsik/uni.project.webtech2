import React from 'react'

import WorkerActions from '../actions/WorkerActions'
import WorkerStore from '../store/WorkerStore'

class WorkerInstallation extends React.Component{
    constructor(props){
        super(props)
        this._onChange = this._onChange.bind(this)
        this.state = {installations : WorkerStore._installations}
    }

    _onChange(){
        this.setState({installations : WorkerStore._installations})
        // console.log('Worker: on change func')
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
                    {this.state.installations.map((element)=>{
                        return (
                            <div className="col-6 my-3">
                                <div className="card flex-fill">
                                    <div className="card-header" id={element['_id']}>
                                        Installation ({element['_id']})
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Installation date: {element['date']}</li>
                                            {/*<li className="list-group-item">Shutters:*/}
                                            {/*    {console.log(order['shutterId'])}*/}
                                            {/*    {order['shutterId'].map((shutter)=>{*/}
                                            {/*        return (*/}
                                            {/*            <li className="list-group-item d-flex justify-content-between align-items-center">*/}
                                            {/*                {shutter.item.name}:*/}
                                            {/*                <span className="badge badge-primary badge-pill">{shutter.quantity}</span>*/}
                                            {/*            </li>*/}
                                            {/*        );*/}
                                            {/*    })}*/}
                                            {/*</li>*/}
                                            {/*<li className="list-group-item">Packaged: {order['packaged'] == false ? 'No' : 'Yes'}</li>*/}
                                            {/*<li className="list-group-item">Payed: {order['payed'] == false ? 'No' : 'Yes'}</li>*/}
                                            {/*<li className="list-group-item">Ordered: {order['date']}</li>*/}
                                            {/*<li className="list-group-item d-flex justify-content-between align-items-center">Price:*/}
                                            {/*    <span className="badge badge-info badge-pill">{order['price']} EUR</span>*/}
                                            {/*</li>*/}

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/*<div id="workerOrderContainer"></div>*/}
            </div>
        )
    }
}
export default WorkerInstallation