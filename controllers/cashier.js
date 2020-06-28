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
        let data = JSON.parse(req.body)
        let data_order = data[0];
        let datas_order_product = data[1];
        console.log(req.body)
        console.log("Request got")
        CashierData.postOrderDetails(data_order,datas_order_product, function (err,rows,fields){
            if (err) {
                console.log(err);
            }else{
                res.json(rows);
            }
        });
    }
}