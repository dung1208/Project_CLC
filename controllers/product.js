const ProductData = require("../model/product")

module.exports = {
    list_product: function (req, res) {
        ProductData.get(function (err, rows) {
            if (err) {
                req.flash('error', err);
                res.json({data:''});
            } else {
                res.render("product/screen-listProducts", {data:rows});
            }
        })
    },

    display_add_product: function (req, res) {
        res.render('product/screen-addProduct', {data:''});
    }
}