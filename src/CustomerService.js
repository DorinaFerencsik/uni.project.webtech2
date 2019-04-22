function CustomerService(customerDAO) {
    // logger
    md5 = require('md5.js');

    if (customerDAO != undefined && customerDAO != null) {
        this.customerDAO = customerDAO;
    } else {
        this.customerDAO = require('./CustomerDAO');
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
    //TODO: call cutomerDAO
    request['date'] = new Date().toISOString();
    request['packaged'] = false;
    request['payed'] = false;
    request['oid'] = new md5().update(JSON.stringify({
        customer: request['customerId'],
        date: request['date']
    })).digest('hex');
    this.customerDAO.createOrder(request, ()=>{callback()})
};

CustomerService.prototype.listOrdersOfCustomer = function (customerId, callback) {
    //TODO: call customerDAO
    this.customerDAO.readOrdersOfCustomer(customerId, (orders) => {callback(orders)})
};

module.exports = CustomerService;