const StaffData = require("../model/staff");

module.exports = {
    list_staff: function (req, res, next) {
        let storeId = req.session.storeId;
        // var storeId="STORE-0001";
        StaffData.get(storeId, function (err, results) {
            if (err) {
                req.flash('error', err);
                res.render("manager/staff", {data: ''});
            } else {
                res.render("manager/staff", {data: results});
                // res.json(results);
            }
        })
    },

    display_add: function (req, res) {
        res.render('manager/addStaff');
    },

    add: function (req, res) {
        let storeId = req.session.storeId;
        if (!storeId) {
            req.flash('error', "Thêm mới nhân viên không thành công")

            return res.redirect('/staff');
        }
        let now = new Date();
        let id = Date2String(now);
        let name = req.body.name;
        let user_id = req.body.user_id;
        let password = req.body.password;
        let gender = req.body.gender;
        let phone = req.body.phone;
        let role = req.body.role;
        let address = req.body.address;
        let status = req.body.status;

        let staff_form_data = {
            Staff_id: id,
            Store_id: storeId,
            Staff_name: name,
            Staff_id_user: user_id,
            Staff_id_password: password,
            Staff_genre: gender,
            Staff_phone_num: phone,
            Role_id: role,
            Staff_address: address,
            Active: status
        };

        StaffData.add(staff_form_data, function (err, results) {
            if (err) {
                req.flash('error', err);

                res.render('manager/addStaff');
            } else {
                req.flash('success', 'Thêm nhân viên mới thành công');

                res.redirect('/staff');
            }
        })
    }
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

    return  "STAFF-" + _hour +_min + _sec +_day + _month + _year;
}
