function CustomerService(customerDAO) {
    // logger
    md5 = require('md5.js');

    if (customerDAO != undefined && customerDAO != null) {
        this.customerDAO = customerDAO;
    } else {
        this.customerDAO = require('../dao/CustomerDAO');
    }
}

CustomerService.prototype.createCustomer = function (request, success, error) {
    this.customerDAO.createCustomer(request, ()=>{success()})
};

CustomerService.prototype.getCustomer = function (request, success, error) {
    this.customerDAO.readCustomer(request, (customer)=>{success(customer)})
};

CustomerService.prototype.createWindow = function (request, success, error) {
    this.customerDAO.createWindow(request, ()=>{success()})
};

CustomerService.prototype.listWindowsOfCustomer = function (request, success) {
    this.customerDAO.readWindowsOfCustomer(request, (windows)=>{success(windows)})
};

CustomerService.prototype.createOrder = function (request, callback) {
    request['date'] = new Date();
    request['packaged'] = false;
    request['payed'] = false;
    request['workerid'] = false
    request['oid'] = new md5().update(JSON.stringify({
        customer: request['customerId'],
        date: request['date'].toISOString()
    })).digest('hex');
    request['invoice'] = null;
    this.customerDAO.createOrder(request, ()=>{callback()})
};

CustomerService.prototype.listOrdersOfCustomer = function (customerId, callback) {
    this.customerDAO.readOrdersOfCustomer(customerId, (orders) => {callback(orders)})
};

CustomerService.prototype.listShutters = function(callback) {
    this.customerDAO.readShutters((shutters) => {callback(shutters)})
}

module.exports = CustomerService;