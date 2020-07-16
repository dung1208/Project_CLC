const dbCon = require('../lib/db')

module.exports = {
    live_search: function (product, callback) {
        dbCon.query('SELECT Product_name, Product_id, Product_small_unit_price, Product_original_price, Product_small_unit' +
            ' FROM product WHERE Product_name LIKE "%'
            + product + '%" OR Product_id LIKE "%' + product + '%"', callback);
    },
    postOrderDetails: function (orderstock,OS_product, callback){
        //Insert into orders table
        dbCon.query('INSERT INTO order_stock(OS_id,Staff_id,Store_id,Sup_id,OS_date) VALUES (?)',
        [orderstock],function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });        
        dbCon.query('INSERT INTO os_product(OS_id,Product_id,product_unit,Quantity,Price) VALUES ?',
        [OS_product],callback);       
    },
    get_list_orders_stock: function (storeId, callback) {
        dbCon.query('SELECT os.OS_id, os.Staff_id, os.Store_id, os.Sup_id, os.OS_date, staff.Staff_name, s.Sup_name\n' +
            'FROM order_stock AS os, staff, supplier as s\n' +
            'WHERE os.Staff_id = staff.Staff_id AND os.Sup_id = s.Sup_id AND os.Store_id = "'+ storeId + '"', callback)
    },

    get_detail_order_stock: function (osId, callback) {
        dbCon.query('SELECT * FROM os_product WHERE os_product.OS_id = "'+ osId +'"', callback)
    }

}
