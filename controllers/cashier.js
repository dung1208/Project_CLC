const CashierData = require("../model/cashier")

module.exports = {
    cashier: function (req, res) {
            res.render("screen-cashier");
                // res.json({data:rows};
    },
    live_search: function (req, res) {
        var query = req.params.q;
        CashierData.live_search(query, function(err,rows,fields){
            if (err) {
                console.log(err);
            }else{
                res.json(rows);
            }
        });
    },
    postOrderDetails: function(req, res) {
        let data_order = req.body.data_order;
        let datas_order_product = req.body.datas_order_product;
        console.log(data_order);
        CashierData.postOrderDetails(data_order,datas_order_product, function (err,rows,fields){
            if (err) {
                console.log(err);
            }else{
                res.json(rows);
            }
        });
    }
}