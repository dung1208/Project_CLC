const OrdersData = require("../model/orders");
const OrderStockData = require("../model/orderstock");

module.exports = {
    list_orders: function (req, res, next) {
        var user =  req.session.user;
        var storeId = req.session.storeId;

        if (user == null) {
            // res.send("Bạn cần đăng nhập");
            let err = new Error("Bạn cần đăng nhập");
            err.status = 401;
            return next(err);
        }

        else if (user.role !== "Admin" && user.role !== "Manager") {
            // set flash message
            // req.flash('error', "Bạn không có quyền thực hiện hành động này");
            let mess = "Nhân viên không thể xem"
            let err = new Error("Bạn không có quyền thực hiện hành động này");
            err.status = 401;
            return next(err);
            // res.send("Bạn không có quyền thực hiện hành động này");
            // res.render("error", {message: mess, error: err});
        }
        // var storeId="STORE-0001"

        OrdersData.get_list_orders(storeId,function (err, results) {
            if (err) {
                req.flash('error', err);
                res.render("exchange/orders", {data:''});
            } else {
                for (let i=0; i<results.length; i++) {
                    results[i]["Order_date"] = results[i]["Order_date"].toISOString().substr(0, 19).replace('T', ' ');
                }
                res.render("exchange/orders", {data:results});
                // res.json({data:results});
            }
        })
    },

    list_orders_stock: function (req, res, next) {
        var user =  req.session.user;
        var storeId = req.session.storeId;

        if (user == null) {
            // res.send("Bạn cần đăng nhập");
            let err = new Error("Bạn cần đăng nhập");
            err.status = 401;
            return next(err);
        }

        else if (user.role !== "Admin" && user.role !== "Manager") {
            // set flash message
            // req.flash('error', "Bạn không có quyền thực hiện hành động này");
            let mess = "Nhân viên không thể xem"
            let err = new Error("Bạn không có quyền thực hiện hành động này");
            err.status = 401;
            return next(err);
            // res.send("Bạn không có quyền thực hiện hành động này");
            // res.render("error", {message: mess, error: err});
        }
        // var storeId="STORE-0001";
        OrderStockData.get_list_orders_stock(storeId, function (err, results) {
            if (err){
                res.render("exchange/orderstock", {data:''});
            } else {
                for (let i=0; i<results.length; i++) {
                    results[i]["OS_date"] = results[i]["OS_date"].toISOString().substr(0, 19).replace('T', ' ');
                }
                res.render("exchange/orderstock", {data:results});
                // res.json({data:results});
            }
        })
    },
    live_search: function (req, res) {
        var query = req.params.q;
        OrderStockData.live_search(query, function(err,rows,fields){
            if (err) {
                console.log(err);
            }else{
                res.json(rows);
            }
        });
    },
    postOrderDetails: function(req, res) {
        let data_OS = req.body.data_OS;
        let datas_OS_product = req.body.datas_OS_product;
        console.log(data_OS);
        OrderStockData.postOrderDetails(data_OS,datas_OS_product, function (err,rows,fields){
            if (err) {
                console.log(err);
            }else{
                res.json(rows);
            }
        });
    },
    add_order_stock: function (req,res,next){
        var user =  req.session.user;
        var storeId = req.session.storeId;

        if (user == null) {
            // res.send("Bạn cần đăng nhập");
            let err = new Error("Bạn cần đăng nhập");
            err.status = 401;
            return next(err);
        }

        else if (user.role !== "Admin" && user.role !== "Manager") {
            // set flash message
            // req.flash('error', "Bạn không có quyền thực hiện hành động này");
            let mess = "Nhân viên không thể xem"
            let err = new Error("Bạn không có quyền thực hiện hành động này");
            err.status = 401;
            return next(err);
            // res.send("Bạn không có quyền thực hiện hành động này");
            // res.render("error", {message: mess, error: err});
        }
        // var storeId="STORE-0001";
        OrderStockData.get_list_orders_stock(storeId, function (err, results) {
            if (err){
                res.render("exchange/add-orderstock", {data:''});
            } else {
                for (let i=0; i<results.length; i++) {
                    results[i]["OS_date"] = results[i]["OS_date"].toISOString().substr(0, 19).replace('T', ' ');
                }
                res.render("exchange/add-orderstock", {data:results});
                // res.json({data:results});
            }
        })
    }
};

/**
 * @return {string}
 */
function Date2String(d) {
    let _month = d.getMonth()+1;
    let _day = d.getDate();
    let _year = d.getFullYear();
    let _hour = d.getHours();
    let _min = d.getMinutes();
    let _sec = d.getSeconds();

    return  _day +"/"+ _month +"/"+ _year + " " + _hour + ":" + _min + ":" + _sec;
}
