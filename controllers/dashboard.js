const DashboardData = require('../model/dashboard')
const OrdersData = require('../model/orders')


module.exports = {
    dashboard: function (req, res, next) {
        var user = req.session.user;
        var storeId = req.session.storeId;

        if (user == null) {
            res.redirect("/login");
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

        let dataListOrders = [];
        let ordersData = [];
        OrdersData.get_list_orders(storeId, function (err, results) {
            if (err) {
                req.flash('error', err);
                dataListOrders  = [];
                res.render("manager/dashboard", {data:dataListOrders});
            }
            else {
                dataListOrders = results;
                OrdersData.get_orders(storeId, function (err, results) {
                    if (err) {
                        req.flash('error', err);
                        ordersData  = [];
                        res.render("manager/dashboard", {dataListOrders:dataListOrders, ordersData:ordersData});
                    }
                    else {
                        ordersData = results;
                        res.render("manager/dashboard", {dataListOrders:dataListOrders, ordersData:ordersData});
                    }
                })
            }
        })

    }
};