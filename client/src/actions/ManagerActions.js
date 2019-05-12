import ManagerConstants from '../constants/ManagerConstants'
import ShutterDispatcher from '../dispatcher/Dispatcher'

class ManagerActions {

    selectOption(optionId){
        ShutterDispatcher.handleViewAction({
            actionType: ManagerConstants.SELECT_MANAGER_OPTION,
            payload: optionId
        });
    }
}

export default new ManagerActions();