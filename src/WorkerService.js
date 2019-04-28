function WorkerService(workerDAO) {
    // logger
    md5 = require('md5.js');

    if (workerDAO != undefined && workerDAO != null) {
        this.workerDAO = workerDAO;
    } else {
        this.workerDAO = require('./WorkerDAO');
    }
}

WorkerService.prototype.listPendingOrders = function (request, success, error) {
    this.workerDAO.getPendingOrders(request, (orders)=>{success(orders)})
};

WorkerService.prototype.assignOrder = function (request, success, error) {
    this.workerDAO.assignOrderToWorker(request, ()=>{success()}, (cause) => {error(cause)})
};

WorkerService.prototype.markOrder = function (request, success, error) {
    request['packagedDate'] = new Date().toISOString();
    request['packaged'] = new md5().update(JSON.stringify({
        customer: request['workerId'],
        date: request['packagedDate']
    })).digest('hex');

    this.workerDAO.markOrderAsPacked(request, ()=>{success()}, (cause) => {error(cause)})
};


module.exports = WorkerService;