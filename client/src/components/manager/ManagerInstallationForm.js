import React from 'react'

import ManagerActions from '../../actions/ManagerActions'


class ManagerInstallationForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            date: null,
            dayPart: null
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div >
                <div className="d-flex justify-content-between align-items-center float-right">
                    <span className="badge badge-danger badge-pill close-button"
                          onClick={()=>{ManagerActions.hideInstallationForm()}}
                    >X</span>
                </div>
                <h3>Installation </h3>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text " id="">Date</span>
                    </div>
                    <input name="date" type="date" value={this.state.date} onChange={this.handleChange} className="form-control"
                           aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-3">
                    <div className="col-12"><p>Preferred day</p></div>
                    <select className="form-control" name="dayPart" value={this.state.dayPart} onChange={this.handleChange}>
                        <option value='def'>Please select</option>
                        <option value='AM'>AM</option>
                        <option value='PM'>PM</option>
                    </select>

                </div>
                <button className="btn btn-primary" onClick={()=>{
                    ManagerActions.createInstallation(this.state)
                }}>Generate invoice</button>
            </div>
        )
    }
}

export default ManagerInstallationForm