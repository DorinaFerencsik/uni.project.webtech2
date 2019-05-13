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

            installationColl.insertOne(request, (err, res) => {
                assert.equal(null, err);
                assert.equal(1, res.insertedCount);
                callback()
            });
            client.close();
        })
    })
}

function readOrders(callback) {
    var client = new MongoClient(url);
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(orderCollection);
        console.log('coll: ',installationCollection);
        const instCollection = db.collection(installationCollection);

        collection.find().toArray((err, docs) => {
            assert.equal(null, err);
                instCollection.find().toArray((err, installation) => {
                    assert.equal(null, err, "Worker ID is not valid");
                    console.log(installation);
                    for (var i in docs) {
                        for(var j in installation) {
                            if (docs[i].oid == installation[j].orderId) {
                                docs[i]["installation"] = installation[j];
                            }
                        }
                    }
                    callback(docs);
                });
            client.close();
        });


    })
}

function readOneOrder(request, callback) {
    var client = new MongoClient(url);
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(orderCollection);

        collection.findOne({oid: request['orderId']}, (err, docs) => {
            assert.equal(null, err);
            callback(docs)
        });
        client.close();

    })
}

function readFilteredOrders(filter, callback) {
    var client = new MongoClient(url);
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(orderCollection);

        collection.find(filter).toArray((err, docs) => {
            assert.equal(null, err);
            callback(docs)
        });
        client.close();

    })
}

function addInvoiceToOrder(request, callback) {
    var client = new MongoClient(url);
    client.connect((err) => {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(orderCollection);

        collection.updateOne({oid : request['orderId']},
            {
                $set: {
                    invoice: {
                        vat: request['vat'],
                        shippingPrice: request['shipping'],
                        createdDate: request['date'],
                        dueDate: request['dueDate'],
                        fullPrice: request['fullPrice'],
                        signature: request['signature']
                    }
                }
            }, (err,res)=>{
                assert.equal(null, err);

                callback(res)
            });
        client.close();
    })
}





module.exports = {
    "createInstallation": createInstallation,
    "readOrders": readOrders,
    "readOneOrder": readOneOrder,
    "addInvoiceToOrder": addInvoiceToOrder,
    "readFilteredOrders": readFilteredOrders
};