const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'shutter_webshop';
const userCollection = 'users';
const orderCollection = 'orders';
const workerCollection = 'workers';
const shutterCollection = 'shutters';
const installationCollection = 'installations';

function createInstallation(request, callback, error) {
    var client = new MongoClient(url);
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const installationColl = db.collection(installationCollection);
        const workerColl = db.collection(workerCollection);
        const orderColl = db.collection(orderCollection);


        orderColl.findOne({oid: request['orderId']}, (err, docs) => {
            assert.equal(null, err, "Order ID is not valid");

            workerColl.findOne({wid: request['workerId']}, (err, docs) => {
                assert.equal(null, err, "Worker ID is not valid");

                installationColl.insertOne(request, (err, res) => {
                    assert.equal(null, err);
                    assert.equal(1, res.insertedCount);

                    callback()
                });

                client.close();
            })

        })
    })
}

function readOrders(callback) {
    var client = new MongoClient(url);
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(orderCollection);

        collection.find().toArray((err, docs) => {
            assert.equal(err, null);
            callback(docs)
        });
        client.close();

    })
}



module.exports = {
    "createInstallation": createInstallation,
    "readOrders": readOrders
};