import React from 'react'

import WorkerAction from '../actions/WorkerActions'
import WorkerStore from '../store/WorkerStore'

import WorkerOptions from './WorkerOptions'

class Worker extends React.Component{
    constructor(props){
        super(props)
        this._onChange = this._onChange.bind(this)
        this.state = {selectedOption : null}
    }

    _onChange(){
        this.setState({selectedOption : WorkerStore._selectedOption})
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
                <WorkerOptions/>
                {/*<WorkerCart/>*/}
                <div className="col-12" id="workerOptionContent">
                    <div>
                        <p className="h4 text-muted my-5 font-italic font-weight-light"> Select an option</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Worker