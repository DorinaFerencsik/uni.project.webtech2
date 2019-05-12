import WorkerConstants from '../constants/WorkerConstants'
import ShutterDispatcher from '../dispatcher/Dispatcher'

class WorkerActions {

    selectOption(optionId){
        ShutterDispatcher.handleViewAction({
            actionType: WorkerConstants.SELECT_WORKER_OPTION,
            payload: optionId
        });
    }

    assignOrderToWorker(orderId) {
        ShutterDispatcher.handleViewAction({
            actionType: WorkerConstants.ASSIGN_ORDER_TO_WORKER,
            payload: orderId
        })
    }

    listPartOfShutter(order) {
        ShutterDispatcher.handleViewAction({
            actionType: WorkerConstants.LIST_PARTS_OF_SHUTTER,
            payload: order
        })
    }

    closePartOfShutter() {
        ShutterDispatcher.handleViewAction({
            actionType: WorkerConstants.CLOSE_PART_LIST
        })
    }

    markOrderAsPackaged() {
        ShutterDispatcher.handleViewAction({
            actionType: WorkerConstants.MARK_ORDER_AS_PACKAGED
        })
    }

}

export default new WorkerActions();