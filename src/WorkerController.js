var express = require('express');
var router = express.Router();

var ws = require('./WorkerService');
const workerService = new ws();

router.get('/listPendingOrders', (req, res) => {
    if (req.body['workerId'] == undefined || req.body['workerId'] == '') {
        res.status(400).send("Worker id must be defined");
        return;
    }

    workerService.listPendingOrders({wid: req.body["workerId"]},
        (orders) => {res.status(200).send(orders)},
        (cause) => {res.status(400).send(cause)})
});

router.post('/assignOrder', (req, res) => {
    if (req.body['workerId'] == undefined || req.body['workerId'] == '') {
        res.status(400).send("Worker id must be defined");
        return;
    }
    if (req.body['orderId'] == undefined || req.body['orderId'] == '') {
        res.status(400).send("Order id must be defined");
        return;
    }

    workerService.assignOrder({wid: req.body['workerId'], oid: req.body['orderId']},
        () => {res.status(200).send("Order assigned to worker")},
        (cause) => {res.status(400).send(cause)})
});

router.post('/markOrder', (req, res) => {
    if (req.body['workerId'] == undefined || req.body['workerId'] == '') {
        res.status(400).send("Worker id must be defined");
        return;
    }
    if (req.body['orderId'] == undefined || req.body['orderId'] == '') {
        res.status(400).send("Order id must be defined");
        return;
    }

    workerService.markOrder({wid: req.body['workerId'], oid: req.body['orderId']},
        () => {res.status(200).send("Order marked as packaged")},
        (cause) => {res.status(400).send(cause)})
});

router.get('/listInstallations', (req, res) => {
    if (req.body['workerId'] == undefined || req.body['workerId'] == '') {
        res.status(400).send("Worker id must be defined");
        return;
    }
    workerService.listInstallations({wid: req.body['workerId'], oid: req.body['orderId']},
        (installations) => {res.status(200).send(installations)},
        (cause) => {res.status(400).send(cause)})
});







module.exports = router;