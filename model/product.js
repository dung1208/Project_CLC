const dbCon = require('../lib/db')

module.exports = {
    get: function (callback) {
        dbCon.query('SELECT * FROM product', callback)
    },

    get_from_store: function (store_id, callback) {
        dbCon.query('SELECT p.Product_id, p.Product_name, p.Product_group, p.Product_small_unit, p.Product_big_unit,' +
            ' p.product_big_id, p.Product_unit_exchange, p.Product_small_unit_price, p.Product_big_unit_price, ' +
            'p.Product_original_price, p.Product_exp_day, s.Store_id, s.Store_name, sp.Quantity\n' +
            'FROM product p, store s, store_product sp\n' +
            'WHERE p.Product_id = sp.Product_id AND s.Store_id = sp.Store_id AND s.Store_id = "'+ store_id +'"', callback)
    },

    get_id: function(product_id, callback) {
        dbCon.query('SELECT * FROM product WHERE Product_id = "'+ product_id + '"', callback)
    },

    update: function (product_id, form_data,callback) {
        dbCon.query('UPDATE product SET ? WHERE Product_id = "'+ product_id + '"', form_data, callback)
    },

    delete: function (product_id, callback) {
        dbCon.query('DELETE FROM product WHERE Product_id = "'+ product_id + '"', callback)
    }
}