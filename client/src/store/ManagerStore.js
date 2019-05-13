import {EventEmitter} from 'events'

class ManagerStore extends EventEmitter{

    _selectedOption = null;
    _selectedOrder = null;
    _statistics = null;

    emitChange(){
        this.emit('change')
    }

    addChangeListener(callback){
        this.on('change',callback);
    }

    removeChangeListener(callback){
        this.removeListener('change',callback);
    }

}

export  default new ManagerStore();