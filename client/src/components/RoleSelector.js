import React from 'react'
import HomeActions from '../actions/HomeActions'

class RoleSelector extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            roleName: props['roleName'],
            roleInfo: props['roleInfo'],
            roleImg: props['roleImg']
        }
    }

    render(){
        return (
                <div className="col-4 ">
                    <div className="card role-card">
                        <img src={process.env.PUBLIC_URL + '/img/'+this.state.roleImg+'.png'} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{this.state.roleName}</h5>
                            <p className="card-text">{this.state.roleInfo}</p>
                            <button className="btn btn-primary" onClick={()=>{HomeActions.selectRole(this.state.roleName)}}>Select {this.state.roleName}</button>
                            </div>
                    </div>
                </div>
        )
    }
}

export default RoleSelector