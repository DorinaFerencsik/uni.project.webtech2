import React from 'react'

import ManagerActions from '../../actions/ManagerActions'


class ManagerInvoiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            dueDate: null
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
                          onClick={()=>{ManagerActions.hideInvoiceForm()}}
                    >X</span>
                </div>
                <h3>Invoice </h3>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text " id="">Due date</span>
                    </div>
                    <input name="address" type="date" value={this.state.dueDate} onChange={this.handleChange} className="form-control"
                           aria-describedby="basic-addon1"/>
                </div>

                <button className="btn btn-primary" onClick={()=>{
                    ManagerActions.createInvoice(this.state.dueDate)
                }}>Generate invoice</button>
            </div>
        )
    }
}

export default ManagerInvoiceForm