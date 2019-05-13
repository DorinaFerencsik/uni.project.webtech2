import React from 'react'

import WorkerActions from '../../actions/WorkerActions'

class WorkerOptions extends React.Component{
    render() {
        return (
            <div className="row ">
                <div className="col-12">
                    <ul className="list-group list-group-horizontal">
                        <li key="orders"
                            className="list-group-item flex-fill option-selector-option"
                            onClick={()=>{WorkerActions.selectOption('orders')}}
                        >Orders</li>
                        <li key="installations"
                            className="list-group-item flex-fill option-selector-option"
                            onClick={()=>{WorkerActions.selectOption('installations')}}
                        >Installations</li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default WorkerOptions