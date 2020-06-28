const dbCon = require('../lib/db')

module.exports = {
    live_search: function (product, callback) {
        dbCon.query('SELECT Product_name, Product_id, Product_small_unit_price, Product_small_unit' +
            ' FROM product WHERE Product_name LIKE "%'
            + product + '%" OR Product_id LIKE "%' + product + '%"', callback);
    },
    postOrderDetails: function (order,order_product, callback){
        //Insert into orders table
        dbCon.query('INSERT INTO orders(Order_id,Staff_id,Store_id,Cus_id,Order_date,Order_discount, Order_total) VALUES ?',
        order);
        
        dbCon.query('INSERT INTO order_product(Order_id,Product_id,product_unit,Quantity,Price,Discount, product_total_price) VALUES ?',
        order_product,callback);       
    },
}

// Procedure for addoredit table
// CREATE PROCEDURE 'productAddorEdit'(
//     IN _ORDER_ID boolean,
// 	IN _STAFF_ID varchar(10),
//     IN _STORE_ID varchar(10),
//     IN _CUS_ID varchar(10),
//     IN _ORDER_DISCOUNT float,
//     IN _ORDER_TOTAL double,
// )

// BEGIN
// 	SET @timestamp = CURRENT_TIMESTAMP()
    
// 	IF _ORDER_ID THEN
//     	INSERT INTO orders(Order_id,Staff_id,Store_id,Cus_id,Order_date,Order_discount, Order_total)
//         VALUES 
// END