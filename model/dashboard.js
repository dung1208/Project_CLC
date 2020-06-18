const dbCon = require('../lib/db')


module.exports = {
    get_orders: function (storeId, callback) {
        dbCon.query('SELECT * FROM orders WHERE Store_id = "'+ storeId + '"', callback)
    }
}