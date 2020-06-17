const ProductData = require("../model/product")

module.exports = {
    list_product: function (req, res, next) {
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

        ProductData.get_from_store(storeId,function (err, results) {
            if (err) {
                req.flash('error', err);
                res.render("product/screen-listProducts", {data:''});
            } else {
                res.render("product/screen-listProducts", {data:results});
                // res.json({data:rows});
            }
        })
    },

    display_add_product: function (req, res) {
        res.render('product/screen-addProduct', {data:''});
    },

    display_edit_product: function (req, res) {
        res.render('product/screen-addProduct', {data:''});
    }
};