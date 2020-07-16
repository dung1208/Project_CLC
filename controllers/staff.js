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
    },

    display_edit: function (req, res) {
        let id = req.params.id;
        let storeId = req.session.storeId;

        StaffData.get_id(id, storeId, function (err, result) {
            if (result.length <= 0) {
                req.flash('error', 'Staff not found with id = ' + id)
                res.redirect('/staff')
            } else {
                let name = result[0].Staff_name;
                let user_id = result[0].Staff_id_user;
                let password = result[0].Staff_id_password;
                let gender = result[0].Staff_genre;
                let phone = result[0].Staff_phone_num;
                let role = result[0].Role_id;
                let address = result[0].Staff_address;
                let status = result[0].Active;

                res.render('manager/editStaff', {id: id, name: name, user_id: user_id, password: password,
                        gender: gender, phone: phone, role: role, address: address, status: status});
                // res.json(result);
            }
        })
    },

    update: function (req, res) {
        let id = req.params.id;
        let storeId = req.session.storeId;

        if (!storeId) {
            req.flash('error', "Sửa nhân viên không thành công")
            return res.redirect('/staff');
        }

        let name = req.body.name;
        let user_id = req.body.user_id;
        let password = req.body.password;
        let gender = req.body.gender;
        let phone = req.body.phone;
        let role = req.body.role;
        let address = req.body.address;
        let status = req.body.status;

        let staff_form_data = {
            Staff_name: name,
            Staff_id_user: user_id,
            Staff_id_password: password,
            Staff_genre: gender,
            Staff_phone_num: phone,
            Role_id: role,
            Staff_address: address,
            Active: status
        };

        StaffData.update(id, staff_form_data, function (err, results) {
            if (err) {
                req.flash('error', err);

                res.render('manager/editStaff', {id: id, name: name, user_id: user_id, password: password,
                    gender: gender, phone: phone, role: role, address: address, status: status});
            } else {
                req.flash('success', 'Sửa nhân viên thành công');

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
