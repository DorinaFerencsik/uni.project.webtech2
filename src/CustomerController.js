var express = require('express');
var router = express.Router();

var srs = require('./CustomerService');
const customerService = new srs()

router.get('/newCustomer', (req, res) => {
    customerService.createCustomer({name: "testing user name"},
        () => {res.status(200).send("Customer created")},
        (cause) => {res.status(400).send(cause)})
});

router.get('/getCustomer', (req, res) => {
    if (req.body['customerId'] == undefined) {
        res.status(414).send('Customer must be defined');
        return;
    }
    customerService.getCustomer(req.body['customerId'],
        (customer) => {res.status(200).send(customer)},
        (cause) => {res.status(400).send(cause)});
});

router.post('/defineWindow', (req, res) => {
    if (req.body['customerId'] == undefined || req.body['customerId'] =='') {
        res.status(414).send('Customer must be defined');
        return;
    }
    if (req.body['window']['name'] == undefined) {
        res.status(414).send('WindowName must be defined');
        return;
    }
    if (req.body['window']['type'] == undefined) {
        res.status(414).send('Window type must be defined');
        return;
    }
    if (req.body['window']['width'] == undefined || req.query['width'] <= 0) {
        res.status(414).send('Window width must be defined and greater than 0');
        return;
    }
    if (req.body['window']['height'] == undefined || req.query['height'] <= 0) {
        res.status(414).send('Window height must be defined and greater than 0');
        return;
    }
    customerService.createWindow(
        {customerId: req.body['customerId'], window: req.body['window']},
        () => {res.status(200).send("Window added")},
        (cause) => {res.status(400).send(cause)}
    )
});

router.get('/listWindows', (req, res) => {
    if (req.body['customerId'] == undefined || req.body['customerId'] =='') {
        res.status(414).send('Customer ID must be defined');
        return;
    }

    customerService.listWindowsOfCustomer(req.body['customerId'],
        (windows) => {res.status(200).send(windows)},
        (cause) => {res.status(400).send(cause)}
    )
});
router.post('/createOrder', (req, res) => {
    //TODO: add color handling
    if ( req.body['customerId'] == undefined || req.body['customerId'] =='') {
        res.status(414).send('Customer must be defined');
        return;
    }
    if ( req.body['shutterId'] == undefined || req.body['shutterId'] =='') {
        res.status(414).send('Shutter id must be defined');
        return;
    }
    if ( req.body['windowName'] == undefined || req.body['windowName'] =='') {
        res.status(414).send('Window name must be defined');
        return;
    }
    if ( req.body['shipment'] == undefined || req.body['shipment']['preferredDay'] == undefined || req.body['shipment']['preferredDay'] =='') {
        res.status(414).send('Preferred day of shipment must be defined');
        return;
    }
    if ( req.body['shipment']['preferredDaypart'] == undefined || req.body['shipment']['preferredDaypart'] =='') {
        res.status(414).send('Preferred daypart of shipment must be defined');
        return;
    }
    if ( req.body['shipment']['address'] == undefined || req.body['shipment']['address'] =='') {
        res.status(414).send('Shipment address must be defined');
        return;
    }
    customerService.createOrder({customerId: req.body['customerId'],shutterId: req.body['shutterId'],windowName:req.body['windowName'], shipment:req.body['shipment']},
        () => {res.status(200).send('Order placed')},
        (cause) => res.status(400).send(cause))
});

router.get('/listOrders', (req, res) => {
    if ( req.body['customerId'] == undefined || req.body['customerId'] =='') {
        res.status(414).send('Customer must be defined');
        return;
    }
    customerService.listOrdersOfCustomer(req.body['customerId'],
        (orders) => {res.status(200).send(orders)},
        (cause) => res.status(400).send(cause))
});





module.exports = router;