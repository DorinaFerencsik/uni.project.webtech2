import React from 'react'

import CustomerActions from '../../actions/CustomerActions'
import CustomerStore from '../../store/CustomerStore'

class CustomerWindow extends React.Component{
    constructor(props){
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {windows : CustomerStore._windows}
    }

    _onChange(){
        this.setState({windows : CustomerStore._windows})
    }
    componentDidMount(){
        CustomerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        CustomerStore.removeChangeListener(this._onChange)
    }

    render() {
        return (
            <div>
                <div className="row">
                    {this.state.windows.map((item) => {
                        return (
                            <div className="col-6 my-3">
                                <div className="card flex-fill">
                                    <div className="card-header" id={item['name']}>
                                        {item['name']}
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-subtitle mb-2 text-muted">Type: {item['type']}</h6>
                                        <h6 className="card-subtitle mb-2 text-muted">Width: {item['width']} cm</h6>
                                        <h6 className="card-subtitle mb-2 text-muted">Height: {item['height']} cm</h6>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button className="btn btn-info" onClick={()=>{CustomerActions.showWindowForm()}}>Add window</button>
                <div className="my-5" id="customerWindowContainer"></div>
            </div>

        )
    }
}
export default CustomerWindow