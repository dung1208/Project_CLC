const dbCon = require('../lib/db')

module.exports = {
    get: function (callback) {
        dbCon.query('SELECT * FROM product', callback)
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