import ManagerConstants from '../constants/ManagerConstants'
import ShutterDispatcher from '../dispatcher/Dispatcher'

class ManagerActions {

    selectOption(optionId){
        ShutterDispatcher.handleViewAction({
            actionType: ManagerConstants.SELECT_MANAGER_OPTION,
            payload: optionId
        });
    }

    showInvoiceForm(order) {
        ShutterDispatcher.handleViewAction({
            actionType: ManagerConstants.SHOW_INVOICE_FORM,
            payload: order
        })
    }

    hideInvoiceForm(order) {
        ShutterDispatcher.handleViewAction({
            actionType: ManagerConstants.HIDE_INVOICE_FORM
        })
    }

    createInvoice(dueDate) {
        ShutterDispatcher.handleViewAction({
            actionType: ManagerConstants.CREATE_INVOICE,
            payload: dueDate
        })
    }

    showInstallationForm(order) {
        ShutterDispatcher.handleViewAction({
            actionType: ManagerConstants.SHOW_INSTALLATION_FORM,
            payload: order
        })
    }

    hideInstallationForm(order) {
        ShutterDispatcher.handleViewAction({
            actionType: ManagerConstants.HIDE_INSTALLATION_FORM
        })
    }

    createInstallation(installation) {
        ShutterDispatcher.handleViewAction({
            actionType: ManagerConstants.CREATE_INSTALLATION,
            payload: installation
        })
    }
}

export default new ManagerActions();