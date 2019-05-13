import {EventEmitter} from 'events'

class WorkerStore extends EventEmitter{

    _selectedOption = null;
    _workerId = '123456qwertz';
    _orders = [];
    _installations = [];
    _selectedOrder = null;

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

export  default new WorkerStore();