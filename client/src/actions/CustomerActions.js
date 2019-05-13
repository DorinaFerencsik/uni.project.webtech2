import CustomerConstants from '../constants/CustomerConstants'
import ShutterDispatcher from '../dispatcher/Dispatcher'

class CustomerActions {

    selectOption(optionId){
        ShutterDispatcher.handleViewAction({
            actionType: CustomerConstants.SELECT_CUSTOMER_OPTION,
            payload : optionId
        });
    }

    showWindowForm() {
        ShutterDispatcher.handleViewAction({
            actionType: CustomerConstants.SHOW_WINDOW_FORM,
            payload : null
        });
    }

    createNewWindow(window){
        ShutterDispatcher.handleViewAction({
            actionType: CustomerConstants.CREATE_NEW_WINDOW,
            payload: window
        })
    }

    addItemToCart(item){
        ShutterDispatcher.handleViewAction({
            actionType: CustomerConstants.ADD_ITEM_TO_CART,
            payload: item
        })
    }

    removeItemFromCart(item) {
        ShutterDispatcher.handleViewAction({
            actionType: CustomerConstants.REMOVE_SINGE_ITEM,
            payload: item
        })
    }

    removeAllItemFromCart(item){
        ShutterDispatcher.handleViewAction({
            actionType: CustomerConstants.REMOVE_ALL_ITEMS,
            payload: item
        })
    }

    showOrderForm() {
        ShutterDispatcher.handleViewAction({
            actionType: CustomerConstants.SHOW_ORDER_FORM
        })
    }

    placeOrder(order) {
        ShutterDispatcher.handleViewAction({
            actionType: CustomerConstants.PLACE_ORDER,
            payload: order
        })
    }

    showInvoiceOfOrder(order) {
        ShutterDispatcher.handleViewAction({
            actionType: CustomerConstants.SHOW_INVOICE,
            payload: order
        })
    }

    hideInvoiceOfOrder(order) {
        ShutterDispatcher.handleViewAction({
            actionType: CustomerConstants.HIDE_INVOICE
        })
    }
}

export default new CustomerActions();