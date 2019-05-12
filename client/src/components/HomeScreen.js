import React from 'react'
import RoleSelector from './RoleSelector'

class HomeScreen extends React.Component{

    render(){
        return (
            <div className="row col-12">
                    <RoleSelector roleName="Customer" roleInfo="Select this role to order shutters from our webshop" roleImg="customer-base"></RoleSelector>
                    <RoleSelector roleName="Worker" roleInfo="The worker will package the orders and perform installation" roleImg="worker-base"></RoleSelector>
                    <RoleSelector roleName="Manager" roleInfo="God role " roleImg="manager-base"></RoleSelector>
            </div>
        )
    }
}

export default HomeScreen