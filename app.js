var express = require('express');
var bodyParser = require('body-parser');

const port = 8080;
const customerController = require('./src/CustomerController');
const workerController = require('./src/WorkerController');
const managerController = require('./src/ManagerController');

var app = express();

app.use(bodyParser.json());


// app.get('/',function (req,res) {
//     res.send('../public/index.html');
// });
app.use('/customer', customerController);
app.use('/worker', workerController);
app.use('/manager', managerController);

app.use(express.static('./public'));


app.listen(port, ()=>{
    console.log('Server is running on ', port);
});
