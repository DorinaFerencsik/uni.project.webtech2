function ManagerService(managerDAO) {
    // logger
    md5 = require('md5.js');

    if (managerDAO != undefined && managerDAO != null) {
        this.managerDAO = managerDAO;
    } else {
        this.managerDAO = require('./ManagerDAO');
    }
}

ManagerService.prototype.createInstallation = function (request, success, error) {
    this.managerDAO.createInstallation(request, ()=>{success()}, (cause) => {error(cause)})
};

ManagerService.prototype.getCustomer = function (request, success, error) {
    this.managerDAO.readCustomer(request, (customer)=>{success(customer)})
};

ManagerService.prototype.createWindow = function (request, success, error) {
    this.managerDAO.createWindow(request, ()=>{success()})
};


ManagerService.prototype.createOrder = function (request, callback) {
    //TODO: call cutomerDAO
    request['date'] = new Date().toISOString();
    request['packaged'] = false;
    request['payed'] = false;
    request['workerid'] = false
    request['oid'] = new md5().update(JSON.stringify({
        customer: request['customerId'],
        date: request['date']
    })).digest('hex');
    this.managerDAO.createOrder(request, ()=>{callback()})
};

ManagerService.prototype.listOrdersOfCustomer = function (customerId, callback) {
    //TODO: call customerDAO
    this.managerDAO.readOrdersOfCustomer(customerId, (orders) => {callback(orders)})
};

module.exports = ManagerService;