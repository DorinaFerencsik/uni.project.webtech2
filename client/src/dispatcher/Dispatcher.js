import {Dispatcher} from 'flux'
import React from 'react'
import ReactDOM from 'react-dom'

import HomeConstants from '../constants/HomeConstants'
import CustomerConstants from '../constants/CustomerConstants'
import WorkerConstants from '../constants/WorkerConstants'
import ManagerConstants from '../constants/ManagerConstants'

import CustomerStore from '../store/CustomerStore'
import WorkerStore from '../store/WorkerStore'
import ManagerStore from '../store/ManagerStore'

import HomeScreen from '../components/HomeScreen'

import Customer from '../components/Customer'
import CustomerOrder from '../components/CustomerOrder'
import CustomerWindow from '../components/CustomerWindow'
import WindowForm from '../components/WindowForm'
import WebShop from '../components/WebShop'
import CustomerOrderForm from '../components/CustomerOrderForm'

import Worker from '../components/Worker'
import WorkerOrder from '../components/WorkerOrder'
import WorkerInstallation from '../components/WorkerInstallation'
import WorkerShutterPart from "../components/WorkerShutterPart"

import Manager from '../components/Manager'
import ManagerOrder from '../components/ManagerOrder'
import HomeStore from "../store/HomeStore";

class ShutterDispatcher extends Dispatcher{

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            payload : action
        });
    }
}

const dispatcher = new ShutterDispatcher();

dispatcher.register((data) => {
    if (data.payload.actionType !== HomeConstants.SELECT_ROLE) {
        return;
    }
    switch (data.payload.payload) {
        case 'Customer':
            ReactDOM.render(
                React.createElement(Customer),
                document.getElementById('mainContainer')
            );
            break;
        case 'Worker':
            ReactDOM.render(
                React.createElement(Worker),
                document.getElementById('mainContainer')
            );
            break;
        case 'Manager':
            ReactDOM.render(
                React.createElement(Manager),
                document.getElementById('mainContainer')
            );
            break;
    }
    HomeStore._selectedRole = data.payload.payload;
    HomeStore.emitChange();
});

dispatcher.register((data) => {
    if (data.payload.actionType !== HomeConstants.LOGOUT) {
        return;
    }
    HomeStore._selectedRole = '';
    HomeStore.emitChange();
    ReactDOM.render(
        React.createElement(HomeScreen),
        document.getElementById('mainContainer')
    );

});

dispatcher.register((data) => {
    if (data.payload.actionType !== CustomerConstants.SELECT_CUSTOMER_OPTION) {
        return;
    }
    
    switch (data.payload.payload) {
        case 'webshop':
            fetch('/customer/listShutters', {
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                }
            }).then(response => {console.log(response);return response.json()})
                .then(result => {
                    CustomerStore._webshopItems = result;
                    CustomerStore._selectedOption = data.payload.payload;
                    CustomerStore.emitChange();

                    ReactDOM.render(
                        React.createElement(WebShop),
                        document.getElementById('customerOptionContent')
                    );
                });
            break;
        case 'orders':
            fetch('/customer/'+CustomerStore._customerId+'/listOrders', {
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                }
            }).then(response => {return response.json()})
                .then(result => {
                    CustomerStore._orders = result
                    CustomerStore._selectedOption = data.payload.payload;
                    CustomerStore.emitChange()

                    ReactDOM.render(
                        React.createElement(CustomerOrder),
                        document.getElementById('customerOptionContent')
                    );
                });
            break;
        case 'windows':
            fetch('/customer/'+CustomerStore._customerId+'/listWindows', {
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                }
            }).then(response => {return response.json()})
                .then(result => {
                    CustomerStore._windows = result
                    CustomerStore._selectedOption = data.payload.payload;
                    CustomerStore.emitChange()

                    ReactDOM.render(
                        React.createElement(CustomerWindow),
                        document.getElementById('customerOptionContent')
                    );
                });
            break;
    }
});

dispatcher.register((data)=>{
    if(data.payload.actionType !== CustomerConstants.SHOW_WINDOW_FORM){
        return;
    }
    ReactDOM.render(
        React.createElement(WindowForm),
        document.getElementById('customerWindowContainer')
    );
});

dispatcher.register((data) => {
   if (data.payload.actionType !== CustomerConstants.CREATE_NEW_WINDOW) {
       return;
   }
   console.log('New window dispatcher is called');
   console.log(data.payload.payload)
    fetch('/customer/defineWindow', {
        method: 'POST',
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify({
            customerId: CustomerStore._customerId,
            window: {
                name: data.payload.payload.name,
                type: data.payload.payload.type,
                width: data.payload.payload.width,
                height: data.payload.payload.height,
            }
        })
    }).then(response => {
        console.log('Window added: ',response);
        fetch('/customer/'+CustomerStore._customerId+'/listWindows', {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }
        }).then(response => {return response.json()})
            .then(result => {
                CustomerStore._windows = result;
                CustomerStore._selectedOption = 'windows';
                CustomerStore.emitChange();

                ReactDOM.render(
                    React.createElement(CustomerWindow),
                    document.getElementById('customerOptionContent')
                );
            });
    })
});

dispatcher.register((data) => {
    if (data.payload.actionType !== CustomerConstants.ADD_ITEM_TO_CART) {
        return;
    }
    var itemIndex = CustomerStore._cartItems.findIndex((element) => {
        return element.item.sid === data.payload.payload.sid
    });

    if (itemIndex === -1) {
        CustomerStore._cartItems.push({
            item: data.payload.payload,
            quantity: 1
        })
    } else {
        CustomerStore._cartItems[itemIndex].quantity += 1
    }
    var cost = 0;
    CustomerStore._cartItems.map((element) => {
        cost += element.quantity * element.item.price
    });
    CustomerStore._cartTotalCost = cost;
    CustomerStore.emitChange();
});

dispatcher.register((data) => {
    if (data.payload.actionType !== CustomerConstants.REMOVE_SINGE_ITEM) {
        return;
    }
    var itemIndex = CustomerStore._cartItems.findIndex((element) => {
        return element.item.sid === data.payload.payload.sid
    });
    CustomerStore._cartItems[itemIndex].quantity -= 1;
    CustomerStore._cartItems = CustomerStore._cartItems.filter((element) => {
        return element.quantity > 0;
    });
    var cost = 0;
    CustomerStore._cartItems.map((element) => {
        cost += element.quantity * element.item.price
    });
    CustomerStore._cartTotalCost = cost;
    CustomerStore.emitChange()
});

dispatcher.register((data) => {
    if (data.payload.actionType !== CustomerConstants.REMOVE_ALL_ITEMS) {
        return;
    }
    CustomerStore._cartItems = CustomerStore._cartItems.filter((element) => {return element.item.sid !== data.payload.payload.sid})
    var cost = 0;
    CustomerStore._cartItems.map((element) => {
        cost += element.quantity * element.item.price
    });
    CustomerStore._cartTotalCost = cost;
    CustomerStore.emitChange()
});

dispatcher.register((data) => {
    if (data.payload.actionType !== CustomerConstants.SHOW_ORDER_FORM) {
        return;
    }
    if (CustomerStore._windows.length === 0) {
        fetch('/customer/'+CustomerStore._customerId+'/listWindows', {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }
        }).then(response => {return response.json()})
            .then(result => {
                CustomerStore._windows = result;
                CustomerStore.emitChange();
            });
    }
    if (CustomerStore._showOrderForm) {
        ReactDOM.unmountComponentAtNode(document.getElementById('customerOrderFormContainer'))
    } else {
        ReactDOM.render(
            React.createElement(CustomerOrderForm),
            document.getElementById('customerOrderFormContainer')
        )
    }
    CustomerStore._showOrderForm = !CustomerStore._showOrderForm;
    CustomerStore.emitChange()
});

dispatcher.register((data) => {
   if (data.payload.actionType !== CustomerConstants.PLACE_ORDER) {
       return;
   }
   fetch('/customer/createOrder', {
       method: 'POST',
       headers : {
           "Content-Type" : "application/json",
           "Accept" : "application/json"
       },
       body : JSON.stringify({
           customerId: CustomerStore._customerId,
           shutterId: CustomerStore._cartItems,
           windowName: data.payload.payload.windowName,
           shipment: {
               address: data.payload.payload.address,
               preferredDay: data.payload.payload.day,
               preferredDaypart: data.payload.payload.dayPart

           },
           price: CustomerStore._cartTotalCost
       })
   }).then(response => {
       console.log('Order created: ',response);
       fetch('/customer/'+CustomerStore._customerId+'/listOrders', {
           headers : {
               "Content-Type" : "application/json",
               "Accept" : "application/json"
           }
       }).then(response => {return response.json()})
           .then(result => {
               CustomerStore._orders = result;
               CustomerStore._selectedOption = data.payload.payload;
               CustomerStore._cartItems = [];
               CustomerStore._cartTotalCost = 0;
               CustomerStore.emitChange();
               ReactDOM.unmountComponentAtNode(document.getElementById('customerOrderFormContainer'))

               ReactDOM.render(
                   React.createElement(CustomerOrder),
                   document.getElementById('customerOptionContent')
               );
           });
   })
});



dispatcher.register((data) => {
    if (data.payload.actionType !== WorkerConstants.SELECT_WORKER_OPTION) {
        return;
    }

    switch (data.payload.payload) {
        case 'orders':
            fetch('/worker/'+WorkerStore._workerId+'/listPendingOrders', {
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                }
            }).then(response => {console.log(response);return response.json()})
                .then(result => {
                    WorkerStore._orders = result;
                    WorkerStore._selectedOption = data.payload.payload;
                    WorkerStore.emitChange();

                    ReactDOM.render(
                        React.createElement(WorkerOrder),
                        document.getElementById('workerOptionContent')
                    );
                });
            break;
        case 'installations':
            fetch('/worker/'+WorkerStore._workerId+'/listInstallations', {
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                }
            }).then(response => {return response.json()})
                .then(result => {
                    WorkerStore._installations = result;
                    WorkerStore._selectedOption = data.payload.payload;
                    WorkerStore.emitChange();

                    ReactDOM.render(
                        React.createElement(WorkerInstallation),
                        document.getElementById('workerOptionContent')
                    );
                });
            break;
    }

});

dispatcher.register((data) => {
    if (data.payload.actionType !== WorkerConstants.ASSIGN_ORDER_TO_WORKER) {
        return;
    }
    fetch('/worker/assignOrder', {
        method: 'POST',
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify({
            workerId: WorkerStore._workerId,
            orderId: data.payload.payload
        })
    }).then(response => {
        fetch('/worker/' + WorkerStore._workerId + '/listPendingOrders', {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(response => {
            console.log(response);
            return response.json()
        })
            .then(result => {
                WorkerStore._orders = result;
                WorkerStore._selectedOption = 'orders';
                WorkerStore.emitChange();

                // ReactDOM.render(
                //     React.createElement(WorkerOrder),
                //     document.getElementById('workerOptionContent')
                // );
            });
    });
});

dispatcher.register((data) => {
    if (data.payload.actionType !== WorkerConstants.LIST_PARTS_OF_SHUTTER) {
        return;
    }
    WorkerStore._selectedOrder = data.payload.payload;
    WorkerStore.emitChange();

    ReactDOM.render(
        React.createElement(WorkerShutterPart),
        document.getElementById('workerOrderContainer')
    );
});

dispatcher.register((data) => {
    if (data.payload.actionType !== WorkerConstants.CLOSE_PART_LIST) {
        return;
    }
    ReactDOM.unmountComponentAtNode(document.getElementById('workerOrderContainer'))
});

dispatcher.register((data)=> {
   if (data.payload.actionType !== WorkerConstants.MARK_ORDER_AS_PACKAGED) {
       return;
   }

    fetch('/worker/markOrder', {
        method: 'POST',
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify({
            workerId: WorkerStore._workerId,
            orderId: WorkerStore._selectedOrder.oid
        })
    }).then(response => {
        fetch('/worker/' + WorkerStore._workerId + '/listPendingOrders', {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(response => {
            console.log(response);
            return response.json()
        })
            .then(result => {
                WorkerStore._orders = result;
                WorkerStore._selectedOption = 'orders';
                WorkerStore.emitChange();

                ReactDOM.unmountComponentAtNode(document.getElementById('workerOrderContainer'))
            });
    });

});


dispatcher.register((data) => {
    if (data.payload.actionType !== ManagerConstants.SELECT_MANAGER_OPTION) {
        return;
    }
    console.log('Manager dispatcher')
    switch (data.payload.payload) {
        case 'orders':
            fetch('/manager/listOrders', {
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                }
            }).then(response => {console.log(response);return response.json()})
                .then(result => {
                    WorkerStore._orders = result;
                    WorkerStore._selectedOption = data.payload.payload;
                    WorkerStore.emitChange();

                    ReactDOM.render(
                        React.createElement(WorkerOrder),
                        document.getElementById('managerOptionContent')
                    );
                });
            break;
        case 'installations':
            // fetch('/worker/'+WorkerStore._workerId+'/listInstallations', {
            //     headers : {
            //         "Content-Type" : "application/json",
            //         "Accept" : "application/json"
            //     }
            // }).then(response => {return response.json()})
            //     .then(result => {
            //         WorkerStore._installations = result;
            //         WorkerStore._selectedOption = data.payload.payload;
            //         WorkerStore.emitChange();
            //
            //         ReactDOM.render(
            //             React.createElement(WorkerInstallation),
            //             document.getElementById('workerOptionContent')
            //         );
            //     });
            ReactDOM.render(
                        React.createElement(WorkerInstallation),
                        document.getElementById('managerOptionContent')
                    );
            break;
    }

});

export default dispatcher;