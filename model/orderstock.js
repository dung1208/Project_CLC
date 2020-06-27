const dbCon = require('../lib/db')

module.exports = {
    get_list_orders_stock: function (storeId, callback) {
        dbCon.query('SELECT os.OS_id, os.Staff_id, os.Store_id, os.Sup_id, os.OS_date, staff.Staff_name, s.Sup_name\n' +
            'FROM order_stock AS os, staff, supplier as s\n' +
            'WHERE os.Staff_id = staff.Staff_id AND os.Sup_id = s.Sup_id AND os.Store_id = "'+ storeId + '"', callback)
    },

    get_detail_order_stock: function (osId, callback) {
        dbCon.query('SELECT * FROM os_product WHERE os_product.OS_id = "'+ osId +'"', callback)
    }

}
