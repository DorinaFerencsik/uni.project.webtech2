import React from 'react'

import ManagerOptions from './ManagerOptions'

class Manager extends React.Component{
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