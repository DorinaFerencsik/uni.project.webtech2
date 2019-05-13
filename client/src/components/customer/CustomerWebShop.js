import React from 'react'

import CustomerActions from '../../actions/CustomerActions'
import CustomerStore from '../../store/CustomerStore'

class CustomerWebShop extends React.Component{
    constructor(props){
        super(props)
        this._onChange = this._onChange.bind(this)
        this.state = {webshopItems : CustomerStore._webshopItems}
    }

    _onChange(){
        this.setState({webshopItems : CustomerStore._webshopItems})
    }
    componentDidMount(){
        CustomerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        CustomerStore.removeChangeListener(this._onChange)
    }


    render() {
        return (
            <div>
                <div className="row">
                    {this.state.webshopItems.map((item)=>{
                        return (
                            <div className="col-6 my-3">
                            <div className="card flex-fill" >
                                <div className="card-header" id={item['sid']}>
                                    {item['name']}
                                </div>
                                <div className="card-body">
                                    <h6 className="card-subtitle mb-2 text-muted">{item['type']}</h6>
                                    <p className="card-text">{item['desc']}</p>
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <button href="#" className="btn btn-light"
                                            onClick={() => {CustomerActions.addItemToCart(item)}}
                                        >Add to cart</button>

                                        <span className="badge badge-info badge-pill">{item['price']} EUR</span>
                                    </div>

                                </div>
                            </div>
                            </div>
                        );
                    })}
                    </div>
            </div>
        )
    }
}
export default CustomerWebShop