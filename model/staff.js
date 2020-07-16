const dbCon = require('../lib/db')

module.exports = {
    get: function (store_id, callback) {
        dbCon.query('SELECT * FROM staff WHERE Store_id= "'+ store_id + '"', callback);
    },

    add: function (form_data, callback) {
        dbCon.query('INSERT INTO staff SET ?', form_data, callback)
    }
}