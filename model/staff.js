const dbCon = require('../lib/db')

module.exports = {
    get: function (store_id, callback) {
        dbCon.query('SELECT * FROM staff WHERE Store_id= "'+ store_id + '"', callback);
    },

    get_id: function (staff_id, store_id, callback) {
        dbCon.query('SELECT * FROM staff WHERE Store_id= "'+ store_id + '" AND Staff_id = "' + staff_id + '"', callback);
    },

    add: function (form_data, callback) {
        dbCon.query('INSERT INTO staff SET ?', form_data, callback)
    },

    update: function (id, form_data, callback) {
        dbCon.query('UPDATE staff SET ? WHERE Staff_id = "' + id + '"', form_data, callback)
    }
}