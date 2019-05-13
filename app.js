var express = require('express');
var bodyParser = require('body-parser');

const port = 8080;
const customerController = require('./src/controller/CustomerController');
const workerController = require('./src/controller/WorkerController');
const managerController = require('./src/controller/ManagerController');

var app = express();

app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/customer', customerController);
app.use('/worker', workerController);
app.use('/manager', managerController);




app.listen(port, ()=>{
    console.log('Server is running on ', port);
});
