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

ManagerService.prototype.listOrders = function ( callback) {
    //TODO: call customerDAO
    this.managerDAO.readOrders((orders) => {callback(orders)})
};

module.exports = ManagerService;