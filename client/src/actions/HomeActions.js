import HomeConstants from '../constants/HomeConstants'
import ShutterDispatcher from '../dispatcher/Dispatcher'

class HomeActions {

    selectRole(roleId){
        ShutterDispatcher.handleViewAction({
            actionType: HomeConstants.SELECT_ROLE,
            payload: roleId
        });
    }

    logout(){
        ShutterDispatcher.handleViewAction({
            actionType: HomeConstants.LOGOUT
        })
    }
}

export default new HomeActions();