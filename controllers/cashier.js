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
}