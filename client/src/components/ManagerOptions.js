import React from 'react'

import ManagerActions from '../actions/ManagerActions'
import ManagerStore from '../store/ManagerStore'

class ManagerOptions extends React.Component{
    constructor(props){
        super(props)
        this._onChange = this._onChange.bind(this)
        // this.state = {selectedOption : null}
    }

    _onChange(){
        // this.setState({selectedOption : ManagerStore._selectedOption})
        // console.log('Manager: on change func')
    }
    componentDidMount(){
        ManagerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        ManagerStore.removeChangeListener(this._onChange)
    }


    render() {
        return (
            <div className="row ">
                <div className="col-12">
                    <ul className="list-group list-group-horizontal">
                        <li key="orders"
                            className="list-group-item flex-fill"
                            onClick={()=>{console.log('Manager order option click');ManagerActions.selectOption('orders')}}
                        >Orders</li>
                        <li key="statistics"
                            className="list-group-item flex-fill"
                            onClick={()=>{ManagerActions.selectOption('statistics')}}
                        >Statistics</li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default ManagerOptions