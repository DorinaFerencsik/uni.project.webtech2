import React from 'react'

import WorkerActions from '../actions/WorkerActions'
import WorkerStore from '../store/WorkerStore'

class WorkerOptions extends React.Component{
    constructor(props){
        super(props)
        this._onChange = this._onChange.bind(this)
        // this.state = {selectedOption : null}
    }

    _onChange(){
        // this.setState({selectedOption : WorkerStore._selectedOption})
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
            <div className="row ">
                <div className="col-12">
                    <ul className="list-group list-group-horizontal">
                        <li key="orders"
                            className="list-group-item flex-fill"
                            onClick={()=>{WorkerActions.selectOption('orders')}}
                        >Orders</li>
                        <li key="installations"
                            className="list-group-item flex-fill"
                            onClick={()=>{WorkerActions.selectOption('installations')}}
                        >Installations</li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default WorkerOptions