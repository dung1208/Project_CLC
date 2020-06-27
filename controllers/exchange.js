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
                res.render("exchange/orderstock", {data:results});
                // res.json({data:results});
            }
        })
    }
};