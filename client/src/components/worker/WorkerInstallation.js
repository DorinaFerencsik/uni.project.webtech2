import React from 'react'

import WorkerStore from '../../store/WorkerStore'

class WorkerInstallation extends React.Component{
    constructor(props){
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {installations : WorkerStore._installations}
    }

    _onChange(){
        this.setState({installations : WorkerStore._installations})
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
                                            <li className="list-group-item">Order ID: {element['orderId']}</li>
                                            <li className="list-group-item">Date: {element['date']}</li>
                                            <li className="list-group-item">Day part: {element['dayPart']}</li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}
export default WorkerInstallation