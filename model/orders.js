const dbCon = require('../lib/db')

module.exports = {
    get_list_orders: function (storeId, callback) {
        dbCon.query('SELECT o.Order_id, o.Staff_id, o.Store_id, o.Cus_id, o.Order_date, o.Order_discount, o.Order_total, c.Cus_name\n' +
            'FROM orders AS o, customer AS c \n' +
            'WHERE o.Cus_id = c.Cus_id AND Store_id = "'+ storeId + '"', callback)
    },

    get_orders: function (store_id, callback) {
        dbCon.query('SELECT p.Product_id, p.Product_name, p.Product_group, p.Product_small_unit, p.Product_big_unit,' +
            ' p.product_big_id, p.Product_unit_exchange, p.Product_original_price, p.Product_exp_day,' +
            ' o.Order_id, o.Staff_id, o.Store_id, o.Cus_id, o.Order_date, o.Order_discount, o.Order_total,' +
            ' op.product_unit, op.Quantity, op.Price, op.Discount, op.product_total_price\n' +
            'FROM product p, orders AS o, order_product AS op\n' +
            'WHERE o.Order_id = op.Order_id AND op.Product_id = p.Product_id AND o.Store_id = "'+ store_id +'"', callback)
    }
}
