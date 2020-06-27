const dbCon = require('../lib/db')

module.exports = {
    live_search: function (product, callback) {
        dbCon.query('SELECT Product_name, Product_id, Product_small_unit_price' +
            ' FROM product WHERE Product_name LIKE "%'
            + product + '%" OR Product_id LIKE "%' + product + '%"', callback);
    }
}