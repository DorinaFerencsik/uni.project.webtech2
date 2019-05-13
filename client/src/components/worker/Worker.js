import React from 'react'

import WorkerOptions from './WorkerOptions'

class Worker extends React.Component{
    render() {
        return (
            <div>
                <WorkerOptions/>
                <div className="col-12" id="workerOptionContent">
                    <div>
                        <p className="h4 text-muted my-5 font-italic font-weight-light"> Select an option</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Worker