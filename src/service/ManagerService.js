function ManagerService(managerDAO) {
    moment = require('moment')

    if (managerDAO != undefined && managerDAO != null) {
        this.managerDAO = managerDAO;
    } else {
        this.managerDAO = require('../dao/ManagerDAO');
    }
}

ManagerService.prototype.createInstallation = function (request, success, error) {
    this.managerDAO.createInstallation(request, ()=>{success()}, (cause) => {error(cause)})
};

ManagerService.prototype.listOrders = function (callback) {
    this.managerDAO.readOrders((orders) => {callback(orders)})
};

ManagerService.prototype.createInvoice = function (request, success, error) {
    this.managerDAO.readOneOrder(request, (order) => {
        request['date'] = new Date();
        request['vat'] = order['price'] * 0.75;
        request['shipping'] = 50;
        request['fullPrice'] = order['price'] + request['shipping'];
        request['signature'] = new md5().update(JSON.stringify({
            customer: request['vat'],
            date: request['date'].toISOString()
        })).digest('hex');
        this.managerDAO.addInvoiceToOrder(request, (result) => {success(result)})

    });
};

ManagerService.prototype.getStatistics = function (callback) {
    var statistic = {
        weeklySell: 0,
        monthlySell: 0,
        weeklyIncome: 0,
        monthlyIncome: 0,
        weeklyShutters: {
            S01: 0,
            S02: 0,
            S03: 0
        },
        monthlyShutters: {
            S01: 0,
            S02: 0,
            S03: 0
        }
    };

    var d = new Date();
    d.setDate(d.getDate() - 7);
    var dateTimeTofilter = moment().subtract(1, 'week');
    var filter = {
        "date": {
            $gte: new Date(dateTimeTofilter._d)
        }
    };
    this.managerDAO.readFilteredOrders(filter, (docs) => {
        for (var i in docs) {
            docs[i].shutterId.map((element) => {
                statistic['weeklySell'] += element.quantity;
                statistic['weeklyIncome'] += element.item.price;
                statistic['weeklyShutters'][element.item.sid] += element.quantity;
            })
        }
        dateTimeTofilter = moment().subtract(1, 'month');
        filter = {
            "date": {
                $gte: new Date(dateTimeTofilter._d)
            }
        };
        this.managerDAO.readFilteredOrders(filter, (docs) => {
            for (var i in docs) {
                docs[i].shutterId.map((element) => {
                    statistic['monthlySell'] += element.quantity;
                    statistic['monthlyIncome'] += element.item.price;
                    statistic['monthlyShutters'][element.item.sid] += element.quantity;
                })
            }
            callback(statistic)
        });

    })
};

module.exports = ManagerService;