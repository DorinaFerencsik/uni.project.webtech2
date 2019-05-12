import React from 'react'

import CustomerActions from '../actions/CustomerActions'
import CustomerStore from '../store/CustomerStore'

class WindowForm extends React.Component{
    constructor(props){
        super(props)
        this._onChange = this._onChange.bind(this)
        this.state = {
            name: null,
            type: null,
            width: null,
            height: null
        }
    }

    _onChange(event){
        console.log('event handler')
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log('target: ',target)
        console.log('value: ',value)
        console.log('name: ',name)

        this.setState({
            [name]: value
        });
        console.log(this.state);
    }


    render() {
        return (
            <div className="container">
                <h3>Define a new window </h3>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">Name</span>
                    </div>
                    <input name="name" type="text" value={this.state.name} onChange={this._onChange} className="form-control"
                           aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">Type</span>
                    </div>
                    <input name="type" type="text" value={this.state.type} onChange={this._onChange} className="form-control"
                           aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">Width</span>
                    </div>
                    <input name="width" type="number" value={this.state.width} onChange={this._onChange} className="form-control" aria-label="Window width"/>
                        <div className="input-group-append">
                            <span className="input-group-text">cm</span>
                        </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">Height</span>
                    </div>
                    <input name="height" type="number" value={this.state.height} onChange={this._onChange} className="form-control" aria-label="Window height"/>
                    <div className="input-group-append">
                        <span className="input-group-text">cm</span>
                    </div>
                </div>

                <button className="btn btn-primary" onClick={()=>{
                    CustomerActions.createNewWindow({
                        name: this.state.name,
                        type: this.state.type,
                        width: this.state.width,
                        height: this.state.height,
                    })
                }}>Create window</button>
            </div>
        )
    }
}
export default WindowForm