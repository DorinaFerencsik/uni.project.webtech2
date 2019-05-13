const assert = require('assert');
const sinon = require('sinon');

const service = require('../src/service/CustomerService');

describe('Customer Service Test', function () {
   it('List orders of customer from DB', function () {
        var s = new service();
        s.listOrdersOfCustomer('testid', (orders) => {console.log('Orders: ', orders)})
   });
   it('List orders of customer from own object', function () {
       var dao = {
           readWindowsOfCustomer: function (id, callback) {
               callback({first: 'mock1', second: 'mock2'})
           }
       };
        var s = new service(dao);
        s.listWindowsOfCustomer('testid', (windows) => {
            console.log('Windows: ', windows)
        })
   });
    it('Create order for customer', function () {
        var dao = {
            createOrder: function (request, callback) {
                callback('inserted: 1s')
            }
        };
        var s = new service(dao);
        var testOrder = {
            customerId: 'idTest',
            shutterId: 'shutter',
            windowName: 'myWindow',
            shipment: {
                preferredDay: 'Mon',
                preferredDaypart: 'AM',
                address: 'Test address line'
            },
            price: 100
        };
        s.createOrder(testOrder, () => {})
    });

});