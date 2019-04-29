var express = require('express');
var router = express.Router();

var ms = require('./ManagerService');
const managerService = new ms()

router.post('/createInstallation', (req, res) => {
    //  date, orderId, workerId
    if (req.body['date'] == undefined ){
        res.status(400).send('Date must be defined');
        return;
    }
    if (req.body['daypart'] == undefined || (req.body['daypart'] != 'AM' && req.body['daypart'] != 'PM' )) {
        res.status(400).send('Daypart must be defined and valid');
        return;
    }
    if (req.body['orderId'] == undefined || req.body['orderId'] == ''){
        res.status(400).send('Order ID must be defined');
        return;
    }
    if (req.body['workerId'] == undefined || req.body['workerId'] == ''){
        res.status(400).send('Worker ID must be defined');
        return;
    }

    managerService.createInstallation({date: req.body['date'], orderId: req.body['orderId'], workerId: req.body['workerId']},
        () => {res.status(200).send("Installation created")},
        (cause) => {res.status(400).send(cause)})
});






module.exports = router;