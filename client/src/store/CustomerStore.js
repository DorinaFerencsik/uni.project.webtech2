import {EventEmitter} from 'events'

class CustomerStore extends EventEmitter{

    _selectedOption = null;
    _webshopItems = [];
    _orders = [];
    _cartItems = [];
    _cartTotalCost = 0;
    _customerId = '001';
    _windows = [];
    _showOrderForm = false;
    _selectedOrder = null;

    _weekDays = {
        Mon: 'Monday',
        Tue: 'Tuesday',
        Wed: 'Wednesday',
        Thu: 'Thursday',
        Fri: 'Friday',
        Sat: 'Saturday',
        Sun: 'Sunday'
    };
    _dayParts = {
        AM: 'AM',
        PM: 'PM'
    };

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

export  default new CustomerStore();