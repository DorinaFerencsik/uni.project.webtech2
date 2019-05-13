import React from 'react'

import ManagerActions from '../../actions/ManagerActions'

class ManagerOptions extends React.Component{

    render() {
        return (
            <div className="row ">
                <div className="col-12">
                    <ul className="list-group list-group-horizontal">
                        <li key="orders"
                            className="list-group-item flex-fill option-selector-option"
                            onClick={()=>{ManagerActions.selectOption('orders')}}
                        >Orders</li>
                        <li key="statistics"
                            className="list-group-item flex-fill option-selector-option"
                            onClick={()=>{ManagerActions.selectOption('statistics')}}
                        >Statistics</li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default ManagerOptions