const ProductData = require("../model/product");

module.exports = {
    list_product: function (req, res, next) {
        let user =  req.session.user;
        let storeId = req.session.storeId;

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
        let id = "";
        let name = "";
        let price = "";
        let origin_price = "";
        let product_group = "";
        let quantity = "";
        res.render('product/screen-addProduct', {id: id, name: name, price: price,
            origin_price: origin_price, product_group: product_group, quantity: quantity});
    },

    display_edit_product: function (req, res) {
        res.render('product/screen-addProduct', {data:''});
    },

    add: function (req, res, next) {
        let storeId = req.session.storeId;
        if (!storeId) {
            req.flash('error', "Thêm mới sản phẩm không thành công")

            return res.redirect('/product');
        }

        let id = req.body.id;
        let name = req.body.name;
        let price = req.body.price;
        let origin_price = req.body.origin_price;
        let product_group = req.body.product_group;
        let quantity = req.body.quantity;

        if (!id) {
            let now = new Date();
            id = Date2String(now);
            console.log(id);
        }

        let product_form_data = {
            Product_id: id,
            Product_name: name,
            Product_small_unit_price: price,
            Product_original_price: origin_price,
            Product_group: product_group,

        };

        let store_product_form_data = {
            Store_id: storeId,
            Product_id: id,
            Quantity: quantity
        };

        // insert query
        ProductData.add(product_form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('product/screen-addProduct', {id: id, name: name, price: price,
                    origin_price: origin_price, product_group: product_group, quantity: quantity})
            } else {
                ProductData.add_to_store(store_product_form_data, function (err, result) {
                    if (err) {
                        req.flash('error', err);

                        // render to add.ejs
                        res.render('product/screen-addProduct', {id: id, name: name, price: price,
                            origin_price: origin_price, product_group: product_group, quantity: quantity})
                    } else {
                        req.flash('success', 'Thêm sản phẩm mới thành công');

                        res.redirect('/product');
                    }
                })
            }
        })
    },
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

    return  _hour + "" +_min + _sec +_day + _month + _year;
}
