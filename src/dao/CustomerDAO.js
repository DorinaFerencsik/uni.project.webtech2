const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://172.21.0.10:27017';
const dbName = 'shutter_webshop';
const userCollection = 'users';
const orderCollection = 'orders';
const shutterCollection = 'shutters';

function createCustomer(request, callback) {
    var client = new MongoClient(url);
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(userCollection);

        collection.insertOne(request, (err, res) => {
            assert.equal(null, err);
            assert.equal(1, res.insertedCount);
            client.close()
            callback()
        })
    })
}

function readCustomer(findParam, callback) {
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection= db.collection(userCollection)

        collection.findOne({cid: findParam}, (err, docs) => {
            assert.equal(err, null);
            callback(docs)
        });
        client.close();
    })
}

function createOrder(request, callback) {
    var client = new MongoClient(url);
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(orderCollection);

        collection.insertOne(request, (err, res) => {
            assert.equal(null, err);
            assert.equal(1, res.insertedCount);
            client.close();
            callback()
        });
    })
}

function readOrder() {
    
}

function readOrdersOfCustomer(customerId,callback) {
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection= db.collection(orderCollection);

        collection.find({customerId: customerId}).toArray((err, docs) => {
            assert.equal(err, null);
            callback(docs)
        });
        client.close();
    })
}

function createWindow(request, callback) {
    var client = new MongoClient(url);
    client.connect((err) => {
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection= db.collection(userCollection)

        collection.updateOne({cid : request['customerId']},
            {
                $push: {
                    windows: {
                        name: request['window']['name'],
                        type: request['window']['type'],
                        width: request['window']['width'],
                        height: request['window']['height']
                    }
                }
            }, (err,res)=>{
                assert.equal(null, err);

                callback(res)
            });
        client.close();

    })
}

function readWindowsOfCustomer(customerId, callback) {
    readCustomer(customerId, (result) => {callback(result.windows)});
}

function readShutters(callback) {
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection= db.collection(shutterCollection);

        collection.find().toArray((err, docs) => {
            assert.equal(err, null);
            callback(docs)
        });
        client.close();
    })
}

module.exports = {
    "createCustomer": createCustomer,
    "readCustomer" : readCustomer,
    "readOrder" : readOrder,
    "readOrdersOfCustomer" : readOrdersOfCustomer,
    "createOrder" : createOrder,
    "createWindow": createWindow,
    "readWindowsOfCustomer": readWindowsOfCustomer,
    "readShutters": readShutters
};