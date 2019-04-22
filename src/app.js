var express = require('express');
var bodyParser = require('body-parser');

const port = 8080;
const customerController = require('./CustomerController');
const workerController = require('./WorkerController');
const managerController = require('./ManagerController');

var app = express();

app.use(bodyParser.json());


app.get('/',function (req,res) {
    res.send('hello world');
});
app.use('/customer', customerController);

app.use(express.static('../public'));


app.listen(port, ()=>{
    console.log('Server is running on ', port);
});
