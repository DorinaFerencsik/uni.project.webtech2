import {EventEmitter} from 'events'

class HomeStore extends EventEmitter{

    _selectedRole = null;

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

export  default new HomeStore();