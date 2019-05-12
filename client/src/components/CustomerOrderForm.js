import React from 'react'

import CustomerActions from '../actions/CustomerActions'
import CustomerStore from '../store/CustomerStore'


class CustomerOrderForm extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            weekDays: CustomerStore._weekDays,
            dayParts: CustomerStore._dayParts,
            windows: CustomerStore._windows,
            selectedWindow: null,
            address: '',
            selectedDay: null,
            selectedDayPart: null
        }
    }

    _onChange(){
        this.setState({windows : CustomerStore._windows});
    }
    componentDidMount(){
        CustomerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        CustomerStore.removeChangeListener(this._onChange)
    }

    handleChange(event) {
        console.log('event handler')
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
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
            <div display>
                <h3>Order details </h3>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">Window</span>
                    </div>
                    <select className="form-control" name="selectedWindow" value={this.state.selectedWindow} onChange={this.handleChange}>
                        <option value='def'>Please select</option>
                        {this.state.windows.map((item) => {
                            return (<option value={item.name}>{item.name}</option>)
                        })}
                    </select>
                </div>
                <h5>Shipment: </h5>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">Address</span>
                    </div>
                    <input name="address" type="text" value={this.state.address} onChange={this.handleChange} className="form-control"
                           aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-3">
                    <div className="col-12"><p>Preferred day</p></div>
                    <select className="form-control" name="selectedDay" value={this.state.selectedDay} onChange={this.handleChange}>
                        <option value='def'>Please select</option>
                        {Object.keys(this.state.weekDays).map((key)=>{
                            return (<option value={key}>{this.state.weekDays[key]}</option>)
                        })}
                    </select>

                </div>
                <div className="input-group mb-3">
                    <div className="col-12"><p>Preferred day part</p></div>
                    <select className="form-control" name="selectedDayPart" value={this.state.selectedDayPart} onChange={this.handleChange}>
                        <option value='def'>Please select</option>
                        {Object.keys(this.state.dayParts).map((key)=>{
                            return (<option value={key}>{this.state.dayParts[key]}</option>)
                        })}
                    </select>
                </div>

                <button className="btn btn-primary" onClick={()=>{
                    CustomerActions.placeOrder({
                        windowName: this.state.selectedWindow,
                        address: this.state.address,
                        day: this.state.selectedDay,
                        dayPart: this.state.selectedDayPart
                    })

                    // windowName: data.payload.payload.windowName,
                    //     shipment: {
                    //     address: data.payload.payload.address,
                    //         preferredDay: data.payload.payload.day,
                    //         preferredDaypart: data.payload.payload.dayPart
                }}>Place order</button>
           </div>
        )
    }
}

export default CustomerOrderForm