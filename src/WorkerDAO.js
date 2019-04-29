const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'shutter_webshop';

const orderCollection = 'orders';
const installationCollection = 'installations';


function getPendingOrders(request, callback) {
    var client = new MongoClient(url);
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(orderCollection);

        collection.find({ $or: [ { workerid: false }, { workerid: request['wid'] } ] }).toArray((err, docs) => {
            assert.equal(err, null);
            callback(docs)
        });
        client.close();

    })
}

function assignOrderToWorker(request, success, error) {
    var client = new MongoClient(url)
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(orderCollection);

        collection.findOne({oid: request['oid']}, (err, docs) => {
            assert.equal(null, err);
            if (docs.workerid != false) {
                error('Error: order is already assigned to a worker');
            } else {
                collection.updateOne({oid: request['oid']},
                    {
                        $set: {
                            workerid: request['wid']
                        }
                    }, (err,res)=>{
                        assert.equal(null, err);
                        console.log('result after update: ', res);
                        success(res)
                    });
            }
            client.close();
        })

    })
}

function markOrderAsPacked(request, success, error) {
    var client = new MongoClient(url)
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(orderCollection);

        collection.findOne({oid: request['oid']}, (err, docs) => {
            assert.equal(null, err);
            if (docs.workerid != request['wid']) {
                error('Error: order is not assigned to the given worker');
            } else if (docs.packaged != false) {
                error('Error: order is already packaged');
            } else {
                collection.updateOne({oid: request['oid']},
                    {
                        $set: {
                            packagedDate: request['packagedDate'],
                            packaged: request['packaged']
                        }
                    }, (err,res)=>{
                        assert.equal(null, err);

                        success(res)
                    });
            }
            client.close();
        })

    })
}

function getInstallations(request, success, error) {
    var client = new MongoClient(url);
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(installationCollection);

        collection.find({ workerId: request['wid'] }).toArray((err, docs) => {
            assert.equal(err, null);
            success(docs)
        });
        client.close();

    })
}


module.exports = {
    "getPendingOrders": getPendingOrders,
    "assignOrderToWorker": assignOrderToWorker,
    "markOrderAsPacked": markOrderAsPacked,
    "getInstallations": getInstallations
};