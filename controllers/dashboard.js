const DashboardData = require('../model/dashboard')


module.exports = {
    dashboard: function (req, res, next) {
        var user = req.session.user;
        var storeId = req.session.storeId

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

        DashboardData.get_orders(storeId, function (err, results) {
            if (err) {
                req.flash('error', err);
                res.render("manager/dashboard", {data:''});
            }
            else {
                res.render("manager/dashboard", {data:results});
                // res.json({data:results});
            }
        })
    }
};