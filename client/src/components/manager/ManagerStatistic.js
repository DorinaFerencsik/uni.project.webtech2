import React from 'react'

import ManagerStore from '../../store/ManagerStore'

class ManagerStatistic extends React.Component{
    constructor(props){
        super(props)
        this._onChange = this._onChange.bind(this)
        this.state = {
            statistics : ManagerStore._statistics
        }
    }

    _onChange(){
        this.setState({statistics : ManagerStore._statistics})
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
                <div className="row">
                    <div className="col-4 my-3">
                        <div className="card flex-fill">
                            <div className="card-header">
                                Weekly report
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Sells
                                        <span className="badge badge-success badge-pill">{this.state.statistics.weeklySell}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Income
                                        <span className="badge badge-success badge-pill">{this.state.statistics.weeklyIncome} EUR</span>
                                    </li>
                                    <li className="list-group-item">Shutters:
                                        {Object.keys(this.state.statistics['weeklyShutters']).map((key)=>{
                                            return (
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    {key}
                                                    <span className="badge badge-success badge-pill">{this.state.statistics['weeklyShutters'][key]}</span>
                                                </li>
                                            );
                                        })}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-3">
                        <div className="card flex-fill">
                            <div className="card-header">
                                Monthly report
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Sells:
                                        <span className="badge badge-success badge-pill">{this.state.statistics.monthlySell}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Income:
                                        <span className="badge badge-success badge-pill">{this.state.statistics.monthlyIncome} EUR</span>
                                    </li>
                                    <li className="list-group-item">Shutters:
                                        {Object.keys(this.state.statistics['monthlyShutters']).map((key)=>{
                                            return (
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    {key}
                                                    <span className="badge badge-success badge-pill">{this.state.statistics['monthlyShutters'][key]}</span>
                                                </li>
                                            );
                                        })}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ManagerStatistic