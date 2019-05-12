import React from 'react'

import ManagerAction from '../actions/ManagerActions'
import ManagerStore from '../store/ManagerStore'

import ManagerOptions from './ManagerOptions'

class Manager extends React.Component{
    constructor(props){
        super(props)
        this._onChange = this._onChange.bind(this)
        this.state = {selectedOption : null}
    }

    _onChange(){
        this.setState({selectedOption : ManagerStore._selectedOption})
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
                <ManagerOptions/>
                <div className="col-12" id="managerOptionContent">
                    <div>
                        <p className="h4 text-muted my-5 font-italic font-weight-light"> Select an option</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Manager