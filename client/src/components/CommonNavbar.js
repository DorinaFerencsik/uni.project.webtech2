import React from 'react'
import HomeActions from '../actions/HomeActions'
import HomeStore from '../store/HomeStore'

class CommonNavbar extends React.Component{
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {selectedRole: HomeStore._selectedRole}
    }

    _onChange(){
        this.setState({selectedRole : HomeStore._selectedRole})
    }

    componentDidMount(){
        HomeStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        HomeStore.removeChangeListener(this._onChange)
    }

    render() {
        return (
            <div className="sticky-top w-100 bg-dark text-white p-2 ">
                <div className="default-navbar">
                    <div className="col-12">
                        <div className="p-2 float-left">
                            Selected role: {this.state.selectedRole}
                        </div>
                        <button className="float-right btn btn-dark"
                                onClick={()=>{HomeActions.logout()}}
                        > Change role</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default CommonNavbar