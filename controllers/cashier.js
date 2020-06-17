const ProductData = require("../model/product")

module.exports = {
    cashier: function (req, res) {
        ProductData.get(function (err, rows) {
            if (err) {
                req.flash('error', err);
                res.json({data:''});
            } else {
                res.render("screen-cashier");
                // res.json({data:rows});
            }
        })
    },
    
}