var express = require('express');
var router = express.Router();

var ms = require('../service/ManagerService');
const managerService = new ms()

router.post('/createInstallation', (req, res) => {
    //  date, orderId, workerId
    if (req.body['date'] == undefined ){
        res.status(400).send('Date must be defined');
        return;
    }
    if (req.body['dayPart'] == undefined || (req.body['dayPart'] != 'AM' && req.body['dayPart'] != 'PM' )) {
        res.status(400).send('Daypart must be defined and valid');
        return;
    }
    if (req.body['orderId'] == undefined || req.body['orderId'] == ''){
        res.status(400).send('Order ID must be defined');
        return;
    }

    managerService.createInstallation({date: req.body['date'], dayPart: req.body['dayPart'], orderId: req.body['orderId'],},
        () => {res.status(200).send("Installation created")},
        (cause) => {res.status(400).send(cause)})
});

router.get('/listOrders', (req, res) => {
    managerService.listOrders(
        (orders) => {res.status(200).send(orders),
            (cause) => {res.status(400).send(cause)}})
});

router.post('/createInvoice', (req, res) => {
    if (req.body['orderId'] == undefined || req.body['orderId'] == ''){
        res.status(400).send('Order ID must be defined');
        return;
    }
    if (req.body['dueDate'] == undefined || req.body['dueDate'] == ''){
        res.status(400).send('Due date must be defined');
        return;
    }
    managerService.createInvoice({orderId: req.body['orderId'], dueDate: req.body['dueDate']},
        (result) => {res.status(200).send('Invoice added to order')},
        (cause) => {res.status(400).send(cause)})
});

router.get('/getStatistics', (req, res) => {
    managerService.getStatistics((docs) => {res.status(200).send(docs)})
})



module.exports = router;